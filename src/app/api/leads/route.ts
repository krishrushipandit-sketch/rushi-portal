import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()

    let query = supabase
      .from('leads')
      .select(`
        *,
        assigned_to_profile:profiles!leads_assigned_to_fkey(id, full_name, email)
      `)
      .order('created_at', { ascending: false })

    if (profile?.role !== 'admin') {
      query = query.eq('assigned_to', user.id)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { client_name, phone, email, category, status, source, notes, follow_up_date, assigned_to } = body

    if (!client_name || !phone || !category) {
      return NextResponse.json({ error: 'client_name, phone and category are required' }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()

    const { data, error } = await supabase.from('leads').insert({
      client_name,
      phone,
      email,
      category,
      status: status || 'new',
      source,
      notes,
      follow_up_date,
      assigned_to: profile?.role === 'admin' ? (assigned_to || user.id) : user.id,
    }).select().single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
