import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

async function getAuth(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return null
  const profile = await queryOne<{ role: string; department: string; designation: string }>(
    'SELECT role, department, designation FROM profiles WHERE id = $1',
    [user.userId]
  )
  return { user: { id: user.userId, ...user }, profile }
}

const currentMonthRange = () => {
  const now = new Date()
  // Use IST
  const istNow = new Date(now.getTime() + (330 * 60000) - (now.getTimezoneOffset() * 60000))
  const monthStr = istNow.toISOString().slice(0, 7)
  const dateFrom = `${monthStr}-01`
  const dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1))
    .toISOString().slice(0, 10)
  return { dateFrom, dateTo, monthStr }
}

// GET /api/client-progress — all clients with monthly progress
export async function GET(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const monthParam = searchParams.get('month')
  
  let dateFrom: string, dateTo: string, monthStr: string
  if (monthParam) {
    dateFrom = `${monthParam}-01`
    dateTo = new Date(new Date(dateFrom).setMonth(new Date(dateFrom).getMonth() + 1)).toISOString().slice(0, 10)
    monthStr = monthParam
  } else {
    ;({ dateFrom, dateTo, monthStr } = currentMonthRange())
  }

  try {
    // 1. Ensure target_month and client_type columns exist
    await execute('ALTER TABLE client_deliverables ADD COLUMN IF NOT EXISTS target_month VARCHAR(7)')
    await execute("ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_type VARCHAR(20) DEFAULT 'external'")
    await execute('ALTER TABLE client_progress_log ADD COLUMN IF NOT EXISTS task_phase VARCHAR(30)')
    await execute('ALTER TABLE client_progress_log ADD COLUMN IF NOT EXISTS title VARCHAR(255)')
    await execute('ALTER TABLE client_progress_log ADD COLUMN IF NOT EXISTS live_url TEXT')
    await execute('ALTER TABLE client_progress_log ADD COLUMN IF NOT EXISTS platform VARCHAR(50)')
    await execute('ALTER TABLE client_progress_log ADD COLUMN IF NOT EXISTS status VARCHAR(30)')

    // 2. Ensure the 7 Internal Brands exist
    const internalBrands = [
      { name: 'RushiPandit Digital Marketing', slug: 'rushipandit-dm', color: '#10b981' },
      { name: 'Amazon', slug: 'amazon', color: '#f59e0b' },
      { name: 'AI Course', slug: 'ai-course', color: '#6366f1' },
      { name: 'Agnomatic', slug: 'agnomatic', color: '#8b5cf6' },
      { name: 'Cultural Reels', slug: 'cultural-reels', color: '#ec4899' },
      { name: 'Pandit Capital', slug: 'pandit-capital', color: '#0ea5e9' },
      { name: 'Agnochat', slug: 'agnochat', color: '#14b8a6' },
    ]

    for (const b of internalBrands) {
      const existing = await queryOne<{ id: string }>(
        `SELECT id FROM clients WHERE LOWER(TRIM(name)) = LOWER($1) OR slug = $2`,
        [b.name, b.slug]
      )
      if (!existing) {
        const brandRow = await queryOne<{ id: string }>(
          `INSERT INTO clients (name, slug, color, client_type, is_active)
           VALUES ($1, $2, $3, 'internal', true)
           RETURNING id`,
          [b.name, b.slug, b.color]
        )
        if (brandRow) {
          // Add default content format buckets for internal brand
          const formats = ['Reel', 'Static Post', 'Carousel', 'YouTube', 'Shooting']
          for (const fmt of formats) {
            await execute(
              `INSERT INTO client_deliverables (client_id, content_type, monthly_target)
               VALUES ($1, $2, 0)`,
              [brandRow.id, fmt]
            )
          }
        }
      } else {
        // Ensure client_type is marked internal
        await execute(`UPDATE clients SET client_type = 'internal' WHERE id = $1 AND (client_type IS NULL OR client_type != 'internal')`, [existing.id])
      }
    }

    const typeFilter = searchParams.get('type') // 'internal' | 'external' | 'all'
    let typeSql = ''
    const clientParams: any[] = []
    if (typeFilter === 'internal') {
      typeSql = "AND c.client_type = 'internal'"
    } else if (typeFilter === 'external') {
      typeSql = "AND (c.client_type = 'external' OR c.client_type IS NULL)"
    }

    // Get all unique active clients
    const clients = await query<any>(
      `SELECT DISTINCT ON (LOWER(TRIM(c.name))) c.id, c.name, c.slug, c.color, c.logo_url, COALESCE(c.client_type, 'external') as client_type 
       FROM clients c
       WHERE c.is_active = true AND (c.status IS NULL OR c.status != 'inactive') ${typeSql}
       ORDER BY LOWER(TRIM(c.name)), c.id ASC`,
      clientParams
    )

    // Get all deliverables: both month-specific and baseline templates
    const deliverables = await query<any>(
      `SELECT id, client_id, content_type, monthly_target, target_month 
       FROM client_deliverables 
       ORDER BY target_month DESC NULLS LAST, id ASC`
    )

    // Get all progress logs for this month — include deliverable content type and task metadata
    const logs = await query<any>(
      `SELECT l.id, l.client_id, l.deliverable_id, l.employee_id, TO_CHAR(l.log_date, 'YYYY-MM-DD') AS log_date, l.count, l.notes,
              l.task_phase, l.title, l.live_url, l.platform, l.status,
              cd.content_type as deliverable_content_type,
              json_build_object('full_name', p.full_name, 'avatar_url', p.avatar_url, 'designation', p.designation) as employee
       FROM client_progress_log l
       LEFT JOIN profiles p ON l.employee_id = p.id
       LEFT JOIN client_deliverables cd ON l.deliverable_id = cd.id
       WHERE l.log_date >= $1 AND l.log_date < $2
       ORDER BY l.log_date DESC, l.id DESC`,
      [dateFrom, dateTo]
    )

    // Build full picture per client for monthStr
    const clientsWithProgress = (clients || []).map((client: any) => {
      const isInternal = client.client_type === 'internal'
      const allClientDeliverables = (deliverables || []).filter((d: any) => d.client_id === client.id)
      const clientLogs = (logs || []).filter((l: any) => l.client_id === client.id)

      // 1. Pick month-specific deliverables if available; otherwise baseline
      const monthSpecific = allClientDeliverables.filter((d: any) => d.target_month === monthStr)
      let activeDeliverables: any[] = []

      if (monthSpecific.length > 0) {
        activeDeliverables = monthSpecific
      } else {
        const istCurrentMonth = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 7)
        if (monthStr >= istCurrentMonth || isInternal) {
          const baseline = allClientDeliverables.filter((d: any) => d.target_month === null || d.target_month === undefined)
          if (baseline.length > 0) {
            activeDeliverables = baseline
          } else {
            const sorted = [...allClientDeliverables].sort((a, b) => (b.target_month || '').localeCompare(a.target_month || ''))
            const latestMonth = sorted[0]?.target_month
            activeDeliverables = sorted.filter(d => d.target_month === latestMonth)
          }
        } else {
          activeDeliverables = []
        }
      }

      // Deduplicate by content_type
      const seenTypes = new Set<string>()
      const uniqueActive: any[] = []
      for (const d of activeDeliverables) {
        const key = (d.content_type || '').toLowerCase()
        if (!seenTypes.has(key) && (isInternal || Number(d.monthly_target) > 0)) {
          seenTypes.add(key)
          uniqueActive.push(d)
        }
      }

      // 2. Compute progress for each active deliverable
      const formattedDeliverables = uniqueActive.map((d: any) => {
        const dType = (d.content_type || '').toLowerCase()
        const delivLogs = clientLogs.filter((l: any) =>
          l.deliverable_id === d.id ||
          (l.deliverable_content_type && l.deliverable_content_type.toLowerCase() === dType)
        )
        const completed = delivLogs.reduce((sum: number, l: any) => sum + (Number(l.count) || 0), 0)
        const dailyBreakdown = delivLogs.reduce((acc: Record<string, number>, l: any) => {
          acc[l.log_date] = (acc[l.log_date] || 0) + Number(l.count)
          return acc
        }, {})
        return {
          ...d,
          completed,
          remaining: isInternal ? 0 : Math.max(0, d.monthly_target - completed),
          percent: isInternal ? 100 : (d.monthly_target > 0 ? Math.min(100, Math.round((completed / d.monthly_target) * 100)) : 0),
          dailyBreakdown,
          logs: delivLogs
        }
      })

      // 3. Historical Preservation: If logs exist for a content type not in active targets, synthesize it so NO history is lost
      for (const l of clientLogs) {
        const lType = l.deliverable_content_type || 'Custom Work'
        const lKey = lType.toLowerCase()
        if (!seenTypes.has(lKey)) {
          seenTypes.add(lKey)
          const matchedLogs = clientLogs.filter(
            (cl: any) => (cl.deliverable_content_type || '').toLowerCase() === lKey
          )
          const completed = matchedLogs.reduce((sum: number, cl: any) => sum + (Number(cl.count) || 0), 0)
          const dailyBreakdown = matchedLogs.reduce((acc: Record<string, number>, cl: any) => {
            acc[cl.log_date] = (acc[cl.log_date] || 0) + Number(cl.count)
            return acc
          }, {})
          formattedDeliverables.push({
            id: l.deliverable_id || `hist-${client.id}-${lKey}`,
            client_id: client.id,
            content_type: lType,
            monthly_target: isInternal ? 0 : completed,
            completed,
            remaining: 0,
            percent: 100,
            dailyBreakdown,
            logs: matchedLogs,
            isHistorical: true
          })
        }
      }

      // Compute total volume for internal/external
      const totalVolume = clientLogs.reduce((sum: number, l: any) => sum + (Number(l.count) || 0), 0)

      return {
        ...client,
        deliverables: formattedDeliverables,
        totalLogs: clientLogs.length,
        totalVolume,
        allLogs: clientLogs
      }
    })

    return NextResponse.json({ clients: clientsWithProgress, month: monthStr })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST /api/client-progress — log daily work for a client deliverable
export async function POST(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { user } = auth
  try {
    const { client_id, deliverable_id, count, notes, log_date, task_phase, title, live_url, platform, status } = await req.json()

    let actualDeliverableId = deliverable_id
    if (String(deliverable_id).startsWith('hist-') || !deliverable_id) {
      const existingDeliv = await queryOne<any>(
        'SELECT id FROM client_deliverables WHERE client_id = $1 LIMIT 1',
        [client_id]
      )
      if (existingDeliv) actualDeliverableId = existingDeliv.id
    }

    const data = await queryOne<any>(
      `INSERT INTO client_progress_log (client_id, deliverable_id, employee_id, log_date, count, notes, task_phase, title, live_url, platform, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        client_id,
        actualDeliverableId,
        user.id,
        log_date || new Date().toISOString().slice(0, 10),
        Number(count) || 1,
        notes || null,
        task_phase || null,
        title || null,
        live_url || null,
        platform || null,
        status || 'published'
      ]
    )

    return NextResponse.json(data, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE /api/client-progress?id=xxx — remove a log entry
export async function DELETE(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  try {
    await execute('DELETE FROM client_progress_log WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
