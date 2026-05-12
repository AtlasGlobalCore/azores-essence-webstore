'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown, MapPin } from 'lucide-react'

interface HeroSectionProps {
  onShopNow: () => void
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] md:min-h-auto">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/products/hero-azores.png"
          alt="Paisagem dos Açores"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24 md:py-36 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium tracking-widest uppercase">
              Do meio do Atlântico para a tua mesa
            </span>
          </div>

          <h1 className="text-3xl min-[400px]:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4">
            Sabores Autênticos{' '}
            <span className="text-emerald-400">dos Açores</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Descubra queijos, vinhos, méis e tesouros das nove ilhas.
            Produtos artesanais cultivados em solo vulcânico, banhados pelo
            Atlântico. A essência dos Açores, entregue em sua casa.
          </p>

          <div className="flex flex-col min-[400px]:flex-row flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onShopNow}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 text-base touch-manipulation min-h-[44px]"
            >
              Explorar Produtos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 text-base touch-manipulation min-h-[44px]"
              onClick={onShopNow}
            >
              Ver Catálogo
            </Button>
          </div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-2xl"
        >
          {[
            { value: '9', label: 'Ilhas' },
            { value: '100%', label: 'Artesanal' },
            { value: '3-5', label: 'Dias Entrega UE' },
            { value: 'DOP', label: 'Certificado' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-center border border-white/10"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-400">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="h-6 w-6 text-white/60" />
      </motion.div>
    </section>
  )
}
