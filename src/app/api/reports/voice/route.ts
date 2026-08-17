import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Gemini not configured' }, { status: 503 })

  try {
    const body = await req.json()
    const { transcript, responsibilities } = body

    if (!transcript?.trim()) return NextResponse.json({ error: 'No transcript provided' }, { status: 400 })

    const respList = Array.isArray(responsibilities) && responsibilities.length > 0
      ? responsibilities.join(', ')
      : 'various tasks'

    const prompt = `You are an HR assistant parsing an employee's daily work report narrated verbally.

Their job responsibilities are: ${respList}

The STT transcript (may contain Hindi/Hinglish/Marathi): "${transcript}"

TASK: Extract every work item. If the user mentions work done for MULTIPLE DIFFERENT CLIENTS (e.g., "1 reel for CA and 1 reel for RushiPandit" or "edited 2 reels for alpha and 1 video for amicus"), create SEPARATE items for each client so they can be logged independently!

CRITICAL RULES FOR "description" FIELD:
- The description MUST be SHORT and CONCISE. Maximum 3 to 6 words.
- ONLY include the core action and client name (if mentioned).
- Translate EVERYTHING to clear professional English. NEVER output regional languages.
- BAD example: "Edited 3 short-form reels for the CA Sir client, including intro cuts and background music sync" (too long)
- GOOD example: "Edited 1 reel for CA"
- GOOD example: "Edited 1 reel for RushiPandit Institute"
- GOOD example: "Created posts for Amazon"

CRITICAL RULES FOR TIME EXTRACTION:
- Extract 'checkInTime' and 'checkOutTime' in HH:MM format (24-hour clock).
- Listen for phrases like "check in", "login", "aaya", "aayi" for Check-In time.
- Listen for phrases like "check out", "logout", "nikla", "nikli" for Check-Out time.
- Examples: "9:30 AM" or "sadhe nau baje" -> "09:30". "7 PM" or "shaam ko 7 baje" -> "19:00".
- If a time is clearly not mentioned, set it to null.

CRITICAL FALLBACK RULE:
- If the transcript is complete gibberish, unrelated to work, or you don't understand it, DO NOT RETURN AN EMPTY ARRAY for items.
- Instead, return exactly what they said (translated to English) under the responsibility "Misc Task".

Return ONLY a JSON object, no other text:
{
  "checkInTime": "09:30", // optional, HH:MM format (24-hour) if mentioned, otherwise null
  "checkOutTime": "18:45", // optional, HH:MM format (24-hour) if mentioned, otherwise null
  "items": [
    {"responsibility": "Client reel editing", "description": "Edited reel for CA", "count": 1, "client": "CA"},
    {"responsibility": "Client reel editing", "description": "Edited reel for RushiPandit Institute", "count": 1, "client": "RushiPandit Institute"}
  ]
}

JSON field rules for items:
- responsibility: match to one from the list above. If nothing matches, use "Misc Task".
- description: SHORT English phrase (3-6 words), just the core action and client.
- count: integer number they mentioned (e.g. "1 reel" -> 1), or 1 if not mentioned
- client: client name if mentioned (e.g. "CA", "RushiPandit Institute", "Advisor Alpha"), otherwise null
- Return ONLY valid JSON.`

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { 
        temperature: 0.1,
        responseMimeType: "application/json"
      } as any
    })

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    let responseObj: any = { items: [] }
    try {
      // Strip markdown code blocks if Gemini returns them
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
      responseObj = JSON.parse(cleanText)
    } catch (e) {
      console.error('Gemini JSON parse error:', text)
      return NextResponse.json({ error: 'Could not parse AI response', items: [] })
    }

    if (!responseObj.items || responseObj.items.length === 0) {
      // Force fallback if AI disobeyed
      responseObj.items = [{ responsibility: "Misc Task", description: `Unrecognized speech: ${transcript}`, count: 1 }]
    }

    return NextResponse.json(responseObj)
  } catch (err: any) {
    console.error('Voice route error:', err)
    return NextResponse.json({ error: err.message || 'Processing failed', items: [] }, { status: 500 })
  }
}
