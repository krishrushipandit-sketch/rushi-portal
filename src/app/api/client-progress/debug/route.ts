import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/client-progress/debug
// Tests keyword matching on a sample description and checks DB state
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const testDesc = searchParams.get('desc') || 'CA Reel editing'

  try {
    // 1. Check clients exist
    let clients: any[] = []
    let clientErr: any = null

    try {
      const clientsList = await query<any>(
        'SELECT id, name, slug FROM clients WHERE is_active = true'
      )
      const deliverablesList = await query<any>(
        'SELECT id, client_id, content_type FROM client_deliverables'
      )
      clients = clientsList.map((c: any) => ({
        ...c,
        deliverables: deliverablesList.filter((d: any) => d.client_id === c.id)
      }))
    } catch (err: any) {
      clientErr = err
    }

    if (clientErr) {
      return NextResponse.json({
        error: 'clients table error — did you run SETUP-CLIENTS.sql?',
        details: clientErr.message || String(clientErr)
      }, { status: 500 })
    }

    // 2. Check client_progress_log exists
    let logErr: any = null
    try {
      await query('SELECT id FROM client_progress_log LIMIT 1')
    } catch (err: any) {
      logErr = err
    }

    // 3. Test keyword matching on the provided description
    const clientKeywords: Record<string, string[]> = {
      'ca':            ['ca ', ' ca', 'ca-', '-ca', 'ca_'],
      'advisor-alpha': ['alpha', 'advisor', 'alphadriver'],
      'mbc':           ['mbc'],
      'amicusclaims':  ['amicus'],
    }
    const typeKeywords: Record<string, string[]> = {
      'Reel':        ['reel'],
      'YouTube':     ['youtube', ' yt', 'yt ', 'y.t'],
      'Static Post': ['static', 'post'],
    }

    const desc = testDesc.toLowerCase()
    
    const matchedClient = (clients || []).find((c: any) => {
      const keywords = clientKeywords[c.slug] || [c.name.toLowerCase()]
      return keywords.some(kw => desc.includes(kw))
    })

    let matchedDeliverable = null
    if (matchedClient) {
      const deliverables = (matchedClient as any).deliverables || []
      matchedDeliverable = deliverables.find((d: any) => {
        const keywords = typeKeywords[d.content_type] || [d.content_type.toLowerCase()]
        return keywords.some((kw: string) => desc.includes(kw))
      })
    }

    // 4. Recent logs
    let recentLogs: any[] = []
    try {
      recentLogs = await query(
        `SELECT employee_id, TO_CHAR(log_date, 'YYYY-MM-DD') AS log_date, count, deliverable_id
         FROM client_progress_log
         ORDER BY created_at DESC
         LIMIT 5`
      )
    } catch {}

    return NextResponse.json({
      status: 'ok',
      clients_in_db: (clients || []).length,
      clients: (clients || []).map((c: any) => ({
        name: c.name,
        slug: c.slug,
        deliverables: c.deliverables?.map((d: any) => d.content_type)
      })),
      client_progress_log_accessible: !logErr,
      test_description: testDesc,
      matched_client: matchedClient ? (matchedClient as any).name : '❌ NO MATCH',
      matched_deliverable: matchedDeliverable ? (matchedDeliverable as any).content_type : '❌ NO MATCH',
      would_sync: !!matchedClient && !!matchedDeliverable,
      recent_logs: recentLogs || []
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
