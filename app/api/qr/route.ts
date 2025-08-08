import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const text = searchParams.get('t')
  if (!text) return NextResponse.json({ error: 'Missing t' }, { status: 400 })
  const svg = await QRCode.toString(text, { type: 'svg', margin: 0 })
  return new NextResponse(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
}
