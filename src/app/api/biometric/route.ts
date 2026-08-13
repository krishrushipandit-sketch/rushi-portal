import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'

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
    const punchesByEmpAndDate: Record<string, { checkIn: Date; checkOut: Date | null }> = {}

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
      const profile = await queryOne<{ id: string }>(
        'SELECT id FROM profiles WHERE biometric_id = $1',
        [biometric_id]
      )

      if (!profile) continue // Unmapped employee

      const employee_id = profile.id
      const checkInTimeStr = times.checkIn.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
      let checkOutTimeStr: string | undefined = undefined
      if (times.checkOut) {
        checkOutTimeStr = times.checkOut.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
      }

      // 2. Upsert Daily Report
      const existingReport = await queryOne<{ id: string }>(
        'SELECT id FROM daily_reports WHERE employee_id = $1 AND report_date = $2',
        [employee_id, report_date]
      )

      if (existingReport) {
        if (checkOutTimeStr) {
          await execute(
            'UPDATE daily_reports SET check_in_time = $1, check_out_time = $2 WHERE id = $3',
            [checkInTimeStr, checkOutTimeStr, existingReport.id]
          )
        } else {
          await execute(
            'UPDATE daily_reports SET check_in_time = $1 WHERE id = $2',
            [checkInTimeStr, existingReport.id]
          )
        }
      } else {
        if (checkOutTimeStr) {
          await execute(
            `INSERT INTO daily_reports (employee_id, report_date, check_in_time, check_out_time, entries)
             VALUES ($1, $2, $3, $4, $5::jsonb)`,
            [employee_id, report_date, checkInTimeStr, checkOutTimeStr, JSON.stringify([])]
          )
        } else {
          await execute(
            `INSERT INTO daily_reports (employee_id, report_date, check_in_time, entries)
             VALUES ($1, $2, $3, $4::jsonb)`,
            [employee_id, report_date, checkInTimeStr, JSON.stringify([])]
          )
        }
      }

      // 3. Auto mark attendance if check_out is present
      if (checkOutTimeStr) {
        const isHalfDay = checkOutTimeStr < '17:00'
        await execute(
          `INSERT INTO employee_attendance (employee_id, date, status, updated_at)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (employee_id, date)
           DO UPDATE SET status = EXCLUDED.status, updated_at = EXCLUDED.updated_at`,
          [employee_id, report_date, isHalfDay ? 'half_day' : 'present', new Date().toISOString()]
        )
      }
    }

    return NextResponse.json({ success: true, processed: logs.length })
  } catch (err: any) {
    console.error('Biometric Webhook Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
