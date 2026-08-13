import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Check caller is admin
    const { data: callerProfile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()
    if (callerProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error
    return NextResponse.json(data)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const supabase = supabaseAdmin()

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: callerProfile } = await supabase
      .from('profiles').select('role').eq('id', user.id).single()
    if (callerProfile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { full_name, email, password, role, department, designation, whatsapp_number, phone, avatar_url } = body

    if (!email || !password || !full_name) {
      return NextResponse.json({ error: 'email, password and full_name are required' }, { status: 400 })
    }

    // Check if user already exists
    const orConditions = [`email.eq.${email}`]
    if (phone) orConditions.push(`phone.eq.${phone}`)
    if (whatsapp_number) orConditions.push(`whatsapp_number.eq.${whatsapp_number}`)

    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id, email, phone, whatsapp_number')
      .or(orConditions.join(','))
      .limit(1)
      .maybeSingle()

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 400 })
      }
      if (phone && existingUser.phone === phone) {
        return NextResponse.json({ error: 'A user with this phone number already exists.' }, { status: 400 })
      }
      if (whatsapp_number && existingUser.whatsapp_number === whatsapp_number) {
        return NextResponse.json({ error: 'A user with this WhatsApp number already exists.' }, { status: 400 })
      }
      return NextResponse.json({ error: 'A user with these details already exists.' }, { status: 400 })
    }

    // Create auth user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role: role || 'employee' },
    })

    if (createError) throw createError

    // Update profile with extra fields (trigger creates it)
    if (newUser?.user) {
      await supabase.from('profiles').update({
        department,
        designation,
        whatsapp_number,
        phone,
        role: role || 'employee',
        avatar_url,
      }).eq('id', newUser.user.id)
    }

    return NextResponse.json({ success: true, user: newUser.user })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
