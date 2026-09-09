import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import { OFFICIAL_OFFICE_QR_TOKEN } from '@/app/api/attendance/scan/route'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const istDateStr = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)

    const record = await queryOne<{
      id: string
      date: string
      status: string
      check_in_time: string | null
      check_out_time: string | null
      attendance_mode: string | null
    }>(
      `SELECT id, TO_CHAR(date, 'YYYY-MM-DD') AS date, status, check_in_time, check_out_time, attendance_mode
       FROM employee_attendance
       WHERE employee_id = $1 AND date = $2`,
      [user.userId, istDateStr]
    )

    return NextResponse.json({
      date: istDateStr,
      record: record || null,
      office_qr_token: user.role === 'admin' ? OFFICIAL_OFFICE_QR_TOKEN : undefined,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
