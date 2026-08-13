import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Example payload from our local sync script:
// { logs: [ { biometric_id: '1', timestamp: '2026-05-15T09:00:00Z' }, ... ] }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { logs } = body

    if (!Array.isArray(logs) || logs.length === 0) {
      return NextResponse.json({ success: true, message: 'No logs' })
    }

    // Group logs by biometric_id and date
    // We want the earliest punch as check_in, latest as check_out
    const punchesByEmpAndDate: Record<string, { checkIn: Date, checkOut: Date | null }> = {}

    for (const log of logs) {
      const { biometric_id, timestamp } = log
      const dateObj = new Date(timestamp)
      // Convert to IST date string
      const istDate = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
      
      const key = `${biometric_id}_${istDate}`
      if (!punchesByEmpAndDate[key]) {
        punchesByEmpAndDate[key] = { checkIn: dateObj, checkOut: null }
      } else {
        if (dateObj < punchesByEmpAndDate[key].checkIn) {
          punchesByEmpAndDate[key].checkIn = dateObj
        }
        if (!punchesByEmpAndDate[key].checkOut || dateObj > punchesByEmpAndDate[key].checkOut!) {
          // If the punch is at least 30 minutes after check in, it can be a check out
          const diffMinutes = (dateObj.getTime() - punchesByEmpAndDate[key].checkIn.getTime()) / 60000
          if (diffMinutes > 30) {
             punchesByEmpAndDate[key].checkOut = dateObj
          }
        }
      }
    }

    // Process grouped punches
    for (const [key, times] of Object.entries(punchesByEmpAndDate)) {
      const [biometric_id, report_date] = key.split('_')
      
      // 1. Find Employee by biometric_id
      const { data: profile } = await db()
        .from('profiles')
        .select('id')
        .eq('biometric_id', biometric_id)
        .single()

      if (!profile) continue // Unmapped employee

      const employee_id = profile.id
      const checkInTimeStr = times.checkIn.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
      let checkOutTimeStr = undefined
      if (times.checkOut) {
         checkOutTimeStr = times.checkOut.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
      }

      // 2. Upsert Daily Report
      const { data: existingReport } = await db()
        .from('daily_reports')
        .select('id')
        .eq('employee_id', employee_id)
        .eq('report_date', report_date)
        .single()

      if (existingReport) {
        await db().from('daily_reports').update({
          check_in_time: checkInTimeStr,
          ...(checkOutTimeStr ? { check_out_time: checkOutTimeStr } : {})
        }).eq('id', existingReport.id)
      } else {
        await db().from('daily_reports').insert({
          employee_id,
          report_date,
          check_in_time: checkInTimeStr,
          ...(checkOutTimeStr ? { check_out_time: checkOutTimeStr } : {}),
          entries: [] // Empty report
        })
      }

      // 3. Auto mark attendance if check_out is present
      if (checkOutTimeStr) {
        const isHalfDay = checkOutTimeStr < '17:00'
        await db().from('employee_attendance').upsert({
          employee_id,
          date: report_date,
          status: isHalfDay ? 'half_day' : 'present',
          updated_at: new Date().toISOString()
        }, { onConflict: 'employee_id,date' })
      }
    }

    return NextResponse.json({ success: true, processed: logs.length })
  } catch (err: any) {
    console.error('Biometric Webhook Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
