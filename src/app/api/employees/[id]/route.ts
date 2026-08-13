import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Employees can only fetch their own profile; admins can fetch any
    if (user.role !== 'admin' && user.userId !== id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const profile = await queryOne(
      `SELECT id, email, full_name, role, department, designation, phone,
              whatsapp_number, avatar_url, bio, is_active, created_at
       FROM profiles WHERE id = $1`,
      [id]
    )

    if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(profile)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (id === user.userId) return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })

    await execute('DELETE FROM profiles WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Employees can update their own profile (phone, password, avatar_url)
    // Admins can update any profile (full_name, department, designation, is_active, etc.)
    const isSelf = user.userId === id
    const isAdmin = user.role === 'admin'

    if (!isAdmin && !isSelf) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { full_name, department, designation, phone, whatsapp_number, avatar_url, bio, is_active, password, currentPassword } = body

    // If employee is changing their own password, verify current password first
    if (password && isSelf) {
      const profile = await queryOne<{ password_hash: string }>(
        'SELECT password_hash FROM profiles WHERE id = $1',
        [id]
      )
      if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 })

      if (currentPassword) {
        const valid = await bcrypt.compare(currentPassword, profile.password_hash)
        if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      }
    }

    const fields: string[] = []
    const values: unknown[] = []
    let idx = 1

    // Admin-only fields
    if (isAdmin) {
      if (full_name !== undefined) { fields.push(`full_name = $${idx++}`); values.push(full_name) }
      if (department !== undefined) { fields.push(`department = $${idx++}`); values.push(department) }
      if (designation !== undefined) { fields.push(`designation = $${idx++}`); values.push(designation) }
      if (is_active !== undefined) { fields.push(`is_active = $${idx++}`); values.push(is_active) }
    }

    // Self-editable fields (employees can change their own)
    if (isAdmin || isSelf) {
      if (phone !== undefined) { fields.push(`phone = $${idx++}`); values.push(phone) }
      if (whatsapp_number !== undefined) { fields.push(`whatsapp_number = $${idx++}`); values.push(whatsapp_number) }
      if (avatar_url !== undefined) { fields.push(`avatar_url = $${idx++}`); values.push(avatar_url) }
      if (bio !== undefined) { fields.push(`bio = $${idx++}`); values.push(bio) }
      if (password) {
        const password_hash = await bcrypt.hash(password, 10)
        fields.push(`password_hash = $${idx++}`)
        values.push(password_hash)
      }
    }

    if (fields.length === 0) return NextResponse.json({ error: 'No fields to update' }, { status: 400 })

    fields.push(`updated_at = NOW()`)
    values.push(id)

    await execute(
      `UPDATE profiles SET ${fields.join(', ')} WHERE id = $${idx}`,
      values
    )

    const updated = await queryOne(
      'SELECT id, email, full_name, role, department, designation, phone, whatsapp_number, avatar_url, bio, is_active FROM profiles WHERE id = $1',
      [id]
    )

    return NextResponse.json({ success: true, user: updated })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
