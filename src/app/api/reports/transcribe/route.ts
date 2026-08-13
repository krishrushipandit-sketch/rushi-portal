import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30  // 30s timeout for Vercel

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.DEEPGRAM_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Deepgram not configured' }, { status: 503 })

  try {
    const { audioBase64, mimeType } = await req.json()
    if (!audioBase64) return NextResponse.json({ error: 'No audio' }, { status: 400 })

    const audioBuffer = Buffer.from(audioBase64, 'base64')

    if (audioBuffer.length < 500) {
      return NextResponse.json({ transcript: '', error: 'Audio too short — hold the button while speaking' })
    }

    let contentType = 'audio/webm'
    if (mimeType) {
      if (mimeType.includes('mp4') || mimeType.includes('m4a')) contentType = 'audio/mp4'
      else if (mimeType.includes('ogg')) contentType = 'audio/ogg'
      else if (mimeType.includes('wav')) contentType = 'audio/wav'
      else contentType = mimeType.split(';')[0]
    }

    console.log(`[Deepgram] Processing ${audioBuffer.length} bytes as ${contentType}`)

    // Use Deepgram nova-3 model with Hindi/English support (language=en-IN)
    const deepgramUrl = 'https://api.deepgram.com/v1/listen?model=nova-3&language=en-IN&smart_format=true&filler_words=false'

    const res = await fetch(deepgramUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': contentType,
      },
      body: audioBuffer
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('[Deepgram Error]', data)
      throw new Error(data.err_msg || 'Deepgram API error')
    }

    const transcript = data.results?.channels[0]?.alternatives[0]?.transcript || ''
    
    console.log(`[Deepgram] Raw Transcript: "${transcript.slice(0, 80)}"`)

    if (!transcript.trim()) {
      return NextResponse.json({ transcript: '', error: 'No speech detected. Please speak clearly and try again.' })
    }

    return NextResponse.json({ transcript, confidence: 0.99 })
  } catch (err: any) {
    console.error('[STT] Error:', err.message)
    return NextResponse.json({ transcript: '', error: err.message }, { status: 500 })
  }
}
