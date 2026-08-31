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
    // Ensure target_month column and client_type column exist
    await execute('ALTER TABLE client_deliverables ADD COLUMN IF NOT EXISTS target_month VARCHAR(7)')
    await execute("ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_type VARCHAR(20) DEFAULT 'external'")

    // Get all unique active clients
    const clients = await query<any>(
      `SELECT DISTINCT ON (LOWER(TRIM(name))) id, name, slug, color, logo_url, COALESCE(client_type, 'external') AS client_type
       FROM clients 
       WHERE is_active = true AND (status IS NULL OR status != 'inactive')
       ORDER BY LOWER(TRIM(name)), id ASC`
    )

    // Get all deliverables: both month-specific and baseline templates
    const deliverables = await query<any>(
      `SELECT id, client_id, content_type, monthly_target, target_month 
       FROM client_deliverables 
       ORDER BY target_month DESC NULLS LAST, id ASC`
    )

    // Get all progress logs for this month — include deliverable content type for historical resilience
    const logs = await query<any>(
      `SELECT l.id, l.client_id, l.deliverable_id, l.employee_id, TO_CHAR(l.log_date, 'YYYY-MM-DD') AS log_date, l.count, l.notes,
              cd.content_type as deliverable_content_type,
              json_build_object('full_name', p.full_name) as employee
       FROM client_progress_log l
       LEFT JOIN profiles p ON l.employee_id = p.id
       LEFT JOIN client_deliverables cd ON l.deliverable_id = cd.id
       WHERE l.log_date >= $1 AND l.log_date < $2
       ORDER BY l.log_date DESC`,
      [dateFrom, dateTo]
    )

    // Build full picture per client for monthStr
    const clientsWithProgress = (clients || []).map((client: any) => {
      const allClientDeliverables = (deliverables || []).filter((d: any) => d.client_id === client.id)
      const clientLogs = (logs || []).filter((l: any) => l.client_id === client.id)

      // 1. Pick month-specific deliverables if available; otherwise only inherit for current/future months
      const monthSpecific = allClientDeliverables.filter((d: any) => d.target_month === monthStr)
      let activeDeliverables: any[] = []

      if (monthSpecific.length > 0) {
        // Explicit targets set specifically for this month
        activeDeliverables = monthSpecific
      } else {
        const istCurrentMonth = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 7)
        // If it's the current or future month, inherit the latest active plan so user has a starting template
        if (monthStr >= istCurrentMonth) {
          const baseline = allClientDeliverables.filter((d: any) => d.target_month === null || d.target_month === undefined)
          if (baseline.length > 0) {
            activeDeliverables = baseline
          } else {
            const sorted = [...allClientDeliverables].sort((a, b) => (b.target_month || '').localeCompare(a.target_month || ''))
            const latestMonth = sorted[0]?.target_month
            activeDeliverables = sorted.filter(d => d.target_month === latestMonth)
          }
        } else {
          // For a PAST month (e.g. July):
          // Do NOT inject August's targets into July! Past months only show deliverables that were explicitly set or actually had logs in that month.
          activeDeliverables = []
        }
      }

      // Deduplicate by content_type
      const seenTypes = new Set<string>()
      const uniqueActive: any[] = []
      for (const d of activeDeliverables) {
        const key = (d.content_type || '').toLowerCase()
        if (!seenTypes.has(key) && Number(d.monthly_target) > 0) {
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
          remaining: Math.max(0, d.monthly_target - completed),
          percent: d.monthly_target > 0 ? Math.min(100, Math.round((completed / d.monthly_target) * 100)) : 0,
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
            monthly_target: completed, // Completed matches target for historical logs
            completed,
            remaining: 0,
            percent: 100,
            dailyBreakdown,
            logs: matchedLogs,
            isHistorical: true
          })
        }
      }

      return { ...client, deliverables: formattedDeliverables, totalLogs: clientLogs.length }
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
    const { client_id, deliverable_id, count, notes, log_date } = await req.json()

    let actualDeliverableId = deliverable_id
    if (String(deliverable_id).startsWith('hist-')) {
      const existingDeliv = await queryOne<any>(
        'SELECT id FROM client_deliverables WHERE client_id = $1 LIMIT 1',
        [client_id]
      )
      if (existingDeliv) actualDeliverableId = existingDeliv.id
    }

    const data = await queryOne<any>(
      `INSERT INTO client_progress_log (client_id, deliverable_id, employee_id, log_date, count, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        client_id,
        actualDeliverableId,
        user.id,
        log_date || new Date().toISOString().slice(0, 10),
        Number(count),
        notes || null
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
