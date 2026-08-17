import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { handleLeadStatusChangeAiSensy } from '@/lib/aisensy'

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
        COALESCE(lf.call_status, lf.outcome, 'ringing') AS call_status,
        COALESCE(lf.followup_number, lf.followup_num, 1) AS followup_number,
        COALESCE(lf.scheduled_at, lf.next_followup) AS scheduled_at,
        COALESCE(lf.completed_at, lf.created_at) AS completed_at,
        CASE WHEN p.id IS NOT NULL THEN json_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'email', p.email
        ) ELSE NULL END AS sales_rep
      FROM lead_followups lf
      LEFT JOIN profiles p ON (p.id = lf.sales_rep_id OR p.id = lf.done_by)
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

    // 1. Insert follow-up record writing to both column aliases
    const followup = await queryOne(
      `
      INSERT INTO lead_followups (
        lead_id,
        sales_rep_id,
        done_by,
        followup_number,
        followup_num,
        call_status,
        outcome,
        notes,
        scheduled_at,
        next_followup,
        completed_at
      )
      VALUES ($1, $2, $2, $3, $3, $4, $4, $5, $6, $6, $7)
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
        d.setHours(d.getHours() + 4)
        nextFollowupDate = d.toISOString()
      } else if (call_status === 'not_connected' || call_status === 'switched_off') {
        d.setDate(d.getDate() + 1)
        nextFollowupDate = d.toISOString()
      }
    }

    // 3. Update lead table: update status, followup_count, timestamps
    const updatedLead = await queryOne(
      `UPDATE leads SET
        status = $1,
        followup_count = $2,
        last_followup_at = $3,
        next_followup_at = COALESCE($4, next_followup_at),
        follow_up_date = COALESCE($4, follow_up_date),
        notes = CASE WHEN $5::text IS NOT NULL AND $5::text != '' THEN $5::text ELSE notes END,
        updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        call_status,
        nextFollowupNum,
        now,
        nextFollowupDate,
        notes || null,
        leadId
      ]
    )

    // 4. Trigger AiSensy ringing_sale template if status was updated
    if (call_status) {
      handleLeadStatusChangeAiSensy(leadId, call_status, user.userId).catch((e) => {
        console.error('AiSensy background trigger error:', e)
      })
    }

    return NextResponse.json({
      success: true,
      followup,
      lead: updatedLead,
    })
  } catch (err: unknown) {
    console.error('Followup POST error:', err)
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
