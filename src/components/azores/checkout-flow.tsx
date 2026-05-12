'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/stores/cart-store'

interface CheckoutFlowProps {
  onBack: () => void
  onViewChange: (view: string) => void
}

type CheckoutStep = 'billing' | 'payment' | 'confirmation'
type PaymentMethod = 'card' | 'mbway' | 'multibanco' | 'sepa'

export function CheckoutFlow({ onBack, onViewChange }: CheckoutFlowProps) {
  const { items, totalAmount, clearCart } = useCartStore()
  const [step, setStep] = useState<CheckoutStep>('billing')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [formData, setFormData] = useState({
    fullName: '',
    vatNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Portugal',
  })

  const subtotal = totalAmount()
  const shipping = subtotal >= 50 ? 0 : 4.99
  const total = subtotal + shipping

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order via API
    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        billingData: formData,
        paymentMethod,
        totalAmount: total,
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        clearCart()
        setStep('confirmation')
      }
    } catch (error) {
      console.error('Order creation failed:', error)
      // Still show confirmation for demo
      clearCart()
      setStep('confirmation')
    }

    setIsProcessing(false)
  }

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground text-lg mb-4">
          O seu carrinho está vazio
        </p>
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar aos Produtos
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {(['billing', 'payment', 'confirmation'] as CheckoutStep[]).map(
          (s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step === s
                    ? 'bg-emerald-600 text-white'
                    : i <
                        ['billing', 'payment', 'confirmation'].indexOf(step)
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {i <
                ['billing', 'payment', 'confirmation'].indexOf(step) ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-sm hidden sm:inline ${
                  step === s
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {s === 'billing'
                  ? 'Faturação'
                  : s === 'payment'
                    ? 'Pagamento'
                    : 'Confirmação'}
              </span>
              {i < 2 && (
                <div
                  className={`w-8 h-0.5 ${
                    i <
                    ['billing', 'payment', 'confirmation'].indexOf(step)
                      ? 'bg-emerald-600'
                      : 'bg-muted'
                  }`}
                />
              )}
            </div>
          )
        )}
      </div>

      {/* Billing step */}
      {step === 'billing' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeft
                  className="h-5 w-5 cursor-pointer hover:text-emerald-600 transition-colors"
                  onClick={onBack}
                />
                Dados de Faturação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBillingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange('fullName', e.target.value)
                      }
                      required
                      placeholder="João da Silva"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vatNumber">NIF</Label>
                    <Input
                      id="vatNumber"
                      value={formData.vatNumber}
                      onChange={(e) =>
                        handleInputChange('vatNumber', e.target.value)
                      }
                      placeholder="123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      required
                      placeholder="joao@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      placeholder="+351 912 345 678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange('country', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Morada *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      required
                      placeholder="Rua das Flores, 12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange('city', e.target.value)
                      }
                      required
                      placeholder="Lisboa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Código Postal *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange('postalCode', e.target.value)
                      }
                      required
                      placeholder="1000-001"
                    />
                  </div>
                </div>

                {/* Order summary */}
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Resumo da Encomenda</h4>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.namePt} x{item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)}€</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envio</span>
                    <span className={shipping === 0 ? 'text-emerald-600' : ''}>
                      {shipping === 0 ? 'Grátis' : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Continuar para Pagamento
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Payment step */}
      {step === 'payment' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <CreditCard className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">Cartão de Crédito/Débito</p>
                        <p className="text-xs text-muted-foreground">
                          Visa, Mastercard, Maestro
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="mbway" id="mbway" />
                    <Label
                      htmlFor="mbway"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Smartphone className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">MB WAY</p>
                        <p className="text-xs text-muted-foreground">
                          Pagamento via app MB WAY
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="multibanco" id="multibanco" />
                    <Label
                      htmlFor="multibanco"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Building2 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">Multibanco</p>
                        <p className="text-xs text-muted-foreground">
                          Referência para pagamento em caixa ATM
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="sepa" id="sepa" />
                    <Label
                      htmlFor="sepa"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Building2 className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">Transferência SEPA</p>
                        <p className="text-xs text-muted-foreground">
                          Transferência bancária europeia
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {/* Card details (if card selected) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-2">
                      <Label>Número do Cartão</Label>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Validade</Label>
                        <Input placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'mbway' && (
                  <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
                    <Label>Número de Telemóvel MB WAY</Label>
                    <Input placeholder="+351 912 345 678" />
                  </div>
                )}

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-sm text-emerald-800">
                    💳 Os seus dados de pagamento são processados de forma
                    encriptada através da infraestrutura Atlas Core, não sendo
                    armazenados nos nossos servidores.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('billing')}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        A processar...
                      </>
                    ) : (
                      `Pagar ${total.toFixed(2)}€`
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Confirmation step */}
      {step === 'confirmation' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="text-center">
            <CardContent className="py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">
                Encomenda Confirmada!
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Obrigado pela sua encomenda! O produto viaja do meio do
                Atlântico para a sua mesa com todo o cuidado. Receberá um
                e-mail com os detalhes.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Nº da Encomenda:{' '}
                <span className="font-mono font-medium text-foreground">
                  AE-{Date.now().toString().slice(-6)}
                </span>
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => onViewChange('products')}
                >
                  Continuar a Comprar
                </Button>
                <Button
                  onClick={() => onViewChange('home')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
