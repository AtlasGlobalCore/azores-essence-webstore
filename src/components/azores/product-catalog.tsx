'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Plus, Filter, MapPin, Tag, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/stores/cart-store'
import { SAMPLE_PRODUCTS, ISLANDS, CATEGORIES, type Product } from '@/lib/products'
import { useToast } from '@/hooks/use-toast'

interface ProductCatalogProps {
  onViewChange?: (view: string) => void
}

export function ProductCatalog({ onViewChange }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIsland, setSelectedIsland] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const { addItem } = useCartStore()
  const { toast } = useToast()

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      if (!product.isActive) return false
      if (selectedIsland && product.island !== selectedIsland) return false
      if (selectedCategory && product.category !== selectedCategory) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          product.namePt.toLowerCase().includes(query) ||
          product.nameEn?.toLowerCase().includes(query) ||
          product.descriptionPt?.toLowerCase().includes(query) ||
          product.island?.toLowerCase().includes(query)
        )
      }
      return true
    })
  }, [searchQuery, selectedIsland, selectedCategory])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      namePt: product.namePt,
      nameEn: product.nameEn,
      price: product.price,
      imageUrl: product.imageUrl,
      island: product.island,
    })
    toast({
      title: 'Adicionado ao carrinho',
      description: `${product.namePt} foi adicionado ao seu carrinho.`,
    })
  }

  const activeFilters = [
    selectedIsland && { label: selectedIsland, clear: () => setSelectedIsland(null) },
    selectedCategory && { label: selectedCategory, clear: () => setSelectedCategory(null) },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Nossos Produtos
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Cada produto conta a história de uma ilha. Do queijo curado de São Jorge ao vinho vulcânico do Pico.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtros
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.label}
                variant="secondary"
                className="gap-1 cursor-pointer hover:bg-destructive/10"
                onClick={filter.clear}
              >
                {filter.label}
                <X className="h-3 w-3" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedIsland(null)
                setSelectedCategory(null)
              }}
              className="text-xs h-6"
            >
              Limpar tudo
            </Button>
          </div>
        )}

        {/* Filter panels */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Ilha
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {ISLANDS.map((island) => (
                      <Button
                        key={island}
                        variant={selectedIsland === island ? 'default' : 'outline'}
                        size="sm"
                        onClick={() =>
                          setSelectedIsland(selectedIsland === island ? null : island)
                        }
                        className="text-xs"
                      >
                        {island}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    Categoria
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category ? null : category
                          )
                        }
                        className="text-xs"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            Nenhum produto encontrado com os filtros selecionados.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery('')
              setSelectedIsland(null)
              setSelectedCategory(null)
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </section>
  )
}

function ProductCard({
  product,
  onAddToCart,
  index,
}: {
  product: Product
  onAddToCart: (product: Product) => void
  index: number
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          <img
            src={product.imageUrl || '/placeholder.png'}
            alt={product.namePt}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.island && (
              <Badge className="bg-emerald-600 text-white text-[10px] gap-1 shadow-sm">
                <MapPin className="h-2.5 w-2.5" />
                {product.island}
              </Badge>
            )}
            {product.category && (
              <Badge variant="secondary" className="text-[10px] shadow-sm">
                {product.category}
              </Badge>
            )}
          </div>
          {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
            <Badge className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] shadow-sm">
              Últimas {product.stockQuantity}
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
            {product.namePt}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
            {product.descriptionPt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">
                {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">€</span>
            </div>
            <Button
              size="sm"
              onClick={() => onAddToCart(product)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
