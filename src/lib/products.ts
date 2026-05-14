export type AppView = 'home' | 'products' | 'checkout' | 'privacy' | 'terms' | 'admin'

export interface Category {
  id: string
  slug: string
  namePt: string
  nameEn: string
  nameFr: string | null
  nameDe: string | null
  description: string | null
  imageUrl: string | null
  sortOrder: number
  createdAt: string
}

export interface Product {
  id: string
  sku: string
  namePt: string
  nameEn: string | null
  nameFr: string | null
  nameDe: string | null
  descriptionPt: string | null
  descriptionEn: string | null
  descriptionFr: string | null
  descriptionDe: string | null
  price: number
  compareAtPrice: number | null
  currency: string
  stockQuantity: number
  categoryId: string | null
  imageUrl: string | null
  images: string | null // JSON string
  weight: number | null
  origin: string | null
  featured: boolean
  tags: string | null // JSON string
  isActive: boolean
  createdAt: string
  updatedAt: string
  category?: Category | null
}

export interface Order {
  id: string
  profileId: string | null
  totalAmount: number
  status: string
  paymentRef: string | null
  billingData: string | null
  createdAt: string
  orderItems: OrderItemData[]
}

export interface OrderItemData {
  id: string
  productId: string
  quantity: number
  unitPrice: number
  product?: Product
}

export const ISLANDS = [
  'São Miguel',
  'Pico',
  'São Jorge',
  'Terceira',
  'Flores',
  'Faial',
  'Graciosa',
  'Santa Maria',
  'Corvo',
] as const

export const CATEGORIES = [
  'Queijos',
  'Manteigas',
  'Conservas',
  'Vinhos',
  'Licores',
  'Chás',
  'Pastelaria & Bolos',
  'Compotas & Mel',
  'Pimentas & Especiarias',
  'Bebidas',
  'Charcutaria',
  'Outros Produtos',
] as const
