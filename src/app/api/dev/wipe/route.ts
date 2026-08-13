import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  // Check secret
  const secret = req.headers.get('x-wipe-secret')
  if (secret !== 'rushipandit-wipe-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const tables = [
    'notifications',
    'task_reminder_log',
    'tasks',
    'client_progress_log',
    'daily_reports',
    'employee_points',
    'sales',
    'leads'
  ]

  const results: any[] = []

  for (const table of tables) {
    try {
      // Delete all rows where id is not null (which is all rows)
      const { error, count } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000')
      
      // Also try deleting by an arbitrary condition if ID is uuid vs int
      const { error: err2 } = await supabase.from(table).delete().not('id', 'is', null)

      results.push({ table, success: !error && !err2, error: error?.message || err2?.message })
    } catch (e: any) {
      results.push({ table, success: false, error: e.message })
    }
  }

  return NextResponse.json({ success: true, results })
}
