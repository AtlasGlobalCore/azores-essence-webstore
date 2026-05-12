import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const products = await db.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = await db.product.create({
      data: {
        namePt: body.namePt,
        nameEn: body.nameEn || null,
        descriptionPt: body.descriptionPt || null,
        descriptionEn: body.descriptionEn || null,
        price: body.price,
        currency: body.currency || 'EUR',
        stockQuantity: body.stockQuantity || 0,
        island: body.island || null,
        category: body.category || null,
        imageUrl: body.imageUrl || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    })
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
