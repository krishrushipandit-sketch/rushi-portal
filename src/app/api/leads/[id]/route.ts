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
      'name',
      'phone',
      'email',
      'category',
      'industry',
      'platform',
      'status',
      'source',
      'notes',
      'follow_up_date',
      'assigned_to',
      'qualification_answers',
      'followup_count',
      'last_followup_at',
      'next_followup_at',
      'updated_at',
    ]

    const updates: string[] = []
    const values: unknown[] = []

    for (const key of Object.keys(body)) {
      if (allowedFields.includes(key)) {
        if (key === 'qualification_answers' && typeof body[key] === 'object') {
          values.push(JSON.stringify(body[key]))
          updates.push(`${key} = $${values.length}::jsonb`)
        } else {
          values.push(body[key])
          updates.push(`${key} = $${values.length}`)
        }

        // Keep name and client_name in sync
        if (key === 'client_name' && !body['name']) {
          values.push(body[key])
          updates.push(`name = $${values.length}`)
        } else if (key === 'name' && !body['client_name']) {
          values.push(body[key])
          updates.push(`client_name = $${values.length}`)
        }
      }
    }

    if (updates.length === 0) {
      const existing = await queryOne('SELECT * FROM leads WHERE id = $1', [id])
      return NextResponse.json(existing)
    }

    // Always touch updated_at
    updates.push('updated_at = NOW()')

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
