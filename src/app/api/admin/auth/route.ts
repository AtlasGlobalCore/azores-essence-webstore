import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, senha } = body as { id?: string; senha?: string }

    if (!id || !senha) {
      return NextResponse.json(
        { success: false, error: 'Identificador e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Parse credentials from environment variable
    const credentialsStr = process.env.ADMIN_CREDENTIALS || ''
    if (!credentialsStr) {
      return NextResponse.json(
        { success: false, error: 'Credenciais não configuradas' },
        { status: 500 }
      )
    }

    const credentials = credentialsStr.split(',').map((c) => {
      const parts = c.trim().split(':')
      return { id: parts[0], senha: parts.slice(1).join(':') } // allow colons in passwords
    })

    const matched = credentials.find((c) => c.id === id && c.senha === senha)

    if (!matched) {
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Generate token: base64(id:timestamp:hmac-sha256(id:timestamp, ADMIN_SECRET))
    const secret = process.env.ADMIN_SECRET
    if (!secret) {
      return NextResponse.json(
        { success: false, error: 'Segredo não configurado' },
        { status: 500 }
      )
    }

    const timestamp = Date.now().toString()
    const payload = `${id}:${timestamp}`
    const hmac = createHmac('sha256', secret).update(payload).digest('hex')
    const token = Buffer.from(`${payload}:${hmac}`).toString('base64')

    return NextResponse.json({ success: true, token })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
