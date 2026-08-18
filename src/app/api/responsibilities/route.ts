import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

// GET /api/responsibilities?employee_id=xxx
export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = user.role === 'admin'
  const { searchParams } = new URL(req.url)
  const employeeId = searchParams.get('employee_id')

  const targetId = isAdmin && employeeId ? employeeId : user.userId

  try {
    // Fetch employee details to detect role
    const emp = await queryOne<{ id: string; full_name: string; email: string; designation: string | null; department: string | null }>(
      `SELECT id, full_name, email, designation, department FROM employees WHERE id = $1`,
      [targetId]
    )

    let data = await query<{ id: string; title: string; daily_target: number | null; sort_order: number }>(
      `SELECT id, title, daily_target, sort_order
       FROM employee_responsibilities
       WHERE employee_id = $1
         AND title NOT ILIKE '%enrollment%'
         AND title NOT ILIKE '%admission%'
       ORDER BY sort_order ASC, id ASC`,
      [targetId]
    )

    // Check if we need to auto-upgrade to modern task-based responsibilities
    const isOldGeneric = !data || data.length === 0 || data.some(d => 
      ['internal posting', 'leads management', 'comments management', 'prospect handling', 'daily tasks', 'general work'].includes(d.title.toLowerCase().trim())
    )

    if (isOldGeneric && emp) {
      const name = (emp.full_name || '').toLowerCase()
      const email = (emp.email || '').toLowerCase()
      const desig = (emp.designation || '').toLowerCase()

      let template: { title: string; target: number | null }[] = []

      if (name.includes('suyog') || email.includes('suyog')) {
        template = [
          { title: '🎬 Video Shoots (Internal & External)', target: null },
          { title: '✂️ Internal Reels Video Editing (7 Properties)', target: 2 },
          { title: '🎥 Internal YouTube Video Editing', target: 1 },
          { title: '🚀 Video Exports & Audio Mastering', target: null },
        ]
      } else if (name.includes('kedar') || email.includes('kedar')) {
        template = [
          { title: '🎬 Client Video Shoots (On-Set)', target: null },
          { title: '✂️ External Client Reels Editing', target: 2 },
          { title: '🎥 External Client YouTube Video Editing', target: 1 },
          { title: '🤝 Client Strategy Meetings & Content Calendars', target: 1 },
        ]
      } else if (name.includes('rohan') || email.includes('rohan')) {
        template = [
          { title: '🎨 Static Posts & Creative Design (Internal & External)', target: 3 },
          { title: '📑 Multi-Slide Carousel Creation', target: 1 },
          { title: '🖼️ YouTube Thumbnails & Ad Creatives', target: 2 },
          { title: '🎬 Shooting Assistance & Production Setup', target: null },
        ]
      } else if (name.includes('pooja') || email.includes('pooja')) {
        template = [
          { title: '🚀 Internal Brands Social Media Posting', target: 3 },
          { title: '🚀 External Clients Social Media Posting', target: 3 },
          { title: '📋 LNS Operations & Client Issue Resolution', target: 5 },
          { title: '💬 Comments & DM Community Engagement', target: 20 },
        ]
      } else if (name.includes('shreya') || email.includes('shreya')) {
        template = [
          { title: '🚀 Internal Brands Social Media Posting', target: 3 },
          { title: '🚀 External Clients Social Media Posting', target: 3 },
          { title: '💬 Comments & DM Community Engagement', target: 20 },
          { title: '🎯 Prospect Handling & Lead Follow-ups', target: 10 },
        ]
      } else if (desig.includes('sales') || desig.includes('counsel') || desig.includes('admission')) {
        template = [
          { title: '📞 Student Lead Calling & Inquiries', target: 30 },
          { title: '💼 Admissions Counseling & Enrollments', target: 5 },
          { title: '📋 CRM Updates & Student Follow-ups', target: 20 },
        ]
      }

      if (template.length > 0) {
        // Clear old generic entries for this user and insert modern tasks
        await execute(`DELETE FROM employee_responsibilities WHERE employee_id = $1`, [targetId])
        for (let i = 0; i < template.length; i++) {
          await execute(
            `INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
             VALUES ($1, $2, $3, $4)`,
            [targetId, template[i].title, template[i].target, i + 1]
          )
        }
        data = await query<{ id: string; title: string; daily_target: number | null; sort_order: number }>(
          `SELECT id, title, daily_target, sort_order
           FROM employee_responsibilities
           WHERE employee_id = $1
           ORDER BY sort_order ASC, id ASC`,
          [targetId]
        )
      }
    }

    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json([])
  }
}

// POST /api/responsibilities — admin adds a responsibility
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

  try {
    const body = await req.json()
    const { employee_id, title, daily_target, sort_order } = body

    const data = await queryOne(
      `INSERT INTO employee_responsibilities (employee_id, title, daily_target, sort_order)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [employee_id, title, daily_target || null, sort_order || 0]
    )

    return NextResponse.json(data, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// DELETE /api/responsibilities?id=xxx
export async function DELETE(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.role !== 'admin') return NextResponse.json({ error: 'Admin only' }, { status: 403 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  try {
    await execute('DELETE FROM employee_responsibilities WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
