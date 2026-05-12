export type AppView = 'home' | 'products' | 'checkout' | 'privacy' | 'terms' | 'admin'

export interface Product {
  id: string
  namePt: string
  nameEn: string | null
  descriptionPt: string | null
  descriptionEn: string | null
  price: number
  currency: string
  stockQuantity: number
  island: string | null
  category: string | null
  imageUrl: string | null
  isActive: boolean
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
  'Vinhos',
  'Doces & Mel',
  'Chás & Infusões',
  'Enchidos',
  'Frutas',
  'Lifestyle',
] as const

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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
