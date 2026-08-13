import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { report_id, admin_comment } = await req.json()
    if (!report_id) {
      return NextResponse.json({ error: 'Missing report_id' }, { status: 400 })
    }

    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Verify caller is an admin
    const adminProfile = await queryOne<{ role: string; full_name: string }>(
      'SELECT role, full_name FROM profiles WHERE id = $1',
      [user.userId]
    )
    if (adminProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 2. Fetch existing report to find the employee_id
    const report = await queryOne<{ employee_id: string; report_date: string }>(
      'SELECT employee_id, report_date FROM daily_reports WHERE id = $1',
      [report_id]
    )

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // 3. Update the comment
    try {
      await execute(
        'UPDATE daily_reports SET admin_comment = $1 WHERE id = $2',
        [admin_comment, report_id]
      )
    } catch (updateErr: any) {
      if (updateErr.message && updateErr.message.includes('admin_comment')) {
        return NextResponse.json({ error: 'Please run the SQL migration first' }, { status: 500 })
      }
      throw updateErr
    }

    // 4. Send Notification to the employee (if comment is not empty)
    if (admin_comment && admin_comment.trim() !== '') {
      try {
        await execute(
          `INSERT INTO notifications (user_id, title, message, type, is_read)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            report.employee_id,
            'New Comment on Daily Report',
            `Rushikesh Sir commented on your report for ${report.report_date}.`,
            'info',
            false,
          ]
        )
      } catch (notifError) {
        console.error('Notification error:', notifError)
      }
    }

    return NextResponse.json({ success: true, admin_comment })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
