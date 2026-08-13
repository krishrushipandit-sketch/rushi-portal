import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// eSSL ADMS Push Protocol Receiver
// Machine does GET /iclock/cdata?SN=XXX&options=all to register
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sn = searchParams.get('SN')
  console.log(`[Biometric ADMS] Device registered: SN=${sn}`)

  return new NextResponse(
    `GET OPTION FROM: ${sn}\nATTLOGStamp=0\nOPERLOGStamp=0\nATTPHOTOStamp=0\nErrorDelay=30\nDelay=10\nTransTimes=00:00;14:05\nTransInterval=1\nTransFlag=TransData AttLog \nTimeZone=5.5\nRealtime=1\nEncrypt=None\nServerVer=2.4.1\nPushProtVer=2.4.1\n`,
    { status: 200, headers: { 'Content-Type': 'text/plain' } }
  )
}

// Machine POSTs attendance data to /iclock/cdata?SN=XXX&table=ATTLOG
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sn = searchParams.get('SN')
  const table = searchParams.get('table')

  if (table !== 'ATTLOG') {
    return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }

  try {
    const body = await req.text()
    console.log(`[Biometric ADMS] Attendance Push from SN=${sn}:`, body)

    const lines = body.trim().split('\n').filter(Boolean)
    const logs: { biometric_id: string; timestamp: string }[] = []

    for (const line of lines) {
      const parts = line.split('\t')
      if (parts.length >= 2) {
        const biometric_id = parts[0].trim()
        const rawTime = parts[1].trim()
        const timestamp = new Date(rawTime.replace(' ', 'T') + '+05:30').toISOString()
        logs.push({ biometric_id, timestamp })
      }
    }

    if (logs.length === 0) {
      return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
    }

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

    for (const [key, times] of Object.entries(grouped)) {
      const [biometric_id, report_date] = key.split('_')
      const { data: profile } = await db().from('profiles').select('id').eq('biometric_id', biometric_id).single()
      if (!profile) { console.log(`[Biometric] No profile for biometric_id=${biometric_id}`); continue }

      const employee_id = profile.id
      const toTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' })
      const checkInStr = toTime(times.checkIn)
      const checkOutStr = times.checkOut ? toTime(times.checkOut) : null

      const { data: existing } = await db().from('daily_reports').select('id').eq('employee_id', employee_id).eq('report_date', report_date).single()
      const reportPayload: any = { check_in_time: checkInStr }
      if (checkOutStr) reportPayload.check_out_time = checkOutStr

      if (existing) {
        await db().from('daily_reports').update(reportPayload).eq('id', existing.id)
      } else {
        await db().from('daily_reports').insert({ employee_id, report_date, entries: [], ...reportPayload })
      }

      // ── Mark attendance immediately on FIRST punch (check-in) ──
      // Default = 'present'. If they checkout before 5PM, upgrade to 'half_day'.
      let attendanceStatus = 'present'
      if (checkOutStr && checkOutStr < '17:00') {
        attendanceStatus = 'half_day'
      }

      await db().from('employee_attendance').upsert({
        employee_id,
        date: report_date,
        status: attendanceStatus,
        updated_at: new Date().toISOString()
      }, { onConflict: 'employee_id,date' })
    }

    return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  } catch (err: any) {
    console.error('[Biometric ADMS] Error:', err.message)
    return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
  }
}
