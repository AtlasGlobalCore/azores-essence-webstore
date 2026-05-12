'use client'

import { useState } from 'react'
import { ArrowLeft, Lock, Mountain, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AdminLoginProps {
  onBack: () => void
  onLogin: (token: string) => void
}

export function AdminLogin({ onBack, onLogin }: AdminLoginProps) {
  const [id, setId] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, senha }),
      })

      const data = await response.json()

      if (data.success && data.token) {
        localStorage.setItem('admin_token', data.token)
        onLogin(data.token)
      } else {
        setError(data.error || 'Credenciais inválidas')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <Card className="border-emerald-200/60 shadow-xl shadow-emerald-900/5">
          <CardHeader className="text-center pb-2 pt-8">
            {/* Logo and branding */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/25">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Azores Essence</h1>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  Painel de Administração
                </p>
              </div>
            </div>

            {/* Lock icon */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-1">
              <Lock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Acesso Restrito
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Introduza as suas credenciais para aceder ao painel
            </p>
          </CardHeader>

          <CardContent className="pt-4 pb-8 px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ID field */}
              <div className="space-y-2">
                <Label htmlFor="admin-id" className="text-sm font-medium">
                  Identificador
                </Label>
                <Input
                  id="admin-id"
                  type="text"
                  placeholder="O seu identificador"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                  autoComplete="username"
                  className="h-11 border-emerald-200/60 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400"
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="admin-senha" className="text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="admin-senha"
                    type={showSenha ? 'text' : 'password'}
                    placeholder="A sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="h-11 pr-10 border-emerald-200/60 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha(!showSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                    aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showSenha ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading || !id || !senha}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-600/20 disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    A verificar...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </form>

            {/* Footer text */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Acesso exclusivo para administradores autorizados.
              <br />
              Contacte o suporte se necessitar de credenciais.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
