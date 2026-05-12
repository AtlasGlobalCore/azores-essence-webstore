'use client'

import { ArrowLeft, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PrivacyPolicyProps {
  onBack: () => void
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" onClick={onBack} className="gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <Shield className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Política de Privacidade e Proteção de Dados
          </h1>
          <p className="text-muted-foreground text-sm">Azores Essence — RGPD 2026</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-emerald-800 text-sm">
            A <strong>Azores Meet, Lda</strong>, com o NIF{' '}
            <strong>513553169</strong>, assume o compromisso de proteger a
            privacidade dos seus clientes, em conformidade com o Regulamento
            Geral sobre a Proteção de Dados (RGPD).
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold mb-2">1. Recolha de Dados</h2>
          <p className="text-muted-foreground leading-relaxed">
            Recolhemos dados nomeadamente <strong>Nome, NIF, Morada e
            E-mail</strong> estritamente para processamento de encomendas e
            obrigações fiscais. Nenhum dado é recolhido para fins de
            marketing sem consentimento prévio e explícito.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            2. Processamento (Atlas Core)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Os seus dados de pagamento são processados de forma encriptada
            através da infraestrutura <strong>Atlas Core</strong>, não sendo
            armazenados nos nossos servidores. A Azores Meet, Lda não tem
            acesso a dados bancários completos dos clientes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Conservação</h2>
          <p className="text-muted-foreground leading-relaxed">
            Os dados são armazenados na nossa infraestrutura segura (
            <strong>Supabase</strong>) pelo período legal de{' '}
            <strong>10 anos</strong> (exigência fiscal portuguesa — Art.º 29.º
            do CIVA e legislação complementar). Após este período, os dados
            serão eliminados de forma segura.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            4. Direitos do Titular
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            O utilizador pode, a qualquer momento, solicitar o{' '}
            <strong>acesso, retificação ou eliminação</strong> dos seus dados
            através do e-mail:{' '}
            <a
              href="mailto:geral@azoresmeet.pt"
              className="text-emerald-600 hover:underline"
            >
              geral@azoresmeet.pt
            </a>
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            O titular dos dados tem ainda o direito de apresentar uma
            reclamação junto da{' '}
            <strong>Comissão Nacional de Proteção de Dados (CNPD)</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            5. Partilha de Dados
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Os dados pessoais apenas são partilhados com prestadores de
            serviços essenciais ao funcionamento da plataforma (processamento
            de pagamentos, logística de expedição) e quando exigido por lei.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">6. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Utilizamos cookies essenciais para o funcionamento do site e
            cookies analíticos anónimos. Pode gerir as suas preferências de
            cookies em qualquer altura através das definições do navegador.
          </p>
        </section>

        <div className="border-t pt-4 mt-8">
          <p className="text-xs text-muted-foreground">
            Última atualização: Março 2026 | Azores Meet, Lda — NIF:
            513553169 | Sede: Açores, Portugal
          </p>
        </div>
      </div>
    </div>
  )
}
