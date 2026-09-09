import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

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
      // ── WFH CHECK-IN ──
      const updated = await queryOne(
        `INSERT INTO employee_attendance (employee_id, date, status, check_in_time, attendance_mode, updated_at)
         VALUES ($1, $2, 'wfh', $3, 'wfh', NOW())
         ON CONFLICT (employee_id, date) DO UPDATE SET
           check_in_time = EXCLUDED.check_in_time,
           status = 'wfh',
           attendance_mode = 'wfh',
           updated_at = NOW()
         RETURNING *`,
        [user.userId, dateStr, timeStr]
      )

      return NextResponse.json({
        success: true,
        action: 'check_in_wfh',
        time: timeStr.slice(0, 5),
        message: `Work From Home In Time recorded: ${timeStr.slice(0, 5)}`,
        record: updated,
      })
    } else if (!existing.check_out_time) {
      // ── WFH CHECK-OUT ──
      const updated = await queryOne(
        `UPDATE employee_attendance
         SET check_out_time = $1,
             updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [timeStr, existing.id]
      )

      return NextResponse.json({
        success: true,
        action: 'check_out_wfh',
        time: timeStr.slice(0, 5),
        message: `Work From Home Out Time recorded: ${timeStr.slice(0, 5)}`,
        record: updated,
      })
    } else {
      return NextResponse.json({
        success: true,
        action: 'already_completed',
        time: existing.check_out_time.slice(0, 5),
        message: `WFH completed for today (In: ${existing.check_in_time.slice(0, 5)} | Out: ${existing.check_out_time.slice(0, 5)}).`,
        record: existing,
      })
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
