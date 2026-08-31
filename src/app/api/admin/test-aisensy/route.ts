import { NextRequest, NextResponse } from 'next/server'
import { normalizePhoneForWhatsApp, formatSalesRepPhone, formatStatusForTemplate } from '@/lib/aisensy'

const DEFAULT_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzJjOTQ5NmM3YjZlMTM5NWJkYmIzOSIsIm5hbWUiOiJSdXNoaVBhbmRpdCAtIERpZ2l0YWwgQWNhZGVteSIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2NjcyYzk0ODZjN2I2ZTEzOTViZGJiMjciLCJhY3RpdmVQbGFuIjoiQkFTSUNfTU9OVEhMWSIsImlhdCI6MTc4NzczMzYwOX0.7z3K8tMpMK9YunrZ1WiICIwEXkgJP4RoRaMX0lm0Im8'

/**
 * GET /api/admin/test-aisensy?phone=9768726006&name=Paurnima&status=Ringing
 * Test endpoint to verify AiSensy connectivity and send a live test message.
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const phone = searchParams.get('phone') || '9768726006'
    const name = searchParams.get('name') || 'Test Student'
    const status = searchParams.get('status') || 'Ringing'

    const envKey = process.env.AISENSY_SALES_API_KEY || process.env.AISENSY_API_KEY
    const activeKey = envKey || DEFAULT_KEY

    const destination = normalizePhoneForWhatsApp(phone)
    if (!destination) {
      return NextResponse.json({
        success: false,
        error: `Invalid phone: ${phone}`,
        env_key_present: !!envKey,
        key_preview: activeKey ? activeKey.slice(0, 15) + '...' : null
      }, { status: 400 })
    }

    const statusText = formatStatusForTemplate(status)
    const salesPhone = formatSalesRepPhone('9768726006')
    const templateParams = [name, statusText, salesPhone]

    const payload = {
      apiKey: activeKey,
      campaignName: 'ringing_sale',
      destination,
      userName: name,
      templateParams,
      source: 'rushi_portal_api_diagnostic',
      media: {},
      buttons: [],
      carouselCards: [],
      location: {},
      paramsFallbackValue: {
        FirstName: name,
        Status: statusText,
        Phone: salesPhone,
      },
    }

    const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const resData = await res.json().catch(() => ({}))

    return NextResponse.json({
      success: res.ok && (resData.success === 'true' || resData.success === true),
      status_code: res.status,
      env_key_present: !!envKey,
      using_fallback_key: !envKey,
      key_preview: activeKey ? activeKey.slice(0, 18) + '...' : null,
      destination,
      templateParams,
      aisensy_response: resData
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
