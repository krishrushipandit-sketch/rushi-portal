import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'

// eSSL ADMS Push Protocol Receiver
// The biometric machine is configured to push data HERE automatically.
// Endpoint: GET /iclock/cdata  - Device check-in / registration
// Endpoint: POST /iclock/cdata - Device pushes attendance logs

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sn = searchParams.get('SN') // Machine Serial Number
  const options = searchParams.get('options')

  console.log(`[Biometric] Device Check-in: SN=${sn}, options=${options}`)

  // Respond with server time so the device syncs its clock
  const now = new Date()
  const serverTime = now.toISOString().replace('T', ' ').slice(0, 19)
  
  return new NextResponse(
    `GET OPTION FROM: ${sn}\nATTLOGStamp=0\nOPERLOGStamp=0\nATTPHOTOStamp=0\nErrorDelay=30\nDelay=10\nTransTimes=00:00;14:05\nTransInterval=1\nTransFlag=TransData AttLog \nTimeZone=5.5\nRealtime=1\nEncrypt=None\nServerVer=2.4.1\nPushProtVer=2.4.1\n`,
    {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    }
  )
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sn = searchParams.get('SN')
  const table = searchParams.get('table')

  // We only care about attendance log pushes
  if (table !== 'ATTLOG') {
    return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }

  try {
    const body = await req.text()
    console.log(`[Biometric] Attendance Push from SN=${sn}:`)
    console.log(body)

    // ATTLOG format per line: "DeviceUserId\tDateTime\tStatus\tVerifyMode\t..."
    // Example: "1\t2026-05-15 09:05:12\t0\t1\t..."
    const lines = body.trim().split('\n').filter(Boolean)
    const logs: { biometric_id: string; timestamp: string }[] = []

    for (const line of lines) {
      const parts = line.split('\t')
      if (parts.length >= 2) {
        const biometric_id = parts[0].trim()
        const rawTime = parts[1].trim() // "2026-05-15 09:05:12"
        const timestamp = new Date(rawTime.replace(' ', 'T') + '+05:30').toISOString()
        logs.push({ biometric_id, timestamp })
      }
    }

    if (logs.length === 0) {
      return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
    }

    // Group logs: earliest punch = check_in, latest (>30 min after) = check_out
    const grouped: Record<string, { checkIn: Date; checkOut: Date | null }> = {}

    for (const log of logs) {
      const dateObj = new Date(log.timestamp)
      const istDate = new Date(dateObj.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
      const key = `${log.biometric_id}_${istDate}`

      if (!grouped[key]) {
        grouped[key] = { checkIn: dateObj, checkOut: null }
      } else {
        if (dateObj < grouped[key].checkIn) grouped[key].checkIn = dateObj
        const diffMin = (dateObj.getTime() - grouped[key].checkIn.getTime()) / 60000
        if (diffMin > 30 && (!grouped[key].checkOut || dateObj > grouped[key].checkOut!)) {
          grouped[key].checkOut = dateObj
        }
      }
    }

    // Write to database
    for (const [key, times] of Object.entries(grouped)) {
      const [biometric_id, report_date] = key.split('_')

      const profile = await queryOne<{ id: string }>(
        'SELECT id FROM profiles WHERE biometric_id = $1',
        [biometric_id]
      )
      if (!profile) continue

      const employee_id = profile.id
      const toTimeStr = (d: Date) =>
        d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })

      const checkInStr = toTimeStr(times.checkIn)
      const checkOutStr = times.checkOut ? toTimeStr(times.checkOut) : null

      // Upsert daily report
      const existing = await queryOne<{ id: string }>(
        'SELECT id FROM daily_reports WHERE employee_id = $1 AND report_date = $2',
        [employee_id, report_date]
      )

      if (existing) {
        if (checkOutStr) {
          await execute(
            'UPDATE daily_reports SET check_in_time = $1, check_out_time = $2 WHERE id = $3',
            [checkInStr, checkOutStr, existing.id]
          )
        } else {
          await execute(
            'UPDATE daily_reports SET check_in_time = $1 WHERE id = $2',
            [checkInStr, existing.id]
          )
        }
      } else {
        if (checkOutStr) {
          await execute(
            `INSERT INTO daily_reports (employee_id, report_date, check_in_time, check_out_time, entries)
             VALUES ($1, $2, $3, $4, $5::jsonb)`,
            [employee_id, report_date, checkInStr, checkOutStr, JSON.stringify([])]
          )
        } else {
          await execute(
            `INSERT INTO daily_reports (employee_id, report_date, check_in_time, entries)
             VALUES ($1, $2, $3, $4::jsonb)`,
            [employee_id, report_date, checkInStr, JSON.stringify([])]
          )
        }
      }

      // Auto mark attendance
      if (checkOutStr) {
        const isHalfDay = checkOutStr < '17:00'
        await execute(
          `INSERT INTO employee_attendance (employee_id, date, status, updated_at)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (employee_id, date)
           DO UPDATE SET status = EXCLUDED.status, updated_at = EXCLUDED.updated_at`,
          [employee_id, report_date, isHalfDay ? 'half_day' : 'present', new Date().toISOString()]
        )
      }
    }

    console.log(`[Biometric] Processed ${logs.length} punches from ${sn}`)
    return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })

  } catch (err: any) {
    console.error('[Biometric] Error processing push:', err.message)
    return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }
}
