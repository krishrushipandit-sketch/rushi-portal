import { NextRequest, NextResponse } from 'next/server'
import { queryOne, execute } from '@/lib/db'
import { getUserFromRequest } from '@/lib/auth'

async function getAdminAuth(req: NextRequest) {
  const user = await getUserFromRequest(req)
  if (!user) return null
  if (user.role === 'admin') return user

  // Also allow Kedar (Co-Founder - OORRUU Media)
  const profile = await queryOne<{ role: string; email: string; full_name: string }>(
    'SELECT role, email, full_name FROM profiles WHERE id = $1',
    [user.userId]
  )
  if (
    profile?.role === 'admin' ||
    profile?.email?.toLowerCase().includes('kedar') ||
    profile?.full_name?.toLowerCase().includes('kedar')
  ) {
    return user
  }

  return null
}

// POST /api/clients — create a new client with deliverables
export async function POST(req: NextRequest) {
  const user = await getAdminAuth(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name, color, logo_url, deliverables } = await req.json()

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 })
    }

    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Insert client
    const client = await queryOne<{ id: string; name: string; slug: string; color: string; logo_url: string | null; is_active: boolean }>(
      `INSERT INTO clients (name, slug, color, logo_url, is_active)
       VALUES ($1, $2, $3, $4, true)
       RETURNING *`,
      [name.trim(), slug, color || '#6366f1', logo_url || null]
    )

    if (!client) {
      throw new Error('Failed to create client')
    }

    // Insert deliverables if provided
    if (Array.isArray(deliverables) && deliverables.length > 0) {
      const validDeliverables = deliverables.filter(
        (d: any) => d.content_type && Number(d.monthly_target) > 0
      )
      for (const d of validDeliverables) {
        await execute(
          `INSERT INTO client_deliverables (client_id, content_type, monthly_target)
           VALUES ($1, $2, $3)`,
          [client.id, d.content_type, Number(d.monthly_target)]
        )
      }
    }

    return NextResponse.json({ success: true, client }, { status: 201 })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// PATCH /api/clients?id=xxx — update client details and deliverables
export async function PATCH(req: NextRequest) {
  const user = await getAdminAuth(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  try {
    const { name, color, logo_url, deliverables } = await req.json()

    // Update client record
    const updates: string[] = []
    const params: unknown[] = []

    if (name?.trim()) {
      params.push(name.trim())
      updates.push(`name = $${params.length}`)
    }
    if (color) {
      params.push(color)
      updates.push(`color = $${params.length}`)
    }
    if (logo_url !== undefined) {
      params.push(logo_url || null)
      updates.push(`logo_url = $${params.length}`)
    }

    if (updates.length > 0) {
      params.push(id)
      await execute(`UPDATE clients SET ${updates.join(', ')} WHERE id = $${params.length}`, params)
    }

    // Upsert deliverables: delete existing then re-insert
    if (Array.isArray(deliverables)) {
      await execute(`DELETE FROM client_deliverables WHERE client_id = $1`, [id])
      const validDeliverables = deliverables.filter(
        (d: any) => d.content_type && Number(d.monthly_target) > 0
      )
      for (const d of validDeliverables) {
        await execute(
          `INSERT INTO client_deliverables (client_id, content_type, monthly_target)
           VALUES ($1, $2, $3)`,
          [id, d.content_type, Number(d.monthly_target)]
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

// DELETE /api/clients?id=xxx — soft-delete a client
export async function DELETE(req: NextRequest) {
  const user = await getAdminAuth(req)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  try {
    await execute('UPDATE clients SET is_active = false WHERE id = $1', [id])
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
