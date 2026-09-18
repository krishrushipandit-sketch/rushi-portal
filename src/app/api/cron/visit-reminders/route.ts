import { NextRequest, NextResponse } from 'next/server'
import { processScheduledVisitReminders } from '@/lib/aisensy'
import { getUserFromRequest } from '@/lib/auth'

const CRON_SECRET = process.env.CRON_SECRET || 'rushipandit-cron-2026'

async function checkAuth(req: NextRequest) {
  const secret =
    req.headers.get('x-cron-secret') ||
    new URL(req.url).searchParams.get('secret')

  if (secret === CRON_SECRET) return true

  // Allow admin users to trigger manually from portal
  const user = await getUserFromRequest(req).catch(() => null)
  if (user?.role === 'admin') return true

  return false
}

export async function GET(req: NextRequest) {
  const authorized = await checkAuth(req)
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await processScheduledVisitReminders()
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    })
  } catch (err: any) {
    console.error('[Visit Reminders Cron Error]:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}
