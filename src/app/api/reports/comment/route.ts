import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { report_id, admin_comment } = await req.json()
    if (!report_id) {
      return NextResponse.json({ error: 'Missing report_id' }, { status: 400 })
    }

    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const db = supabaseAdmin()

    // 1. Verify caller is an admin
    const { data: { user }, error: authError } = await db.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: adminProfile } = await db.from('profiles').select('role, full_name').eq('id', user.id).single()
    if (adminProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 2. Fetch existing report to find the employee_id
    const { data: report, error: reportError } = await db
      .from('daily_reports')
      .select('employee_id, report_date')
      .eq('id', report_id)
      .single()

    if (reportError || !report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // 3. Update the comment
    const { error: updateError } = await db
      .from('daily_reports')
      .update({ admin_comment })
      .eq('id', report_id)

    if (updateError) {
      // If error is about missing column, handle it nicely
      if (updateError.code === 'PGRST204' || updateError.message.includes('admin_comment')) {
         return NextResponse.json({ error: 'Please run the SQL migration first' }, { status: 500 })
      }
      throw updateError
    }

    // 4. Send Notification to the employee (if comment is not empty)
    if (admin_comment && admin_comment.trim() !== '') {
      const { error: notifError } = await db.from('notifications').insert({
        user_id: report.employee_id,
        title: 'New Comment on Daily Report',
        message: `Rushikesh Sir commented on your report for ${report.report_date}.`,
        type: 'info',
        is_read: false
      })
      if (notifError) console.error('Notification error:', notifError)
    }

    return NextResponse.json({ success: true, admin_comment })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
