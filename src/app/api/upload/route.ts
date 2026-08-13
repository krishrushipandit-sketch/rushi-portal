import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side upload using service role — bypasses all storage RLS
const db = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return null
  const { data: { user } } = await db().auth.getUser(token)
  if (!user) return null
  const { data: profile } = await db().from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') return null
  return { user, profile }
}

export async function POST(req: NextRequest) {
  const auth = await getAuth(req)
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `clients/logo_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const supabase = db()

    // Try 'avatars' bucket first, then 'public' as fallback
    let uploadError: any = null
    let publicUrl = ''

    for (const bucket of ['avatars', 'public']) {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filename, buffer, {
          contentType: file.type || 'image/jpeg',
          upsert: true,
        })

      if (!error) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(filename)
        publicUrl = data.publicUrl
        uploadError = null
        break
      }
      uploadError = error
    }

    if (uploadError || !publicUrl) {
      // If storage buckets don't work, return an error with hint
      console.error('[Upload] Storage error:', uploadError)
      return NextResponse.json(
        { error: 'Storage not configured. Please create an "avatars" bucket in Supabase Storage with public access.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
