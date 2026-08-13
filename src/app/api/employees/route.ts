import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const employees = await query(
      `SELECT id, email, full_name, role, department, designation, phone,
              whatsapp_number, avatar_url, is_active, created_at
       FROM profiles ORDER BY created_at ASC`
    )

    return NextResponse.json(employees)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (user.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { full_name, email, password, role, department, designation, whatsapp_number, phone, avatar_url } = body

    if (!email || !password || !full_name) {
      return NextResponse.json({ error: 'email, password and full_name are required' }, { status: 400 })
    }

    // Check if email already exists
    const existing = await queryOne('SELECT id FROM profiles WHERE email = $1', [email.toLowerCase()])
    if (existing) return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 400 })

    const password_hash = await bcrypt.hash(password, 10)

    const [newUser] = await query(
      `INSERT INTO profiles (email, full_name, password_hash, role, department, designation, phone, whatsapp_number, avatar_url, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
       RETURNING id, email, full_name, role, department, designation`,
      [email.toLowerCase(), full_name, password_hash, role || 'employee', department, designation, phone, whatsapp_number, avatar_url]
    )

    return NextResponse.json({ success: true, user: newUser })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
