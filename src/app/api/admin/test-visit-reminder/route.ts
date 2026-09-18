import { NextRequest, NextResponse } from 'next/server'
import {
  sendAiSensyVisitReminder,
  VISIT_DEFAULT_LOCATION,
  getAiSensyApiKey,
  normalizePhoneForWhatsApp,
  formatVisitDateIST,
  formatVisitTimeIST,
} from '@/lib/aisensy'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const phone = searchParams.get('phone') || '9768726006'
    const name = searchParams.get('name') || 'Rushikesh Pandit'
    const type = searchParams.get('type') || 'both' // 'both' | '24hr_48hr_site' | 'visit_reminder'
    const location = searchParams.get('location') || VISIT_DEFAULT_LOCATION

    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    // Set time to 11:30 AM
    tomorrow.setHours(11, 30, 0, 0)

    const results: any = {}

    // Test 1: 24hr / 48hr reminder (Campaign: 24hr_48hr_site)
    if (type === 'both' || type === '24hr_48hr_site' || type === '48hr' || type === '24hr') {
      const res1 = await sendAiSensyVisitReminder({
        leadId: 'test-lead-48hr',
        name,
        phone,
        visitDateTime: tomorrow,
        reminderType: '24hr',
        location,
      })
      results.campaign_24hr_48hr_site = res1
    }

    // Test 2: Today reminder (Campaign: visit_reminder)
    if (type === 'both' || type === 'visit_reminder' || type === 'today') {
      const todayVisit = new Date()
      todayVisit.setHours(11, 30, 0, 0)

      const res2 = await sendAiSensyVisitReminder({
        leadId: 'test-lead-today',
        name,
        phone,
        visitDateTime: todayVisit,
        reminderType: 'today',
        location,
      })
      results.campaign_visit_reminder = res2
    }

    return NextResponse.json({
      success: true,
      testedPhone: phone,
      location,
      results,
    })
  } catch (err: any) {
    console.error('[Test Visit Reminder Error]:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  return GET(req)
}
