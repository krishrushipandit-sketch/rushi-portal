import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { sendAiSensyRingingSaleTemplate, LeadForAiSensy } from '@/lib/aisensy'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: leadId } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const lead = await queryOne<LeadForAiSensy>(
      `SELECT id, name, client_name, phone, status, whatsapp_ringing_sent 
       FROM leads 
       WHERE id = $1`,
      [leadId]
    )

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))
    const templateName = body.templateName || 'ringing_sale'

    const result = await sendAiSensyRingingSaleTemplate(lead, { templateName })

    return NextResponse.json(result)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
