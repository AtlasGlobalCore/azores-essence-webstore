'use client'

import { MapPin, Mail, Phone, Heart } from 'lucide-react'
import type { AppView } from '@/lib/products'

interface FooterProps {
  onViewChange: (view: AppView) => void
}

export function Footer({ onViewChange }: FooterProps) {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/azores-logo.png"
                alt="Azores Essence"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-lg font-bold">Azores Essence</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A essência dos Açores, do meio do Atlântico para a sua mesa.
              Produtos autênticos, artesanais e certificados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Navegação</h4>
            <ul className="space-y-2">
              {[
                { label: 'Início', view: 'home' as AppView },
                { label: 'Produtos', view: 'products' as AppView },
                { label: 'Painel Admin', view: 'admin' as AppView },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => onViewChange(item.view)}
                    className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onViewChange('privacy')}
                  className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button
                  onClick={() => onViewChange('terms')}
                  className="text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                >
                  Termos e Condições
                </button>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  RGPD 2026 Compliant
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                Açores, Portugal
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                geral@azoresmeet.pt
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                +351 295 000 000
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Azores Meet, Lda — NIF: 513553169. Todos os direitos
            reservados.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-red-500" /> nos Açores
          </p>
        </div>
      </div>
    </footer>
  )
}
