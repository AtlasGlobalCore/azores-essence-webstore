'use client'

import { useState } from 'react'
import { ShoppingCart, Menu, X, Mountain, Shield, FileText, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/cart-store'
import type { AppView } from '@/lib/products'

interface HeaderProps {
  currentView: AppView
  onViewChange: (view: AppView) => void
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items, toggleCart } = useCartStore()
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const navItems: { label: string; view: AppView; icon: React.ReactNode }[] = [
    { label: 'Início', view: 'home', icon: <Mountain className="h-4 w-4" /> },
    { label: 'Produtos', view: 'products', icon: <Store className="h-4 w-4" /> },
    { label: 'Admin', view: 'admin', icon: <Shield className="h-4 w-4" /> },
  ]

  const footerNavItems: { label: string; view: AppView; icon: React.ReactNode }[] = [
    { label: 'Privacidade', view: 'privacy', icon: <FileText className="h-4 w-4" /> },
    { label: 'Termos', view: 'terms', icon: <FileText className="h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => onViewChange('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/azores-logo.png"
            alt="Azores Essence"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold leading-tight tracking-tight text-foreground">
              Azores Essence
            </span>
            <span className="text-[10px] leading-tight text-muted-foreground tracking-widest uppercase hidden min-[400px]:inline">
              Açores no teu coração
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.view}
              variant={currentView === item.view ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange(item.view)}
              className="gap-1.5"
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange('privacy')}
            className="hidden md:flex"
            title="Política de Privacidade"
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewChange('terms')}
            className="hidden md:flex"
            title="Termos e Condições"
          >
            <FileText className="h-4 w-4" />
          </Button>

          {/* Cart button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleCart}
            className="relative gap-2 touch-manipulation min-h-[44px] min-w-[44px]"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] rounded-full p-0 flex items-center justify-center text-[10px] bg-emerald-600 text-white">
                {totalItems}
              </Badge>
            )}
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden touch-manipulation min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background overscroll-contain">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  onViewChange(item.view)
                  setMobileMenuOpen(false)
                }}
                className="justify-start gap-2 touch-manipulation min-h-[44px]"
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
            <div className="border-t my-1" />
            {footerNavItems.map((item) => (
              <Button
                key={item.view}
                variant="ghost"
                size="sm"
                onClick={() => {
                  onViewChange(item.view)
                  setMobileMenuOpen(false)
                }}
                className="justify-start gap-2 touch-manipulation min-h-[44px]"
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
