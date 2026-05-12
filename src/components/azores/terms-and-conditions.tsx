'use client'

import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TermsAndConditionsProps {
  onBack: () => void
}

export function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" onClick={onBack} className="gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
          <FileText className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Termos e Condições de Venda
          </h1>
          <p className="text-muted-foreground text-sm">
            Azores Essence — Azores Meet, Lda
          </p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Objeto</h2>
          <p className="text-muted-foreground leading-relaxed">
            Os presentes Termos regulam a venda de produtos alimentares e de
            lifestyle de origem açoriana pela{' '}
            <strong>Azores Meet, Lda</strong>, com NIF 513553169, com sede
            nos Açores, Portugal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. Preços e IVA</h2>
          <p className="text-muted-foreground leading-relaxed">
            Todos os preços incluem <strong>IVA à taxa legal em vigor</strong>{' '}
            na Região Autónoma dos Açores. Os preços podem ser alterados sem
            aviso prévio, sendo o preço aplicável o que está em vigor no
            momento da encomenda.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            3. Expedição e Logística
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            As encomendas são expedidas do nosso hub em{' '}
            <strong>Portugal Continental</strong> ou diretamente dos{' '}
            <strong>Açores</strong>, dependendo do stock. O prazo médio de
            entrega na UE é de <strong>3 a 5 dias úteis</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Envio gratuito para encomendas superiores a 50€. Para encomendas
            inferiores, o custo de envio é de 4,99€.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            4. Direito de Resolução
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Sendo produtos alimentares, o direito de devolução de{' '}
            <strong>14 dias</strong> aplica-se apenas a produtos{' '}
            <strong>não perecíveis</strong> e que mantenham o selo de
            inviolabilidade. Produtos perecíveis (queijos frescos, frutas,
            enchidos refrigerados) não são elegíveis para devolução.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Em caso de produto danificado durante o transporte, contacte-nos
            em até 48h após a receção através de{' '}
            <a
              href="mailto:geral@azoresmeet.pt"
              className="text-emerald-600 hover:underline"
            >
              geral@azoresmeet.pt
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Pagamentos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Suportamos pagamentos via{' '}
            <strong>Atlas Core</strong> (Cartões, MB WAY, Multibanco e
            Transferência SEPA). Todos os pagamentos são processados de
            forma segura e encriptada.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            6. Faturação
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A fatura é emitida automaticamente após a confirmação do
            pagamento e enviada por e-mail. Para faturação com NIF, o
            mesmo deve ser indicado no momento da compra.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">
            7. Lei Aplicável
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Estes termos são regidos pela lei portuguesa. Para qualquer
            litígio, é competente o Centro de Arbitragem de Conflitos de
            Consumo dos Açores.
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
