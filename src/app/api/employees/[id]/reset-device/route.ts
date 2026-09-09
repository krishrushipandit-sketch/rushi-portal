import { NextRequest, NextResponse } from 'next/server'
import { execute, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(req)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 })
    }

    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Employee ID required' }, { status: 400 })
    }

    const updated = await queryOne(
      `UPDATE profiles
       SET registered_device_id = NULL, device_registered_at = NULL
       WHERE id = $1
       RETURNING id, full_name, email, registered_device_id`,
      [id]
    )

    if (!updated) {
      return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Device registration reset successfully. The employee can now register a new device on next login.',
      user: updated,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
