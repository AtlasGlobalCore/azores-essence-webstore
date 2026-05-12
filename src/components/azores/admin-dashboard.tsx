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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Painel de Administração</h1>
          <p className="text-muted-foreground text-sm">
            Azores Essence — Gestão
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {stat.title}
                </span>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for Products / Orders */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products" className="gap-2">
            <Package className="h-4 w-4" />
            Produtos
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Encomendas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Produtos do Catálogo</CardTitle>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Novo Produto
              </Button>
            </CardHeader>
            <CardContent>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Encomendas</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  A carregar encomendas...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma encomenda registada ainda.
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
