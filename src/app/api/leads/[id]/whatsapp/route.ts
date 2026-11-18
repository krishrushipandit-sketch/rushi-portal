import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { ensureWhatsAppLog } from '@/lib/aisensy'

// GET /api/leads/:id/whatsapp → every automatic WhatsApp message sent for this lead, newest first
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (user.role !== 'admin') {
      const owned = await queryOne('SELECT 1 FROM leads WHERE id = $1 AND assigned_to = $2', [id, user.userId])
      if (!owned) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await ensureWhatsAppLog()
    const rows = await query(
      `SELECT id, kind, campaign, detail, status, error, created_at
       FROM lead_whatsapp_log WHERE lead_id = $1 ORDER BY created_at DESC LIMIT 50`,
      [id]
    )
    return NextResponse.json(rows)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
