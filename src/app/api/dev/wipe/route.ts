import { NextRequest, NextResponse } from 'next/server'
import { execute } from '@/lib/db'

export async function POST(req: NextRequest) {
  // Check secret
  const secret = req.headers.get('x-wipe-secret')
  if (secret !== 'rushipandit-wipe-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
      await execute(`DELETE FROM "${table}"`)
      results.push({ table, success: true })
    } catch (e: any) {
      results.push({ table, success: false, error: e.message })
    }
  }

  return NextResponse.json({ success: true, results })
}
