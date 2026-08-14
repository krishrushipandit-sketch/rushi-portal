import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    let sql = `
      SELECT 
        l.*,
        COALESCE(l.client_name, l.name, '') AS client_name,
        CASE WHEN p.id IS NOT NULL THEN json_build_object(
          'id', p.id,
          'full_name', p.full_name,
          'email', p.email
        ) ELSE NULL END AS assigned_to_profile
      FROM leads l
      LEFT JOIN profiles p ON p.id = l.assigned_to
    `
    const params: unknown[] = []

    if (user.role !== 'admin') {
      params.push(user.userId)
      sql += ` WHERE l.assigned_to = $1`
    }

    sql += ` ORDER BY l.created_at DESC`

    const data = await query(sql, params)
    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { client_name, phone, email, category, status, source, notes, follow_up_date, assigned_to } = body

    if (!client_name || !phone || !category) {
      return NextResponse.json({ error: 'client_name, phone and category are required' }, { status: 400 })
    }

    const assignedToVal = user.role === 'admin' ? (assigned_to || user.userId) : user.userId

    const data = await queryOne(
      `INSERT INTO leads (name, client_name, phone, email, category, status, source, notes, follow_up_date, assigned_to)
       VALUES ($1, $1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        client_name,
        phone,
        email || null,
        category,
        status || 'new',
        source || null,
        notes || null,
        follow_up_date || null,
        assignedToVal
      ]
    )

    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
