import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export const OFFICIAL_OFFICE_QR_TOKEN = 'RP_OFFICE_ATTENDANCE_LIVE_TOKEN_2026'

const getISTDateTime = () => {
  const now = new Date()
  const istOffset = 5.5 * 60 * 60 * 1000
  const istTime = new Date(now.getTime() + istOffset)
  const dateStr = istTime.toISOString().slice(0, 10)
  const timeStr = istTime.toISOString().slice(11, 19)
  return { dateStr, timeStr }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { qr_data, device_id } = await req.json()

    if (!qr_data || qr_data.trim() !== OFFICIAL_OFFICE_QR_TOKEN) {
      return NextResponse.json(
        { error: 'Invalid QR code. Please scan the official RushiPandit office attendance QR code.' },
        { status: 400 }
      )
    }

    // ── Device Integrity Verification ──
    if (user.role !== 'admin' && device_id) {
      const profile = await queryOne<{ registered_device_id: string | null }>(
        'SELECT registered_device_id FROM profiles WHERE id = $1',
        [user.userId]
      )
      if (profile?.registered_device_id && profile.registered_device_id !== String(device_id).trim()) {
        return NextResponse.json(
          { error: 'Proxy attendance blocked. You can only scan attendance from your registered mobile device.' },
          { status: 403 }
        )
      }
    }

    // Ensure columns exist
    await execute('ALTER TABLE employee_attendance ADD COLUMN IF NOT EXISTS check_in_time TIME').catch(() => {})
    await execute('ALTER TABLE employee_attendance ADD COLUMN IF NOT EXISTS check_out_time TIME').catch(() => {})
    await execute("ALTER TABLE employee_attendance ADD COLUMN IF NOT EXISTS attendance_mode VARCHAR(20) DEFAULT 'qr'").catch(() => {})

    const { dateStr, timeStr } = getISTDateTime()

    // Fetch existing attendance record for today
    const existing = await queryOne<{
      id: string
      check_in_time: string | null
      check_out_time: string | null
      status: string
    }>(
      'SELECT id, check_in_time, check_out_time, status FROM employee_attendance WHERE employee_id = $1 AND date = $2',
      [user.userId, dateStr]
    )

    if (!existing || !existing.check_in_time) {
      // ── MARK IN TIME ──
      const updated = await queryOne(
        `INSERT INTO employee_attendance (employee_id, date, status, check_in_time, attendance_mode, updated_at)
         VALUES ($1, $2, 'present', $3, 'qr', NOW())
         ON CONFLICT (employee_id, date) DO UPDATE SET
           check_in_time = EXCLUDED.check_in_time,
           status = CASE WHEN employee_attendance.status = 'wfh' THEN 'wfh' ELSE 'present' END,
           attendance_mode = 'qr',
           updated_at = NOW()
         RETURNING *`,
        [user.userId, dateStr, timeStr]
      )

      return NextResponse.json({
        success: true,
        action: 'check_in',
        time: timeStr.slice(0, 5),
        message: `In Time recorded: ${timeStr.slice(0, 5)}. Have a productive day!`,
        record: updated,
      })
    } else if (!existing.check_out_time) {
      // ── MARK OUT TIME ──
      const isHalfDay = timeStr < '17:00'
      const newStatus = isHalfDay ? 'half_day' : existing.status === 'wfh' ? 'wfh' : 'present'

      const updated = await queryOne(
        `UPDATE employee_attendance
         SET check_out_time = $1,
             status = $2,
             attendance_mode = 'qr',
             updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
        [timeStr, newStatus, existing.id]
      )

      return NextResponse.json({
        success: true,
        action: 'check_out',
        time: timeStr.slice(0, 5),
        message: `Out Time recorded: ${timeStr.slice(0, 5)}. Great work today!`,
        record: updated,
      })
    } else {
      // Both already recorded
      return NextResponse.json({
        success: true,
        action: 'already_completed',
        time: existing.check_out_time.slice(0, 5),
        message: `Attendance completed for today (In: ${existing.check_in_time.slice(0, 5)} | Out: ${existing.check_out_time.slice(0, 5)}).`,
        record: existing,
      })
    }
  } catch (err: any) {
    console.error('Scan error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
