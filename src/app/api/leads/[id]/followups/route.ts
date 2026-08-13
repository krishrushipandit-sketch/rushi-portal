import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await query(
      `
      SELECT 
        lf.*,
        CASE WHEN p.id IS NOT NULL THEN json_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'email', p.email
        ) ELSE NULL END AS sales_rep
      FROM lead_followups lf
      LEFT JOIN profiles p ON p.id = lf.sales_rep_id
      WHERE lf.lead_id = $1
      ORDER BY lf.created_at DESC
      `,
      [leadId]
    )

    return NextResponse.json(data || [])
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { call_status, notes, scheduled_at, whatsapp_visit } = body

    if (!call_status) {
      return NextResponse.json({ error: 'call_status is required' }, { status: 400 })
    }

    // Fetch existing lead to get current followup_count
    const lead = await queryOne<{ followup_count: number | null; status: string }>(
      'SELECT followup_count, status FROM leads WHERE id = $1',
      [leadId]
    )

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const nextFollowupNum = (lead.followup_count || 0) + 1
    const now = new Date().toISOString()

    // 1. Insert follow-up record
    const followup = await queryOne(
      `
      INSERT INTO lead_followups (
        lead_id,
        sales_rep_id,
        followup_number,
        call_status,
        notes,
        scheduled_at,
        completed_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        leadId,
        user.userId,
        nextFollowupNum,
        call_status,
        notes || null,
        scheduled_at || null,
        now,
      ]
    )

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
    const updateFields: string[] = ['status = $1', 'followup_count = $2', 'last_followup_at = $3']
    const updateParams: unknown[] = [call_status, nextFollowupNum, now]

    if (nextFollowupDate) {
      updateParams.push(nextFollowupDate)
      updateFields.push(`next_followup_at = $${updateParams.length}`)
    }

    if (whatsapp_visit) {
      updateParams.push(true)
      updateFields.push(`whatsapp_visit_msg_sent = $${updateParams.length}`)
      updateParams.push('Sent')
      updateFields.push(`whatsapp_msg_status = $${updateParams.length}`)
    }

    updateParams.push(leadId)
    const updatedLead = await queryOne(
      `UPDATE leads SET ${updateFields.join(', ')} WHERE id = $${updateParams.length} RETURNING *`,
      updateParams
    )

    return NextResponse.json({
      success: true,
      followup,
      lead: updatedLead,
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
