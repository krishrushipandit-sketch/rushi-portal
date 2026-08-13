import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('lead_followups')
      .select(`
        *,
        sales_rep:profiles!lead_followups_sales_rep_id_fkey(id, full_name, email)
      `)
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { call_status, notes, scheduled_at, whatsapp_visit } = body

    if (!call_status) {
      return NextResponse.json({ error: 'call_status is required' }, { status: 400 })
    }

    // Fetch existing lead to get current followup_count
    const { data: lead, error: leadErr } = await supabase
      .from('leads')
      .select('followup_count, status')
      .eq('id', leadId)
      .single()

    if (leadErr || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const nextFollowupNum = (lead.followup_count || 0) + 1
    const now = new Date().toISOString()

    // 1. Insert follow-up record
    const { data: followup, error: followupErr } = await supabase
      .from('lead_followups')
      .insert({
        lead_id: leadId,
        sales_rep_id: user.id,
        followup_number: nextFollowupNum,
        call_status,
        notes: notes || null,
        scheduled_at: scheduled_at || null,
        completed_at: now
      })
      .select()
      .single()

    if (followupErr) throw followupErr

    // 2. Compute automatic next_followup_at based on call_status if not explicitly scheduled
    let nextFollowupDate = scheduled_at || null
    if (!nextFollowupDate) {
      const d = new Date()
      if (call_status === 'ringing') {
        d.setHours(d.getHours() + 4) // retry in 4 hours
        nextFollowupDate = d.toISOString()
      } else if (call_status === 'not_connected' || call_status === 'switched_off') {
        d.setDate(d.getDate() + 1) // retry next day
        nextFollowupDate = d.toISOString()
      }
    }

    // 3. Update lead table
    const updateData: any = {
      status: call_status,
      followup_count: nextFollowupNum,
      last_followup_at: now,
      ...(nextFollowupDate ? { next_followup_at: nextFollowupDate } : {}),
      ...(whatsapp_visit ? { whatsapp_visit_msg_sent: true, whatsapp_msg_status: 'Sent' } : {})
    }

    const { data: updatedLead, error: updateErr } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId)
      .select()
      .single()

    if (updateErr) throw updateErr

    return NextResponse.json({
      success: true,
      followup,
      lead: updatedLead
    })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
