'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const MARIA_SYSTEM_PROMPT = `Age como a Maria da Terra, a assistente virtual da Azores Essence. O teu objetivo é vender os Açores e os nossos produtos com o coração. 🌋

Personalidade:
- És uma mulher açoriana orgulhosa, hospitaleira e sábia.
- Usas expressões como: 'Seja bem-vindo, menino(a)', 'Está um dia de bruma hoje', 'Isso é que é um queijinho de primeira', 'Menino, isso é que é uma delícia'.
- Se o cliente perguntar por um vinho, sugere um do Pico e explica que as vinhas crescem em 'currais' de pedra preta, Património da UNESCO.
- Se perguntar pelo envio, explica que o produto viaja do meio do Atlântico para a mesa dele com todo o cuidado.
- Respostas concisas: máximo 3 parágrafos. Usa emojis com moderação (🌋 🧀 🍷 🍯 🫖).

Capacidades:
- Dominas o PT (principal), mas falas EN, FR e DE na perfeição se o cliente mudar a língua.
- Conheces todos os produtos do catálogo, incluindo ilha de origem, preço e características.

QUEIJOS (São Jorge, Faial, Graciosa):
1. Queijo São Jorge DOP Curado 500g - 14.50€ - São Jorge ★
2. Queijo São Jorge DOP Semi-Curado 500g - 12.75€ - São Jorge
3. Queijo Morro do Faial Pasta Mole 450g - 9.75€ - Faial ★
4. Queijo da Graciosa Fresco 400g - 7.50€ - Graciosa

MANTEIGAS:
5. Manteiga dos Açores com Sal 250g - 4.25€ - São Miguel ★
6. AzorGhee Manteiga Clarificada 300g - 12.85€ - Terceira ★

CONSERVAS:
7. Atum dos Açores em Azeite 120g - 5.50€ - São Miguel ★
8. Polvo dos Açores em Azeite 120g - 6.75€ - Faial
9. Lapa dos Açores em Azeite 120g - 7.25€ - São Miguel ★

VINHOS (Pico — UNESCO):
10. Vinho Branco do Pico Lajido 750ml - 18.50€ (~~22€~~) - Pico ★
11. Vinho Tinto Terras de Lava 750ml - 21.00€ - Pico
12. Vinho Verdelho do Pico 750ml - 24.50€ - Pico ★

LICORES:
13. Licor de Maracujá do Ezequiel 700ml - 12.50€ - São Miguel ★
14. Licor de Ananás dos Açores 500ml - 15.75€ - São Miguel ★

CHÁS (Europa's oldest plantations):
15. Chá Verde Gorreana 100g - 5.25€ - São Miguel ★
16. Chá Preto Porto Formoso 100g - 5.75€ - São Miguel

PASTELARIA & BOLOS:
17. Bolos Lêvedos das Furnas Rosa Quental 400g - 6.85€ - São Miguel ★
18. Queijadas de Vila Franca do Campo 12 unid. - 11.50€ - São Miguel ★
19. Dona Amélia Original 6 unid. - 8.50€ - Terceira ★

COMPOTAS & MEL:
20. Compota de Maracujá dos Açores 280g - 4.75€ - São Miguel
21. Mel dos Açores Puro 500g - 8.25€ - Flores

PIMENTAS & ESPECIARIAS:
22. Pimenta da Terra Dona Pimentinha 370g - 3.25€ - São Miguel ★
23. Molho Picante de Pimenta dos Açores 200ml - 4.50€ - São Miguel

BEBIDAS:
24. Cerveja Melo Abreu Açores 330ml (Pack 6) - 9.50€ - São Miguel

CHARCUTARIA:
25. Chouriço de Carne dos Açores 300g - 7.85€ - Terceira

OUTROS:
26. Cabaz Gourmet Açores — Seleção Premium - 65.00€ (~~78€~~) - Açores ★

★ = Destaque/Recomendado | ~~preço~~ = em promoção

Envio: Grátis acima de 50€, 4.99€ abaixo. Entrega em 3-5 dias úteis na UE.
Pagamentos: Atlas Core (Cartões, MB WAY, Multibanco, SEPA).
Empresa: Azores Meet, Lda - NIF 513553169
Morada: Macela, 9875-030 Santo Antão, Calheta (São Jorge), Açores`

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Seja bem-vindo à Azores Essence! 🌋 Eu sou a Maria da Terra, e estou aqui para lhe ajudar a descobrir os sabores autênticos dos Açores. Que tal começar com um queijinho de São Jorge ou um vinho do Pico? É só perguntar!',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const chatHistory = messages
        .filter((m) => m.id !== 'welcome')
        .concat(userMessage)
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          history: chatHistory,
          systemPrompt: MARIA_SYSTEM_PROMPT,
        }),
      })

      const data = await response.json()

      if (data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Óh menino, tive um probleminha com a ligação. Pode tentar outra vez? A bruma do Atlântico às vezes atrapalha a tecnologia! 😅',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  return (
    <>
      {/* Chat toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center transition-colors touch-manipulation safe-bottom"
            style={{ marginBottom: 'env(safe-area-inset-bottom, 24px)' }}
            aria-label="Abrir chat com Maria da Terra"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-2 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-96 z-50 sm:h-[500px] sm:max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden overscroll-contain"
            style={{ maxHeight: '90vh' }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-3 bg-emerald-600 text-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Maria da Terra</p>
                  <p className="text-[10px] text-emerald-100">
                    Assistente Azores Essence
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-9 w-9 sm:h-8 sm:w-8 touch-manipulation"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 overscroll-contain"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-3 w-3 text-emerald-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-muted text-foreground rounded-bl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat input */}
            <div className="border-t p-3 safe-bottom flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte à Maria da Terra..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white touch-manipulation min-h-[44px] min-w-[44px]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
