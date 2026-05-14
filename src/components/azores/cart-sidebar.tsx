'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/cart-store'

interface CartSidebarProps {
  onCheckout: () => void
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, clearCart } =
    useCartStore()

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md overscroll-contain safe-bottom">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-base sm:text-lg">
            <ShoppingBag className="h-5 w-5 text-emerald-600" />
            Carrinho de Compras
            {totalItems > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              O seu carrinho está vazio
            </p>
            <Button
              variant="outline"
              onClick={() => setCartOpen(false)}
              className="gap-2"
            >
              Continuar a comprar
            </Button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 overscroll-contain">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3"
                  >
                    {/* Product image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.imageUrl || '/placeholder.png'}
                        alt={item.namePt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium line-clamp-1">
                        {item.namePt}
                      </h4>
                      {item.origin && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-0.5">
                          <MapPin className="h-2.5 w-2.5" />
                          {item.origin}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1.5 gap-2">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-6 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-destructive touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Separator />

            {/* Cart summary */}
            <div className="py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{totalAmount.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envio</span>
                <span className="text-emerald-600">
                  {totalAmount >= 50 ? 'Grátis' : '4.99€'}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  {(totalAmount + (totalAmount >= 50 ? 0 : 4.99)).toFixed(2)}€
                </span>
              </div>
              {totalAmount < 50 && (
                <p className="text-xs text-muted-foreground">
                  Faltam {(50 - totalAmount).toFixed(2)}€ para envio grátis!
                </p>
              )}
            </div>

            {/* Actions */}
            <SheetFooter className="flex-col sm:flex-row gap-2 safe-bottom">
              <Button
                variant="outline"
                onClick={clearCart}
                className="gap-2 w-full sm:w-auto touch-manipulation min-h-[44px]"
              >
                <Trash2 className="h-4 w-4" />
                Limpar
              </Button>
              <Button
                onClick={() => {
                  setCartOpen(false)
                  onCheckout()
                }}
                className="flex-1 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 touch-manipulation min-h-[44px]"
              >
                Finalizar Encomenda
                <ArrowRight className="h-4 w-4" />
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
