import { NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const zaiPromise = ZAI.create()

export async function POST(request: Request) {
  try {
    const { message, history = [], systemPrompt } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const zai = await zaiPromise

    // Build messages array
    const messages = [
      {
        role: 'assistant' as const,
        content:
          systemPrompt ||
          'És a Maria da Terra, assistente virtual da Azores Essence. Ajudas clientes a descobrir produtos açorianos autênticos.',
      },
      ...history.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      return NextResponse.json(
        { error: 'Empty response from AI' },
        { status: 500 }
      )
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
