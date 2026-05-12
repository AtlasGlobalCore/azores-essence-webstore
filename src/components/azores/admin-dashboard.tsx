'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Edit3,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SAMPLE_PRODUCTS } from '@/lib/products'

interface AdminDashboardProps {
  onBack: () => void
}

interface OrderData {
  id: string
  totalAmount: number
  status: string
  createdAt: string
  items: number
  paymentRef: string | null
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { data: orders = [], isLoading } = useQuery<OrderData[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch('/api/orders')
      if (!response.ok) return []
      return response.json()
    },
  })

  const stats = [
    {
      title: 'Produtos',
      value: SAMPLE_PRODUCTS.length,
      icon: <Package className="h-5 w-5 text-emerald-600" />,
      description: 'Produtos ativos no catálogo',
    },
    {
      title: 'Encomendas',
      value: orders.length,
      icon: <ShoppingCart className="h-5 w-5 text-emerald-600" />,
      description: 'Total de encomendas',
    },
    {
      title: 'Receita',
      value: `${orders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(2)}€`,
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      description: 'Receita total',
    },
    {
      title: 'Conversão',
      value: '4.8%',
      icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
      description: 'Taxa de conversão',
    },
  ]

  const statusColors: Record<string, string> = {
    pendente: 'bg-amber-100 text-amber-800',
    pago: 'bg-emerald-100 text-emerald-800',
    enviado: 'bg-sky-100 text-sky-800',
    cancelado: 'bg-red-100 text-red-800',
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Button variant="ghost" onClick={onBack} className="gap-2 touch-manipulation min-h-[44px]">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Voltar</span>
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Painel de Administração</h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Azores Essence — Gestão
          </p>
        </div>
      </div>

      {/* Stats grid - 1 col on phone, 2 on sm, 4 on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {stat.title}
                </span>
                {stat.icon}
              </div>
              <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for Products / Orders */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="products" className="gap-1.5 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-initial touch-manipulation min-h-[44px]">
            <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Produtos
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-1.5 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-initial touch-manipulation min-h-[44px]">
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Encomendas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Produtos do Catálogo</CardTitle>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 touch-manipulation min-h-[40px]">
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Novo Produto</span>
                <span className="sm:hidden">Novo</span>
              </Button>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              {/* Desktop table - hidden on mobile */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Ilha</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SAMPLE_PRODUCTS.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-muted overflow-hidden flex-shrink-0">
                              <img
                                src={product.imageUrl || '/placeholder.png'}
                                alt={product.namePt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {product.namePt}
                          </div>
                        </TableCell>
                        <TableCell>{product.island}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price.toFixed(2)}€</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.stockQuantity <= 10
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {product.stockQuantity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              product.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {product.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8 touch-manipulation min-h-[44px] min-w-[44px]">
                            <Edit3 className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile card layout - visible only on mobile */}
              <div className="md:hidden divide-y">
                {SAMPLE_PRODUCTS.map((product) => (
                  <div key={product.id} className="p-4 flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <img
                        src={product.imageUrl || '/placeholder.png'}
                        alt={product.namePt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1">{product.namePt}</h4>
                          <p className="text-xs text-muted-foreground">{product.island} · {product.category}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0 touch-manipulation min-h-[44px] min-w-[44px]">
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-sm">{product.price.toFixed(2)}€</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={product.stockQuantity <= 10 ? 'destructive' : 'secondary'}
                            className="text-[10px]"
                          >
                            Stock: {product.stockQuantity}
                          </Badge>
                          <Badge
                            className={`text-[10px] ${
                              product.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {product.isActive ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">Encomendas</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  A carregar encomendas...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Nenhuma encomenda registada ainda.
                </div>
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Itens</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Ref. Pagamento</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono text-xs">
                              {order.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell>
                              {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {order.totalAmount.toFixed(2)}€
                            </TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>
                              <Badge className={statusColors[order.status] || ''}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {order.paymentRef || '—'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile card layout */}
                  <div className="md:hidden divide-y">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-muted-foreground">
                            {order.id.slice(0, 8)}...
                          </span>
                          <Badge className={`text-[10px] ${statusColors[order.status] || ''}`}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString('pt-PT')}
                          </span>
                          <span className="font-semibold text-sm">
                            {order.totalAmount.toFixed(2)}€
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.items} {order.items === 1 ? 'item' : 'itens'}
                          {order.paymentRef && ` · Ref: ${order.paymentRef}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
