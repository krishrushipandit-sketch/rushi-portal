import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Uploads are served from our own origin, so only accept raster images (no SVG/HTML that could carry scripts).
const ALLOWED_IMAGE_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif'])
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    if (!ALLOWED_IMAGE_EXT.has(ext) || !file.type.startsWith('image/') || file.type === 'image/svg+xml') {
      return NextResponse.json({ error: 'Please upload a JPG, PNG, WebP or GIF image' }, { status: 400 })
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'Image is too large (max 5 MB)' }, { status: 400 })
    }
    const filename = `upload_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    // Save to public/uploads/ directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    await writeFile(path.join(uploadsDir, filename), buffer)

    // Return public relative URL
    const url = `/uploads/${filename}`

    return NextResponse.json({ url })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
