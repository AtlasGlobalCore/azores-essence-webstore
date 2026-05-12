'use client'

import { useState } from 'react'
import { Header } from '@/components/azores/header'
import { HeroSection } from '@/components/azores/hero-section'
import { ProductCatalog } from '@/components/azores/product-catalog'
import { CartSidebar } from '@/components/azores/cart-sidebar'
import { CheckoutFlow } from '@/components/azores/checkout-flow'
import { PrivacyPolicy } from '@/components/azores/privacy-policy'
import { TermsAndConditions } from '@/components/azores/terms-and-conditions'
import { ChatWidget } from '@/components/azores/chat-widget'
import { AdminDashboard } from '@/components/azores/admin-dashboard'
import { Footer } from '@/components/azores/footer'
import type { AppView } from '@/lib/products'

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>('home')

  const handleViewChange = (view: AppView) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onViewChange={handleViewChange} />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection onShopNow={() => handleViewChange('products')} />
            <ProductCatalog />
          </>
        )}

        {currentView === 'products' && (
          <div className="pt-4">
            <ProductCatalog />
          </div>
        )}

        {currentView === 'checkout' && (
          <CheckoutFlow
            onBack={() => handleViewChange('products')}
            onViewChange={handleViewChange}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicy onBack={() => handleViewChange('home')} />
        )}

        {currentView === 'terms' && (
          <TermsAndConditions onBack={() => handleViewChange('home')} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard onBack={() => handleViewChange('home')} />
        )}
      </main>

      <Footer onViewChange={handleViewChange} />

      {/* Cart sidebar (global) */}
      <CartSidebar onCheckout={() => handleViewChange('checkout')} />

      {/* Maria da Terra chat widget (global) */}
      <ChatWidget />
    </div>
  )
}
