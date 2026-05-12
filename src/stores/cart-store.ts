import { create } from 'zustand'

export interface CartItem {
  id: string
  namePt: string
  nameEn: string | null
  price: number
  quantity: number
  imageUrl: string | null
  island: string | null
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  totalItems: () => number
  totalAmount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...item, quantity: 1 }] }
    })
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    }))
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      ),
    }))
  },

  clearCart: () => set({ items: [] }),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  setCartOpen: (open) => set({ isOpen: open }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalAmount: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}))
