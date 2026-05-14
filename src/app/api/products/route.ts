import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const products = await db.product.findMany({
      where: { isActive: true },
      include: { category: true },
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
        sku: body.sku || `SKU-${Date.now()}`,
        namePt: body.namePt,
        nameEn: body.nameEn || null,
        nameFr: body.nameFr || null,
        nameDe: body.nameDe || null,
        descriptionPt: body.descriptionPt || null,
        descriptionEn: body.descriptionEn || null,
        descriptionFr: body.descriptionFr || null,
        descriptionDe: body.descriptionDe || null,
        price: body.price,
        compareAtPrice: body.compareAtPrice || null,
        currency: body.currency || 'EUR',
        stockQuantity: body.stockQuantity || 0,
        categoryId: body.categoryId || null,
        imageUrl: body.imageUrl || null,
        images: body.images ? JSON.stringify(body.images) : null,
        weight: body.weight || null,
        origin: body.origin || null,
        featured: body.featured || false,
        tags: body.tags ? JSON.stringify(body.tags) : null,
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
