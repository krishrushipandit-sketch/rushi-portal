import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// POST /api/reports/analyze
// Body: { report_id } — called after a report is submitted
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === 'your-gemini-api-key-here') {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 503 })
  }

  const { report_id } = await req.json()
  if (!report_id) return NextResponse.json({ error: 'report_id required' }, { status: 400 })

  // Fetch the report
  const report = await queryOne<any>(
    `SELECT r.*, json_build_object('full_name', p.full_name, 'designation', p.designation) as employee
     FROM daily_reports r
     LEFT JOIN profiles p ON r.employee_id = p.id
     WHERE r.id = $1`,
    [report_id]
  )

  if (!report) return NextResponse.json({ error: 'Report not found' }, { status: 404 })

  // Only the owner or admin can analyze
  const profile = await queryOne<{ role: string }>('SELECT role FROM profiles WHERE id = $1', [user.userId])
  if (report.employee_id !== user.userId && profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Build context for Gemini
  const employeeName = report.employee?.full_name || 'Employee'
  const designation = report.employee?.designation || ''
  const taskEntries = typeof report.task_entries === 'string' ? JSON.parse(report.task_entries) : (report.task_entries || [])
  const taskLines = (taskEntries as any[])
    .map((t: any) => `- ${t.task_title}${t.notes ? `: ${t.notes}` : ' (completed)'}`)
    .join('\n')
  const overallNote = report.overall_note || ''
  const hoursWorked = report.in_time && report.out_time
    ? (() => {
        const [ih, im] = report.in_time.split(':').map(Number)
        const [oh, om] = report.out_time.split(':').map(Number)
        const mins = (oh * 60 + om) - (ih * 60 + im)
        return mins > 0 ? `${(mins / 60).toFixed(1)} hours` : null
      })()
    : null

  const prompt = `You are an HR analytics assistant for RushiPandit, a business training company.

Analyze this daily work report for ${employeeName} (${designation}) and return a JSON object with EXACTLY these fields:

{
  "summary": "A clear, professional 1-2 sentence summary of what was accomplished today. Written for management review.",
  "productivity_score": <integer 0-100>,
  "sentiment": "<one of: excellent | good | average | struggling>",
  "key_achievements": ["<achievement 1>", "<achievement 2>"],
  "concerns": "<blockers or issues, empty string if none>",
  "improvement_tip": "<one actionable tip for tomorrow>",
  "metrics": [
    { "task_title": "<exact task name>", "quantity": <number>, "unit": "<outreaches|calls|reels|posts|leads|orders|emails|meetings|etc>", "raw_note": "<the exact text that contained this number>" }
  ]
}

For "metrics": Extract EVERY number mentioned in the notes. Examples:
- "outreached 50 linkedin" → { task_title: "LinkedIn Outreach", quantity: 50, unit: "outreaches", raw_note: "outreached 50 linkedin" }
- "edited 3 reels" → { task_title: "Editing", quantity: 3, unit: "reels", raw_note: "edited 3 reels" }
- "5 enrollment calls done" → { task_title: "Enrollment Calls", quantity: 5, unit: "calls", raw_note: "5 enrollment calls done" }
- "dispatched 12 amazon orders" → { task_title: "Amazon Dispatch", quantity: 12, unit: "orders", raw_note: "dispatched 12 amazon orders" }
If no numbers are mentioned in notes, return metrics as empty array [].

Report Data:
- Date: ${report.report_date}
- Time worked: ${hoursWorked || 'Not specified'}
- Tasks worked on:
${taskLines}
${overallNote ? `- Additional notes: ${overallNote}` : ''}

Rules:
- Productivity score: 90-100 = exceptional with detailed notes, 70-89 = good work, 50-69 = average, <50 = sparse effort
- Return ONLY valid JSON, no markdown`

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
        responseMimeType: 'application/json',
      },
    })

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    let parsed: any
    try {
      parsed = JSON.parse(text)
    } catch {
      // Try extracting JSON from response
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Invalid JSON from Gemini')
      parsed = JSON.parse(match[0])
    }

    // Validate + extract metrics
    const rawMetrics = Array.isArray(parsed.metrics) ? parsed.metrics : []
    const aiMetrics = rawMetrics
      .filter((m: any) => m.task_title && typeof m.quantity === 'number' && m.quantity > 0)
      .map((m: any) => ({
        task_title: String(m.task_title).slice(0, 100),
        quantity: Math.abs(Number(m.quantity)),
        unit: String(m.unit || 'units').slice(0, 50),
        raw_note: String(m.raw_note || '').slice(0, 200),
      }))

    const aiData = {
      ai_summary: String(parsed.summary || '').slice(0, 500),
      ai_productivity_score: Math.min(100, Math.max(0, parseInt(parsed.productivity_score) || 70)),
      ai_sentiment: ['excellent', 'good', 'average', 'struggling'].includes(parsed.sentiment)
        ? parsed.sentiment : 'good',
      ai_key_points: Array.isArray(parsed.key_achievements) ? parsed.key_achievements.slice(0, 5) : [],
      ai_concerns: String(parsed.concerns || '').slice(0, 300),
      ai_improvement_tip: String(parsed.improvement_tip || '').slice(0, 300),
      ai_metrics: aiMetrics,
      ai_analyzed_at: new Date().toISOString(),
    }

    // Save to report
    await execute(
      `UPDATE daily_reports
       SET ai_summary = $1,
           ai_productivity_score = $2,
           ai_sentiment = $3,
           ai_key_points = $4::jsonb,
           ai_concerns = $5,
           ai_improvement_tip = $6,
           ai_metrics = $7::jsonb,
           ai_analyzed_at = $8
       WHERE id = $9`,
      [
        aiData.ai_summary,
        aiData.ai_productivity_score,
        aiData.ai_sentiment,
        JSON.stringify(aiData.ai_key_points),
        aiData.ai_concerns,
        aiData.ai_improvement_tip,
        JSON.stringify(aiData.ai_metrics),
        aiData.ai_analyzed_at,
        report_id,
      ]
    )

    return NextResponse.json({ success: true, ...aiData })
  } catch (err: any) {
    console.error('Gemini error:', err)
    return NextResponse.json({ error: `AI analysis failed: ${err.message}` }, { status: 500 })
  }
}

