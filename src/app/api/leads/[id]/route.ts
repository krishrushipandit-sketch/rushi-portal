import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const allowedFields = [
      'client_name',
      'phone',
      'email',
      'category',
      'status',
      'source',
      'notes',
      'follow_up_date',
      'assigned_to',
      'updated_at',
    ]

    const updates: string[] = []
    const values: unknown[] = []

    for (const key of Object.keys(body)) {
      if (allowedFields.includes(key)) {
        values.push(body[key])
        updates.push(`${key} = $${values.length}`)
        // Keep name in sync with client_name
        if (key === 'client_name') {
          updates.push(`name = $${values.length}`)
        }
      }
    }

    if (updates.length === 0) {
      const existing = await queryOne('SELECT * FROM leads WHERE id = $1', [id])
      return NextResponse.json(existing)
    }

    values.push(id)
    const sql = `UPDATE leads SET ${updates.join(', ')} WHERE id = $${values.length} RETURNING *`
    const data = await queryOne(sql, values)

    return NextResponse.json(data)
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

    await execute('DELETE FROM leads WHERE id = $1', [id])

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
