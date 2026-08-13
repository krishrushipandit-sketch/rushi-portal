import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAdminAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await db().auth.getUser(token)
  if (!user) return null
  const { data: profile } = await db().from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return null
  return { user, profile }
}

// POST /api/clients — create a new client with deliverables
export async function POST(req: NextRequest) {
  const auth = await getAdminAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name, color, logo_url, deliverables } = await req.json()

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 })
    }

    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Insert client
    const { data: client, error: clientError } = await db()
      .from('clients')
      .insert({ name: name.trim(), slug, color: color || '#6366f1', logo_url: logo_url || null, is_active: true })
      .select()
      .single()

    if (clientError) throw clientError

    // Insert deliverables if provided
    if (Array.isArray(deliverables) && deliverables.length > 0) {
      const rows = deliverables
        .filter((d: any) => d.content_type && d.monthly_target > 0)
        .map((d: any) => ({
          client_id: client.id,
          content_type: d.content_type,
          monthly_target: Number(d.monthly_target),
        }))

      if (rows.length > 0) {
        const { error: delError } = await db().from('client_deliverables').insert(rows)
        if (delError) throw delError
      }
    }

    return NextResponse.json({ success: true, client }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PATCH /api/clients?id=xxx — update client details and deliverables
export async function PATCH(req: NextRequest) {
  const auth = await getAdminAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  try {
    const { name, color, logo_url, deliverables } = await req.json()

    // Update client record
    const updates: Record<string, any> = {}
    if (name?.trim()) updates.name = name.trim()
    if (color) updates.color = color
    if (logo_url !== undefined) updates.logo_url = logo_url || null

    if (Object.keys(updates).length > 0) {
      const { error } = await db().from('clients').update(updates).eq('id', id)
      if (error) throw error
    }

    // Upsert deliverables: delete existing then re-insert
    if (Array.isArray(deliverables)) {
      await db().from('client_deliverables').delete().eq('client_id', id)
      const rows = deliverables
        .filter((d: any) => d.content_type && Number(d.monthly_target) > 0)
        .map((d: any) => ({
          client_id: id,
          content_type: d.content_type,
          monthly_target: Number(d.monthly_target),
        }))
      if (rows.length > 0) {
        const { error: delErr } = await db().from('client_deliverables').insert(rows)
        if (delErr) throw delErr
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE /api/clients?id=xxx — soft-delete a client
export async function DELETE(req: NextRequest) {
  const auth = await getAdminAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  try {
    const { error } = await db().from('clients').update({ is_active: false }).eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
