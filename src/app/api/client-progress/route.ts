import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await db().auth.getUser(token)
  if (!user) return null
  const { data: profile } = await db().from('profiles').select('role, department, designation').eq('id', user.id).single()
  return { user, profile }
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
    // Get all active clients with their deliverables
    // Try with logo_url first; fall back without it if the column doesn't exist yet
    let clients: any[] | null = null
    const { data: clientsWithLogo, error: logoErr } = await db()
      .from('clients')
      .select(`
        id, name, slug, color, logo_url,
        deliverables:client_deliverables(id, content_type, monthly_target)
      `)
      .eq('is_active', true)
      .order('name')

    if (logoErr) {
      // logo_url column probably doesn't exist yet — query without it
      const { data: clientsNoLogo } = await db()
        .from('clients')
        .select(`
          id, name, slug, color,
          deliverables:client_deliverables(id, content_type, monthly_target)
        `)
        .eq('is_active', true)
        .order('name')
      clients = (clientsNoLogo || []).map((c: any) => ({ ...c, logo_url: null }))
    } else {
      clients = clientsWithLogo || []
    }

    // Get all progress logs for this month — include id for deletion
    const { data: logs } = await db()
      .from('client_progress_log')
      .select('id, client_id, deliverable_id, employee_id, log_date, count, notes, employee:profiles!client_progress_log_employee_id_fkey(full_name)')
      .gte('log_date', dateFrom)
      .lt('log_date', dateTo)
      .order('log_date', { ascending: false })

    // Build full picture per client
    const clientsWithProgress = (clients || []).map((client: any) => {
      const clientLogs = (logs || []).filter(l => l.client_id === client.id)
      
      const deliverables = (client.deliverables || []).map((d: any) => {
        const delivLogs = clientLogs.filter(l => l.deliverable_id === d.id)
        const completed = delivLogs.reduce((sum: number, l: any) => sum + (l.count || 0), 0)
        const dailyBreakdown = delivLogs.reduce((acc: Record<string, number>, l: any) => {
          acc[l.log_date] = (acc[l.log_date] || 0) + l.count
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

      return { ...client, deliverables, totalLogs: clientLogs.length }
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

    if (!client_id || !deliverable_id || !count) {
      return NextResponse.json({ error: 'client_id, deliverable_id and count are required' }, { status: 400 })
    }

    const { data, error } = await db()
      .from('client_progress_log')
      .insert({
        client_id,
        deliverable_id,
        employee_id: user.id,
        log_date: log_date || new Date().toISOString().slice(0, 10),
        count: Number(count),
        notes: notes || null
      })
      .select()
      .single()

    if (error) throw error
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
    const { error } = await db().from('client_progress_log').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
