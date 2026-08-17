import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

/**
 * POST /api/admin/migrate-aisensy
 * One-time migration to add whatsapp_ringing_sent columns.
 * Only callable by admin users.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 })
    }

    const results: string[] = []

    // Add whatsapp_ringing_sent column
    try {
      await execute(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS whatsapp_ringing_sent BOOLEAN DEFAULT FALSE`)
      results.push('✅ whatsapp_ringing_sent column added')
    } catch (e: any) {
      results.push(`⚠️ whatsapp_ringing_sent: ${e.message}`)
    }

    // Add last_whatsapp_sent_at column
    try {
      await execute(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_whatsapp_sent_at TIMESTAMPTZ`)
      results.push('✅ last_whatsapp_sent_at column added')
    } catch (e: any) {
      results.push(`⚠️ last_whatsapp_sent_at: ${e.message}`)
    }

    // Add whatsapp_msg_status column
    try {
      await execute(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS whatsapp_msg_status TEXT`)
      results.push('✅ whatsapp_msg_status column added')
    } catch (e: any) {
      results.push(`⚠️ whatsapp_msg_status: ${e.message}`)
    }

    // Also add phone column to profiles if missing
    try {
      await execute(`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT`)
      results.push('✅ profiles.phone column checked/added')
    } catch (e: any) {
      results.push(`⚠️ profiles.phone: ${e.message}`)
    }

    return NextResponse.json({ success: true, results })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
