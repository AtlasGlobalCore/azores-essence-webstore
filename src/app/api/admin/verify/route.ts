import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body as { token?: string }

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 })
    }

    const secret = process.env.ADMIN_SECRET
    if (!secret) {
      return NextResponse.json({ valid: false }, { status: 500 })
    }

    // Decode token
    let decoded: string
    try {
      decoded = Buffer.from(token, 'base64').toString('utf-8')
    } catch {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    const parts = decoded.split(':')
    if (parts.length < 3) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // The id might contain colons (unlikely but safe), so we need to handle it
    // Format: id:timestamp:hmac
    // The hmac is always 64 chars (sha256 hex), so we can split from the end
    const hmacFromToken = parts.slice(-1)[0]
    const timestamp = parts.slice(-2, -1)[0]
    const id = parts.slice(0, -2).join(':')

    if (!id || !timestamp || !hmacFromToken) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // Verify timestamp is a valid number
    const ts = Number(timestamp)
    if (isNaN(ts)) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    // Check expiration (24 hours)
    const now = Date.now()
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000
    if (now - ts > TWENTY_FOUR_HOURS) {
      return NextResponse.json({ valid: false, reason: 'expired' }, { status: 401 })
    }

    // Verify HMAC signature
    const payload = `${id}:${timestamp}`
    const expectedHmac = createHmac('sha256', secret).update(payload).digest('hex')

    if (hmacFromToken !== expectedHmac) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    return NextResponse.json({ valid: true, id })
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}
