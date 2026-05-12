import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formatted = orders.map((order) => ({
      id: order.id,
      totalAmount: order.totalAmount,
      status: order.status,
      paymentRef: order.paymentRef,
      createdAt: order.createdAt.toISOString(),
      items: order.orderItems.length,
      orderItems: order.orderItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        product: item.product
          ? {
              id: item.product.id,
              namePt: item.product.namePt,
              nameEn: item.product.nameEn,
              imageUrl: item.product.imageUrl,
            }
          : null,
      })),
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Create order
    const order = await db.order.create({
      data: {
        totalAmount: body.totalAmount,
        status: 'pendente',
        paymentRef: `AE-${Date.now().toString().slice(-6)}`,
        billingData: JSON.stringify(body.billingData || {}),
        orderItems: {
          create: (body.items || []).map((item: { productId: string; quantity: number; unitPrice: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    // Update stock for each product
    for (const item of body.items || []) {
      const product = await db.product.findUnique({
        where: { id: item.productId },
      })
      if (product) {
        await db.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: Math.max(0, product.stockQuantity - item.quantity),
          },
        })
      }
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Failed to create order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
