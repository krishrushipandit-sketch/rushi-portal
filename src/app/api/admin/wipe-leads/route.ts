import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'

export async function GET(req: NextRequest) {
  return handleWipe()
}

export async function POST(req: NextRequest) {
  return handleWipe()
}

async function handleWipe() {
  try {
    // 1. Delete all followups and leads
    await execute('TRUNCATE TABLE lead_followups, leads CASCADE')

    // 2. Reset round robin counters
    try {
      await execute('UPDATE industry_round_robin_state SET last_assigned_index = -1')
    } catch (_) { /* ignore */ }

    // 3. Clean up lead-related notifications
    try {
      await execute(`DELETE FROM notifications WHERE title ILIKE '%Lead%' OR message ILIKE '%Lead%'`)
    } catch (_) { /* ignore */ }

    return NextResponse.json({
      success: true,
      message: 'All leads and followup records have been completely deleted. System reset to a clean state.'
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
