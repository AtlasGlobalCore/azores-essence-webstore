import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const SAMPLE_PRODUCTS = [
  {
    namePt: 'Queijo São Jorge DOP',
    nameEn: 'São Jorge DOP Cheese',
    descriptionPt:
      'O autêntico Queijo de São Jorge, produzido na ilha com leite de vaca criada em pastos verdes vulcânicos. Curado durante meses, revela um sabor forte e picante inconfundível. Denominação de Origem Protegida.',
    descriptionEn:
      'The authentic São Jorge Cheese, produced on the island with milk from cows raised on volcanic green pastures. Aged for months, it reveals a strong and unmistakably spicy flavor. Protected Designation of Origin.',
    price: 18.9,
    currency: 'EUR',
    stockQuantity: 50,
    island: 'São Jorge',
    category: 'Queijos',
    imageUrl: '/products/queijo-sao-jorge.png',
    isActive: true,
  },
  {
    namePt: 'Vinho Tinto do Pico - Terras de Lava',
    nameEn: 'Pico Red Wine - Terras de Lava',
    descriptionPt:
      'Vinho tinto produzido nas vinhas dos currais de pedra negra do Pico, Património Mundial da UNESCO. Uvas cultivadas em solo vulcânico, resultando num vinho com carácter mineral único e notas de frutos silvestres.',
    descriptionEn:
      'Red wine produced in the black stone currais vineyards of Pico, a UNESCO World Heritage Site. Grapes grown in volcanic soil, resulting in a wine with a unique mineral character and wild fruit notes.',
    price: 24.5,
    currency: 'EUR',
    stockQuantity: 30,
    island: 'Pico',
    category: 'Vinhos',
    imageUrl: '/products/vinho-pico.png',
    isActive: true,
  },
  {
    namePt: 'Mel de Flores - Ilha das Flores',
    nameEn: 'Wildflower Honey - Flores Island',
    descriptionPt:
      'Mel puro de flores silvestres colhido na paradisíaca ilha das Flores. Sabor floral delicado com notas de acácia e ervas endémicas. Produção artesanal, sem aditivos. Um verdadeiro néctar dos Açores.',
    descriptionEn:
      'Pure wildflower honey harvested on the paradisiacal island of Flores. Delicate floral flavor with notes of acacia and endemic herbs. Artisanal production, no additives. A true nectar of the Azores.',
    price: 12.9,
    currency: 'EUR',
    stockQuantity: 40,
    island: 'Flores',
    category: 'Doces & Mel',
    imageUrl: '/products/mel-flores.png',
    isActive: true,
  },
  {
    namePt: 'Ananás dos Açores - São Miguel',
    nameEn: 'Azores Pineapple - São Miguel',
    descriptionPt:
      'O famoso Ananás dos Açores, cultivado em estufas tradicionais em São Miguel. Doce, aromático e com baixa acidez — incomparável com qualquer outro. O único ananás produzido na Europa.',
    descriptionEn:
      'The famous Azores Pineapple, grown in traditional greenhouses in São Miguel. Sweet, aromatic and with low acidity — incomparable to any other. The only pineapple produced in Europe.',
    price: 8.5,
    currency: 'EUR',
    stockQuantity: 25,
    island: 'São Miguel',
    category: 'Frutas',
    imageUrl: '/products/ananas-saomiguel.png',
    isActive: true,
  },
  {
    namePt: 'Chá Preto Gorreana - São Miguel',
    nameEn: 'Gorreana Black Tea - São Miguel',
    descriptionPt:
      'Chá preto da Gorreana, a plantaçāo de chá mais antiga da Europa, fundada em 1883. Folhas colhidas à mão nas colinas de São Miguel. Sabor suave com notas de frutos e um aroma inconfundível.',
    descriptionEn:
      'Black tea from Gorreana, the oldest tea plantation in Europe, founded in 1883. Hand-picked leaves from the hills of São Miguel. Smooth flavor with fruity notes and an unmistakable aroma.',
    price: 9.9,
    currency: 'EUR',
    stockQuantity: 60,
    island: 'São Miguel',
    category: 'Chás & Infusões',
    imageUrl: '/products/cha-gorreana.png',
    isActive: true,
  },
  {
    namePt: 'Linguiça Defumada da Terceira',
    nameEn: 'Smoked Linguiça from Terceira',
    descriptionPt:
      'Linguiça artesanal defumada da ilha Terceira, feita com carne de porco criado solto nos pastos açorianos. Tempero tradicional com alho, pimentão e vinho de cheiro. Curada lentamente em fumeiro de lenha.',
    descriptionEn:
      'Artisanal smoked linguiça from Terceira island, made with free-range pork raised on Azorean pastures. Traditional seasoning with garlic, paprika and local wine. Slowly cured in wood smokehouse.',
    price: 14.5,
    currency: 'EUR',
    stockQuantity: 35,
    island: 'Terceira',
    category: 'Enchidos',
    imageUrl: '/products/linguica-terceira.png',
    isActive: true,
  },
]

export async function POST() {
  try {
    // Clear existing products
    await db.product.deleteMany()

    // Insert sample products
    const created = []
    for (const product of SAMPLE_PRODUCTS) {
      const p = await db.product.create({ data: product })
      created.push(p)
    }

    return NextResponse.json({
      message: `Seeded ${created.length} products`,
      products: created,
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