// GET /api/reports/analyze?mode=team_insights
// Returns AI-generated team-wide insights for admin
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await queryOne<{ role: string }>('SELECT role FROM profiles WHERE id = $1', [user.userId])
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || apiKey === 'your-gemini-api-key-here') {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 503 })
  }

  // Get last 7 days of analyzed reports
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const reports = await query<any>(
    `SELECT r.ai_summary, r.ai_productivity_score, r.ai_sentiment, r.ai_concerns, r.report_date,
            json_build_object('full_name', p.full_name) as employee
     FROM daily_reports r
     LEFT JOIN profiles p ON r.employee_id = p.id
     WHERE r.report_date >= $1 AND r.ai_summary IS NOT NULL
     ORDER BY r.report_date DESC`,
    [from]
  )

  if (!reports || reports.length === 0) {
    return NextResponse.json({ insights: 'No analyzed reports available yet. Submit and analyze some reports first.' })
  }

  const reportSummary = reports.map((r: any) =>
    `${r.employee?.full_name} (${r.report_date}): Score ${r.ai_productivity_score}/100, Sentiment: ${r.ai_sentiment}. ${r.ai_summary}${r.ai_concerns ? ` Concern: ${r.ai_concerns}` : ''}`
  ).join('\n')

  const prompt = `You are an HR analytics assistant for RushiPandit. Based on these employee daily reports from the last 7 days, provide a concise team performance insight for management.

Reports:
${reportSummary}

Return JSON with:
{
  "team_summary": "2-3 sentence overview of team performance this week",
  "top_performers": ["name1", "name2"],
  "needs_attention": ["name if any concern"],
  "team_health": "<one of: excellent | good | average | needs_improvement>",
  "key_insights": ["insight1", "insight2", "insight3"],
  "recommendation": "One key action for management this week"
}

Return ONLY valid JSON.`

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: { temperature: 0.4, maxOutputTokens: 600, responseMimeType: 'application/json' },
    })
    const result = await model.generateContent(prompt)
    const parsed = JSON.parse(result.response.text().trim())
    return NextResponse.json({ insights: parsed })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
