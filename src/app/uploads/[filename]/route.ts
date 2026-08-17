import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  ico: 'image/x-icon',
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    if (!filename || filename.includes('..')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg'
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
