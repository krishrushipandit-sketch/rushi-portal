import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sn = searchParams.get('SN')
  console.log(`[Biometric ADMS] GetRequest poll from SN=${sn}`)
  return new NextResponse('OK', { status: 200, headers: { 'Content-Type': 'text/plain' } })
}
