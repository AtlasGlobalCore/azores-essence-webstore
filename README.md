# 🌋 Azores Essence — Webstore

> **Sabores Autênticos dos Açores — Do meio do Atlântico para a sua mesa.**

Plataforma de e-commerce completa para produtos artesanais açorianos, desenvolvida com Next.js 16, TypeScript, inteligência artificial e arquitetura moderna. Operada pela **Azores Meet, Lda** (NIF: 513553169).

---

## 📋 Índice

- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Setup](#-instalação-e-setup)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Base de Dados (Prisma)](#-base-de-dados-prisma)
- [API Routes — Referência Completa](#-api-routes--referência-completa)
- [CRM e Painel Admin](#-crm-e-painel-admin)
- [Sistema de Autenticação Admin](#-sistema-de-autenticação-admin)
- [Assistente IA — Maria da Terra](#-assistente-ia--maria-da-terra)
- [Gestão do Carrinho (Zustand)](#-gestão-do-carrinho-zustand)
- [Fluxo de Checkout](#-fluxo-de-checkout)
- [Layout e Navegação (SPA)](#-layout-e-navegação-spa)
- [Componentes — Documentação Completa](#-componentes--documentação-completa)
- [Responsividade](#-responsividade)
- [SEO e Indexação](#-seo-e-indexação)
- [Legal (RGPD 2026)](#-legal-rgpd-2026)
- [Pagamentos — Atlas Core](#-pagamentos--atlas-core)
- [Deploy (Vercel)](#-deploy-vercel)
- [Roadmap](#-roadmap)
- [Suporte](#-suporte)

---

## 🏗 Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AZORES ESSENCE                               │
│                     Next.js 16 (App Router)                         │
├──────────────┬──────────────┬──────────────┬────────────────────────┤
│   CLIENT     │   SERVER     │    API       │      DATABASE          │
│   (React)    │   (SSR)      │   Routes     │   (SQLite / Prisma)    │
├──────────────┼──────────────┼──────────────┼────────────────────────┤
│ Zustand      │ Metadata     │ GET/POST     │    Product (6+ seed)   │
│ Cart Store   │ Viewport     │ /products    │    Profile             │
│              │ SEO/OG       │ /orders      │    Order               │
│ 6 SPA Views  │ Manifest     │ /chat        │    OrderItem           │
│ Framer Mot.  │ robots.txt   │ /seed        │    Invoice             │
│ Chat Widget  │ sitemap.xml  │ /admin/auth  │                        │
│ Checkout     │ Favicon      │ /admin/verify│                        │
└──────────────┴──────────────┴──────────────┴────────────────────────┘
       │                │                  │                │
       ▼                ▼                  ▼                ▼
  z-ai-web-dev-sdk   Next.js          REST API        Prisma Client
  (Maria da Terra)   Server          Endpoints       (SQLite WAL mode)
```

### Fluxo de Dados Principal

```
Utilizador → Header/Nav → SPA View State → Component Render
                                              │
                     ┌────────────────────────┤
                     ▼                        ▼
              Product Catalog           Cart (Zustand)
                     │                        │
                     ▼                        ▼
             GET /api/products         Checkout Flow
                                              │
                     ┌────────────────────────┤
                     ▼                        ▼
              Billing Form             POST /api/orders
                                              │
                                              ▼
                                      Atlas Core Payment
                                              │
                                              ▼
                                      Order Confirmation
```

### Arquitetura de Autenticação Admin

```
Login Form → POST /api/admin/auth → Validate ADMIN_CREDENTIALS (env)
                                          │
                                    ┌─────┴─────┐
                                    │  Match?   │
                                    └─────┬─────┘
                                      No  │  Yes
                                      ▼       ▼
                                    401    Token = Base64(id:timestamp:HMAC-SHA256)
                                              │
                                              ▼
                                    localStorage('admin_token')
                                              │
                                              ▼
                                    POST /api/admin/verify → Verify HMAC + Expiry (24h)
                                              │
                                              ▼
                                    AdminDashboard Render
```

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Uso | Justificação |
|---|---|---|---|
| **Next.js** | 16 | Framework principal (App Router) | SSR, API Routes, SEO nativo |
| **TypeScript** | 5 | Linguagem | Tipagem estática, DX |
| **Tailwind CSS** | 4 | Estilização | Utility-first, responsive |
| **shadcn/ui** | New York | Componentes UI | Radix primitives, acessível |
| **Prisma ORM** | 6 | Base de dados (SQLite) | Type-safe queries, migrations |
| **Zustand** | 5 | Estado do carrinho | Leve, sem boilerplate |
| **TanStack Query** | 5 | Estado do servidor (Admin) | Cache, refetch, loading |
| **Framer Motion** | 12 | Animações | Declarativo, performático |
| **z-ai-web-dev-sdk** | 0.0.17+ | Maria da Terra AI | LLM chat, SDK nativo |
| **Lucide React** | 0.525+ | Ícones | Tree-shakeable, consistente |
| **React Hook Form** | 7 | Formulários (checkout) | Validação, performance |
| **Sonner** | 2 | Toast notifications | Acessível, bonito |
| **next-themes** | 0.4 | Dark/light mode | System preference |
| **Recharts** | 2 | Gráficos (futuro) | React-native charting |
| **sharp** | 0.34 | Image optimization | Next.js Image pipeline |

---

## 📁 Estrutura do Projeto

```
azores-essence-webstore/
├── prisma/
│   └── schema.prisma              # Schema da BD (5 models)
├── db/
│   └── custom.db                  # SQLite database (WAL mode)
├── public/
│   ├── products/                  # Imagens dos produtos (AI-generated)
│   │   ├── queijo-sao-jorge.png   #   Queijo São Jorge DOP
│   │   ├── vinho-pico.png         #   Vinho Tinto do Pico
│   │   ├── mel-flores.png         #   Mel de Flores
│   │   ├── ananas-saomiguel.png   #   Ananás dos Açores
│   │   ├── cha-gorreana.png       #   Chá Preto Gorreana
│   │   ├── linguica-terceira.png  #   Linguiça da Terceira
│   │   └── hero-azores.png        #   Imagem hero (1344×768)
│   ├── azores-logo.png            # Logo da marca (favicon)
│   ├── logo.svg                   # Logo SVG
│   ├── manifest.json              # PWA manifest (theme: #059669)
│   ├── robots.txt                 # SEO crawling rules
│   └── sitemap.xml                # SEO sitemap
├── src/
│   ├── app/
│   │   ├── page.tsx               # Página principal (SPA router)
│   │   ├── layout.tsx             # Root layout + SEO metadata
│   │   ├── globals.css            # CSS global + Tailwind
│   │   └── api/
│   │       ├── route.ts           # Health check endpoint
│   │       ├── products/route.ts  # GET (list) + POST (create)
│   │       ├── orders/route.ts    # GET (list) + POST (create + stock)
│   │       ├── chat/route.ts      # POST (Maria da Terra AI)
│   │       ├── seed/route.ts      # POST (seed 6 produtos)
│   │       └── admin/
│   │           ├── auth/route.ts  # POST (autenticar ID:Senha)
│   │           └── verify/route.ts# POST (verificar token HMAC)
│   ├── components/
│   │   ├── azores/                # Componentes do domínio
│   │   │   ├── header.tsx         #   Navegação sticky + menu mobile
│   │   │   ├── hero-section.tsx   #   Hero com CTA + imagem
│   │   │   ├── product-catalog.tsx#   Grid de produtos + filtros
│   │   │   ├── cart-sidebar.tsx   #   Sheet lateral do carrinho
│   │   │   ├── checkout-flow.tsx  #   3 passos: Faturação→Pagamento→Confirmação
│   │   │   ├── chat-widget.tsx    #   Maria da Terra (botão flutuante)
│   │   │   ├── admin-login.tsx    #   Formulário de login admin
│   │   │   ├── admin-dashboard.tsx#   Painel CRM com tabs
│   │   │   ├── privacy-policy.tsx #   RGPD 2026
│   │   │   ├── terms-and-conditions.tsx # Termos de venda
│   │   │   └── footer.tsx         #   Footer 4 colunas
│   │   ├── ui/                    # shadcn/ui (40+ componentes)
│   │   └── providers.tsx          # QueryClientProvider wrapper
│   ├── stores/
│   │   └── cart-store.ts          # Zustand: items, add, remove, total
│   ├── lib/
│   │   ├── products.ts            # Types (AppView, Product), constants, sample data
│   │   ├── db.ts                  # Prisma client singleton
│   │   └── utils.ts               # cn() helper (clsx + tailwind-merge)
│   └── hooks/
│       ├── use-toast.ts           # Toast state hook
│       └── use-mobile.ts          # Responsive breakpoint hook
├── .env.example                   # Template de variáveis
├── package.json                   # Dependências e scripts
├── next.config.ts                 # Next.js config (standalone output)
├── tailwind.config.ts             # Tailwind config
├── tsconfig.json                  # TypeScript config
├── components.json                # shadcn/ui config
├── Caddyfile                      # Gateway reverso
└── README.md                      # Este ficheiro
```

---

## 🚀 Instalação e Setup

### Pré-requisitos

| Requisito | Versão | Verificação |
|---|---|---|
| **Node.js** | 18+ | `node -v` |
| **Bun** | 1.0+ | `bun -v` |
| **Git** | 2.x | `git --version` |

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/AtlasGlobalCore/azores-essence-webstore.git
cd azores-essence-webstore

# 2. Instalar dependências
bun install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as suas chaves (ver secção Variáveis de Ambiente)

# 4. Inicializar a base de dados (cria o ficheiro SQLite)
bun run db:push

# 5. Semear com 6 produtos de exemplo
curl -X POST http://localhost:3000/api/seed

# 6. Iniciar o servidor de desenvolvimento
bun run dev
# → Disponível em http://localhost:3000
```

### Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `bun run dev` | Servidor de desenvolvimento (porta 3000, com tee para dev.log) |
| `bun run build` | Build de produção (standalone output) |
| `bun run lint` | Verificação ESLint + regras Next.js |
| `bun run db:push` | Sincronizar schema Prisma com a BD |
| `bun run db:generate` | Gerar Prisma Client |
| `bun run db:migrate` | Criar e aplicar migration |
| `bun run db:reset` | Reset completo da BD |

---

## 🔐 Variáveis de Ambiente

Criar ficheiro `.env` na raiz do projeto (baseado em `.env.example`):

```env
# ═══════════════════════════════════════════
# BASE DE DADOS
# ═══════════════════════════════════════════
DATABASE_URL=file:./db/custom.db

# ═══════════════════════════════════════════
# ADMIN — Autenticação ID:Senha
# Formato: id1:senha1,id2:senha2,id3:senha3
# Pode adicionar quantos utilizadores quiser
# As senhas podem conter dois-pontos (:)
# ═══════════════════════════════════════════
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026
ADMIN_SECRET=azores-essence-secret-key-2026

# ═══════════════════════════════════════════
# SUPABASE (Produção — futuro)
# Para migração de SQLite → Supabase
# ═══════════════════════════════════════════
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ═══════════════════════════════════════════
# ATLAS CORE — Pagamentos
# Cartão, MB WAY, Multibanco, SEPA
# ═══════════════════════════════════════════
ATLAS_CORE_API_KEY=

# ═══════════════════════════════════════════
# Z-AI SDK — Maria da Terra AI
# ═══════════════════════════════════════════
# (Configurado internamente pelo SDK)

# ═══════════════════════════════════════════
# SITE
# ═══════════════════════════════════════════
NEXT_PUBLIC_SITE_URL=https://azoresessence.pt
```

> ⚠️ **Nunca** faça commit do `.env`. O `.gitignore` já o exclui.

---

## 💾 Base de Dados (Prisma)

### Diagrama ER

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Product    │     │    OrderItem     │     │    Order     │
├──────────────┤     ├──────────────────┤     ├──────────────┤
│ id (PK,cuid) │◄────│ productId (FK)   │     │ id (PK,cuid) │
│ namePt       │     │ orderId (FK)     │────►│ profileId(FK)│
│ nameEn       │     │ quantity         │     │ totalAmount  │
│ descriptionPt│     │ unitPrice        │     │ status       │
│ descriptionEn│     └──────────────────┘     │ paymentRef   │
│ price        │               │              │ billingData  │
│ currency     │               │              │ createdAt    │
│ stockQuantity│               │              └──────┬───────┘
│ island       │               │                     │
│ category     │               │              ┌──────┴───────┐
│ imageUrl     │               │              │   Invoice    │
│ isActive     │               │              ├──────────────┤
│ createdAt    │               │              │ id (PK,cuid) │
└──────────────┘               │              │ orderId (FK) │
                               │              │ invoiceNumber│
┌──────────────┐               │              │ pdfUrl       │
│   Profile    │               │              │ createdAt    │
├──────────────┤               │              └──────────────┘
│ id (PK,cuid) │◄──────────────┘
│ fullName     │
│ vatNumber    │
│ address      │
│ city         │
│ postalCode   │
│ country      │
│ isAdmin      │
│ email (uniq) │
│ updatedAt    │
│              │
│ orders []    │
└──────────────┘
```

### Schema Detalhado (5 Models)

#### Product — Catálogo de Produtos

| Campo | Tipo | Default | Descrição |
|---|---|---|---|
| `id` | String (cuid) | auto | ID único |
| `namePt` | String | — | Nome em Português (obrigatório) |
| `nameEn` | String? | null | Nome em Inglês |
| `descriptionPt` | String? | null | Descrição em PT |
| `descriptionEn` | String? | null | Descrição em EN |
| `price` | Float | 0 | Preço em EUR |
| `currency` | String | "EUR" | Código da moeda |
| `stockQuantity` | Int | 0 | Unidades em stock |
| `island` | String? | null | Ilha de origem |
| `category` | String? | null | Categoria do produto |
| `imageUrl` | String? | null | Caminho da imagem |
| `isActive` | Boolean | true | Produto ativo no catálogo |
| `createdAt` | DateTime | now() | Data de criação |

**Relações:** `orderItems → OrderItem[]`

#### Profile — Cliente / Utilizador

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | ID único |
| `fullName` | String? | Nome completo |
| `vatNumber` | String? | NIF (contribuinte) |
| `email` | String (unique) | E-mail do cliente |
| `isAdmin` | Boolean | Acesso admin |
| `updatedAt` | DateTime | Última atualização |

**Relações:** `orders → Order[]`

#### Order — Encomenda

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | ID único |
| `profileId` | String? | Ref. ao Profile |
| `totalAmount` | Float | Valor total (EUR) |
| `status` | String | `pendente` / `pago` / `enviado` / `cancelado` |
| `paymentRef` | String? | Referência Atlas Core |
| `billingData` | String? | JSON com dados de faturação |
| `createdAt` | DateTime | Data da encomenda |

**Relações:** `profile → Profile?`, `orderItems → OrderItem[]`, `invoices → Invoice[]`

#### OrderItem — Item da Encomenda

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | ID único |
| `orderId` | String | FK → Order (cascade delete) |
| `productId` | String | FK → Product |
| `quantity` | Int | Quantidade encomendada |
| `unitPrice` | Float | Preço unitário no momento da compra |

#### Invoice — Fatura

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | ID único |
| `orderId` | String | FK → Order |
| `invoiceNumber` | String (unique) | Nº da fatura |
| `pdfUrl` | String? | URL do PDF gerado |
| `createdAt` | DateTime | Data de emissão |

### Comandos Úteis da BD

```bash
# Sincronizar schema (sem perder dados)
bun run db:push

# Reset completo da BD
bun run db:push --force-reset

# Semear 6 produtos de exemplo
curl -X POST http://localhost:3000/api/seed

# Explorar dados com Prisma Studio
npx prisma studio
# → Abre interface visual em http://localhost:5555

# Gerar Prisma Client (após alterar schema)
bun run db:generate
```

---

## 🔌 API Routes — Referência Completa

### Base URL: `http://localhost:3000/api`

---

#### `GET /api` — Health Check

Verifica se a aplicação está a correr.

**Response (200):**
```json
{ "status": "ok", "service": "Azores Essence API" }
```

---

#### `GET /api/products` — Listar Produtos Ativos

Retorna todos os produtos com `isActive = true`, ordenados por data de criação.

**Response (200):**
```json
[
  {
    "id": "cm3abc...",
    "namePt": "Queijo São Jorge DOP",
    "nameEn": "São Jorge DOP Cheese",
    "descriptionPt": "O autêntico Queijo de São Jorge...",
    "descriptionEn": "The authentic São Jorge Cheese...",
    "price": 18.9,
    "currency": "EUR",
    "stockQuantity": 50,
    "island": "São Jorge",
    "category": "Queijos",
    "imageUrl": "/products/queijo-sao-jorge.png",
    "isActive": true,
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
]
```

---

#### `POST /api/products` — Criar Produto

**Request Body:**
```json
{
  "namePt": "Novo Produto",
  "nameEn": "New Product",
  "descriptionPt": "Descrição...",
  "price": 15.90,
  "currency": "EUR",
  "stockQuantity": 20,
  "island": "São Miguel",
  "category": "Doces & Mel",
  "imageUrl": "/products/novo-produto.png"
}
```

**Response (201):** Produto criado com `id` gerado.

---

#### `GET /api/orders` — Listar Encomendas

Retorna todas as encomendas com itens e dados do produto.

**Response (200):**
```json
[
  {
    "id": "cm3def...",
    "totalAmount": 43.80,
    "status": "pendente",
    "paymentRef": "AE-938472",
    "createdAt": "2026-01-15T14:20:00.000Z",
    "items": 2,
    "orderItems": [
      {
        "id": "cm3ghi...",
        "productId": "cm3abc...",
        "quantity": 1,
        "unitPrice": 18.90,
        "product": {
          "id": "cm3abc...",
          "namePt": "Queijo São Jorge DOP",
          "imageUrl": "/products/queijo-sao-jorge.png"
        }
      }
    ]
  }
]
```

---

#### `POST /api/orders` — Criar Encomenda

Cria a encomenda e decrementa o stock de cada produto.

**Request Body:**
```json
{
  "items": [
    { "productId": "cm3abc...", "quantity": 2, "unitPrice": 18.90 }
  ],
  "billingData": {
    "fullName": "João Silva",
    "vatNumber": "123456789",
    "email": "joao@email.com",
    "address": "Rua das Flores, 12",
    "city": "Lisboa",
    "postalCode": "1000-001",
    "country": "Portugal"
  },
  "paymentMethod": "card",
  "totalAmount": 42.79
}
```

**Lógica do Servidor:**
1. Cria `Order` com status `"pendente"`
2. Cria `OrderItem[]` via nested create
3. Gera `paymentRef` = `"AE-{timestamp6}"`
4. Armazena `billingData` como JSON string
5. Para cada item: `Product.stockQuantity -= quantity` (min 0)
6. Retorna o `Order` com `orderItems`

**Response (201):** Order criada.

---

#### `POST /api/chat` — Maria da Terra AI

**Request Body:**
```json
{
  "message": "Que produtos têm do Pico?",
  "history": [
    { "role": "user", "content": "Olá" },
    { "role": "assistant", "content": "Seja bem-vindo!" }
  ],
  "systemPrompt": "Age como a Maria da Terra..."
}
```

**Response (200):**
```json
{
  "response": "Ah, do Pico temos o nosso Vinho Tinto Terras de Lava, 24.50€! As vinhas crescem nos currais de pedra preta, património da UNESCO. É um vinho com carácter mineral único, menino!"
}
```

**Motor:** `z-ai-web-dev-sdk` → `zai.chat.completions.create()`

---

#### `POST /api/admin/auth` — Autenticar Admin

**Request Body:**
```json
{ "id": "admin", "senha": "azores2026" }
```

**Lógica:**
1. Faz parse de `ADMIN_CREDENTIALS` (env): `"id1:senha1,id2:senha2"`
2. Suporta senhas com `:` (ex: `"admin:pass:word"`)
3. Se as credenciais coincidirem:
   - Gera timestamp atual
   - Calcula `HMAC-SHA256(id:timestamp, ADMIN_SECRET)`
   - Token = `Base64(id:timestamp:hmac_hex)`

**Response (200, sucesso):**
```json
{ "success": true, "token": "YWRtaW46MTczNjk0...==" }
```

**Response (401, falha):**
```json
{ "success": false, "error": "Credenciais inválidas" }
```

---

#### `POST /api/admin/verify` — Verificar Token Admin

**Request Body:**
```json
{ "token": "YWRtaW46MTczNjk0...==" }
```

**Lógica:**
1. Decodifica Base64 → `"id:timestamp:hmac_hex"`
2. Extrai id, timestamp, hmac (suporta ids com `:`)
3. Verifica expiração: `Date.now() - timestamp > 24h` → `expired`
4. Recalcula `HMAC-SHA256(id:timestamp, ADMIN_SECRET)`
5. Compara com o hmac do token (timing-safe implícito)

**Response (200, válido):**
```json
{ "valid": true, "id": "admin" }
```

**Response (401, inválido/expirado):**
```json
{ "valid": false, "reason": "expired" }
```

---

#### `POST /api/seed` — Semear Base de Dados

Elimina todos os produtos existentes e insere 6 produtos de exemplo.

**Response (200):**
```json
{
  "message": "Seeded 6 products",
  "products": [ /* 6 Product objects */ ]
}
```

| Produto | Preço | Ilha | Categoria |
|---|---|---|---|
| Queijo São Jorge DOP | 18.90€ | São Jorge | Queijos |
| Vinho Tinto do Pico | 24.50€ | Pico | Vinhos |
| Mel de Flores | 12.90€ | Flores | Doces & Mel |
| Ananás dos Açores | 8.50€ | São Miguel | Frutas |
| Chá Preto Gorreana | 9.90€ | São Miguel | Chás & Infusões |
| Linguiça Defumada | 14.50€ | Terceira | Enchidos |

---

## 📊 CRM e Painel Admin

### Como Aceder

1. Clique em **"Admin"** na navegação (header ou footer)
2. Será apresentado o ecrã de login (`AdminLogin`)
3. Insira o **Identificador** e a **Senha** definidos em `ADMIN_CREDENTIALS`
4. Após autenticação, acede ao painel completo (`AdminDashboard`)

### Credenciais Padrão (desenvolvimento)

| ID | Senha | Perfil |
|---|---|---|
| `admin` | `azores2026` | Administrador principal |
| `geral` | `essence2026` | Gestor operacional |

> ⚠️ **Alterar as senhas em produção!** Edite a variável `ADMIN_CREDENTIALS` no `.env` e faça redeploy.

### Funcionalidades do Admin

| Secção | Funcionalidade | Componente |
|---|---|---|
| **Dashboard** | 4 cards: Produtos, Encomendas, Receita, Conversão | `AdminDashboard` |
| **Produtos** | Tabela (desktop) / Cards (mobile) com imagem, nome, ilha, categoria, preço, stock, estado | `TabsContent` |
| **Encomendas** | Tabela (desktop) / Cards (mobile) com ID, data, total, itens, estado, ref. pagamento | `TabsContent` |
| **Logout** | Remove token do localStorage, volta ao login | `AdminDashboard` |

### Layout Responsivo do Admin

- **Desktop (≥768px):** Tabela completa com todas as colunas
- **Mobile (<768px):** Cards empilhados com informação essencial
- **Touch targets:** Mínimo 44px em todos os botões
- **Scroll:** Overflow horizontal em tabelas se necessário

---

## 🔒 Sistema de Autenticação Admin

### Arquitetura de Segurança

```
┌─────────────────────────────────────────────────────────┐
│                  ADMIN AUTH FLOW                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. LOGIN                                               │
│     POST /api/admin/auth { id, senha }                  │
│         │                                               │
│         ▼                                               │
│     Parse ADMIN_CREDENTIALS from env                    │
│     (format: "id1:senha1,id2:senha2")                   │
│         │                                               │
│         ▼                                               │
│     Match credentials? ──No──► 401 Unauthorized        │
│         │                                               │
│        Yes                                              │
│         │                                               │
│         ▼                                               │
│     Generate Token:                                     │
│     timestamp = Date.now()                              │
│     payload = id + ":" + timestamp                      │
│     hmac = HMAC-SHA256(payload, ADMIN_SECRET)           │
│     token = Base64(payload + ":" + hmac_hex)            │
│         │                                               │
│         ▼                                               │
│     Return { success: true, token }                     │
│                                                         │
│  2. TOKEN STORAGE                                       │
│     localStorage.setItem('admin_token', token)          │
│                                                         │
│  3. VERIFICATION                                        │
│     POST /api/admin/verify { token }                    │
│         │                                               │
│         ▼                                               │
│     Decode Base64 → id:timestamp:hmac                   │
│         │                                               │
│         ▼                                               │
│     Check expiry: (now - timestamp) > 24h? ──Yes──► 401│
│         │                                               │
│        No                                               │
│         │                                               │
│         ▼                                               │
│     Verify HMAC: recalc & compare                       │
│         │                                               │
│         ▼                                               │
│     Return { valid: true, id }                          │
└─────────────────────────────────────────────────────────┘
```

### Propriedades de Segurança

| Propriedade | Implementação |
|---|---|
| **Algoritmo** | HMAC-SHA256 com `ADMIN_SECRET` |
| **Expiração** | 24 horas (86 400 000 ms) |
| **Storage** | `localStorage` (client-side) |
| **Transporte** | HTTPS em produção (Vercel) |
| **Senhas no env** | Nunca expostas ao cliente |
| **Token tampering** | HMAC verification impede alterações |
| **Token replay** | Timestamp único por login |
| **Multiple users** | Suportado via `id1:senha1,id2:senha2` |
| **Colons in passwords** | Suportado: `parts.slice(1).join(':')` |

### Gestão de Credenciais

```bash
# Adicionar novo utilizador
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026,novo:senhanova

# Remover utilizador
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026

# Alterar senha
ADMIN_CREDENTIALS=admin:novaSenha2026,geral:essence2026

# Após alterar, reiniciar o servidor:
bun run dev
```

> 📝 Sessões ativas (tokens em localStorage) expiram após 24h. Após alterar credenciais, utilizadores com sessões antigas terão de voltar a autenticar-se.

---

## 🤖 Assistente IA — Maria da Terra

A Maria da Terra é a assistente virtual da Azores Essence, com personalidade açoriana autêntica.

### Características da Personalidade

| Atributo | Detalhe |
|---|---|
| **Nome** | Maria da Terra |
| **Personalidade** | Mulher açoriana orgulhosa, hospitaleira e sábia |
| **Expressões** | "Seja bem-vindo, menino(a)", "Está um dia de bruma", "Isso é que é um queijinho de primeira" |
| **Idiomas** | PT (principal), EN, FR, DE |
| **Conhecimento** | Catálogo de produtos, envio, pagamentos, empresa |

### Fluxo de Conversação

```
Utilizador clica no botão flutuante (canto inferior direito)
        │
        ▼
Janela de chat abre com mensagem de boas-vindas
        │
        ▼
Utilizador escreve mensagem
        │
        ▼
POST /api/chat { message, history, systemPrompt }
        │
        ▼
z-ai-web-dev-sdk → zai.chat.completions.create({ messages })
        │
        ▼
Resposta da IA exibida no chat
        │
        ▼
Histórico atualizado no estado do componente
```

### System Prompt (Resumo)

O `MARIA_SYSTEM_PROMPT` em `/src/components/azores/chat-widget.tsx` inclui:

1. **Personalidade e expressões** açorianas
2. **6 produtos** com nome, preço, ilha e categoria
3. **Regras de envio:** Grátis acima de 50€, 4.99€ abaixo
4. **Pagamentos:** Atlas Core (Cartões, MB WAY, Multibanco, SEPA)
5. **Empresa:** Azores Meet, Lda — NIF 513553169

### Personalização

Para alterar a personalidade, edite a constante `MARIA_SYSTEM_PROMPT` em:
```
/src/components/azores/chat-widget.tsx
```

---

## 🛒 Gestão do Carrinho (Zustand)

### Store: `useCartStore`

```typescript
interface CartStore {
  items: CartItem[]           // Lista de itens no carrinho
  isOpen: boolean             // Estado do sidebar
  addItem: (item) => void     // Adicionar (ou incrementar quantidade)
  removeItem: (id) => void    // Remover item completamente
  updateQuantity: (id, q) => void  // Alterar quantidade (≤0 remove)
  clearCart: () => void       // Esvaziar carrinho
  toggleCart: () => void      // Abrir/fechar sidebar
  setCartOpen: (open) => void // Definir estado do sidebar
  totalItems: () => number    // Total de unidades
  totalAmount: () => number   // Valor total em EUR
}
```

### Interface do CartItem

```typescript
interface CartItem {
  id: string
  namePt: string
  nameEn: string | null
  price: number
  quantity: number
  imageUrl: string | null
  island: string | null
}
```

### Lógica de Adição

```
addItem(produto) executado
        │
        ▼
Produto já existe no carrinho?
        │
    Sim │         Não
        ▼              ▼
  Incrementar      Adicionar com
  quantity + 1     quantity = 1
```

### Regras de Envio

| Condição | Custo |
|---|---|
| Subtotal ≥ 50€ | **Grátis** |
| Subtotal < 50€ | 4.99€ |

---

## 💳 Fluxo de Checkout

### 3 Passos

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐
│  PASSO 1    │     │  PASSO 2    │     │    PASSO 3       │
│  Faturação  │────►│  Pagamento  │────►│   Confirmação    │
│             │     │             │     │                  │
│ Nome *      │     │ Cartão      │     │ ✓ Encomenda      │
│ NIF         │     │ MB WAY      │     │   Confirmada!    │
│ E-mail *    │     │ Multibanco  │     │                  │
│ Telefone    │     │ SEPA        │     │ Nº AE-XXXXXX    │
│ Morada *    │     │             │     │                  │
│ Cidade *    │     │ Atlas Core  │     │ [Continuar]      │
│ C. Postal * │     │ Encriptado  │     │ [Voltar Início]  │
│ País        │     │             │     │                  │
│             │     │             │     │                  │
│ Resumo:     │     │ Pagar XX€   │     │                  │
│ Subtotal    │     │             │     │                  │
│ Envio       │     │             │     │                  │
│ Total       │     │             │     │                  │
└─────────────┘     └─────────────┘     └──────────────────┘
```

### Métodos de Pagamento

| Método | Ícone | Detalhes Adicionais |
|---|---|---|
| **Cartão de Crédito/Débito** | `CreditCard` | Nº, Validade, CVV |
| **MB WAY** | `Smartphone` | Nº de telemóvel |
| **Multibanco** | `Building2` | Ref. gerada (futuro) |
| **Transferência SEPA** | `Building2` | IBAN (futuro) |

### Processamento

1. Após submeter pagamento, é simulado um delay de 2 segundos
2. `POST /api/orders` cria a encomenda na BD
3. Stock é decrementado automaticamente
4. Carrinho é limpo (`clearCart()`)
5. Ecrã de confirmação com nº de encomenda `AE-{timestamp}`

---

## 🧭 Layout e Navegação (SPA)

### Tipo de Aplicação

A aplicação é uma **SPA (Single Page Application)** com vista gerida por estado (`AppView`). Toda a navegação ocorre no cliente, sem rotas dinâmicas Next.js. A única rota real é `/` (definida em `src/app/page.tsx`).

### Tipo AppView

```typescript
type AppView = 'home' | 'products' | 'checkout' | 'privacy' | 'terms' | 'admin'
```

### Vistas e Componentes

| Vista | Componente(s) | Descrição |
|---|---|---|
| `home` | `HeroSection` + `ProductCatalog` | Landing com hero e catálogo |
| `products` | `ProductCatalog` | Catálogo completo com filtros |
| `checkout` | `CheckoutFlow` | 3 passos de checkout |
| `privacy` | `PrivacyPolicy` | Política RGPD 2026 |
| `terms` | `TermsAndConditions` | Termos e Condições |
| `admin` | `AdminLogin` → `AdminDashboard` | Login + Painel CRM |

### Componentes Globais (sempre visíveis)

| Componente | Ficheiro | Descrição |
|---|---|---|
| **Header** | `header.tsx` | Navegação sticky com logo, menu, carrinho |
| **Footer** | `footer.tsx` | 4 colunas: marca, navegação, legal, contacto |
| **CartSidebar** | `cart-sidebar.tsx` | Sheet lateral com itens e total |
| **ChatWidget** | `chat-widget.tsx` | Botão flutuante + janela Maria da Terra |

---

## 🧩 Componentes — Documentação Completa

### Header (`src/components/azores/header.tsx`)

**Props:**
```typescript
interface HeaderProps {
  currentView: AppView
  onViewChange: (view: AppView) => void
}
```

**Funcionalidades:**
- Logo clicável → navega para `home`
- Desktop nav: Início, Produtos, Admin + ícones legais
- Mobile: menu hamburger com todas as opções
- Botão do carrinho com badge de quantidade
- Sticky com `backdrop-blur`

### HeroSection (`src/components/azores/hero-section.tsx`)

**Props:**
```typescript
interface HeroSectionProps {
  onShopNow: () => void  // Navega para vista de produtos
}
```

**Conteúdo:** Título, subtítulo, CTA "Comprar Agora", imagem hero com Framer Motion.

### ProductCatalog (`src/components/azores/product-catalog.tsx`)

**Funcionalidades:**
- `GET /api/products` com TanStack Query
- Filtros por ilha e categoria
- Grid responsivo: 1 col (mobile), 2 (tablet), 3-4 (desktop)
- Botão "Adicionar ao Carrinho" → `useCartStore.addItem()`
- Loading skeletons

### CartSidebar (`src/components/azores/cart-sidebar.tsx`)

**Props:**
```typescript
interface CartSidebarProps {
  onCheckout: () => void  // Navega para checkout
}
```

**Funcionalidades:**
- Sheet lateral (shadcn/ui)
- Lista de itens com +/− quantidade
- Cálculo automático de subtotal + envio
- Botão "Finalizar Encomenda"
- Badge de quantidade no header

### CheckoutFlow (`src/components/azores/checkout-flow.tsx`)

**Props:**
```typescript
interface CheckoutFlowProps {
  onBack: () => void
  onViewChange: (view: string) => void
}
```

**Ver documentação completa em [Fluxo de Checkout](#-fluxo-de-checkout)**

### AdminLogin (`src/components/azores/admin-login.tsx`)

**Props:**
```typescript
interface AdminLoginProps {
  onBack: () => void
  onLogin: (token: string) => void
}
```

**Funcionalidades:**
- Formulário com campos ID + Senha
- Toggle de visibilidade da senha (Eye/EyeOff)
- Error display em caixa vermelha
- Loading state durante autenticação
- Background decorativo com gradientes emerald

### AdminDashboard (`src/components/azores/admin-dashboard.tsx`)

**Props:**
```typescript
interface AdminDashboardProps {
  onBack: () => void
}
```

**Funcionalidades:**
- 4 cards de estatísticas (Produtos, Encomendas, Receita, Conversão)
- Tabs: Produtos / Encomendas
- TanStack Query para `GET /api/orders`
- Layout responsivo: tabela (desktop) / cards (mobile)
- Botão "Novo Produto" (futuro CRUD)

### ChatWidget (`src/components/azores/chat-widget.tsx`)

**Ver documentação completa em [Maria da Terra](#-assistente-ia--maria-da-terra)**

### Footer (`src/components/azores/footer.tsx`)

**Props:**
```typescript
interface FooterProps {
  onViewChange: (view: AppView) => void
}
```

**Layout:** 4 colunas → marca, navegação, legal, contacto. Bottom bar com copyright + "Feito com ❤️ nos Açores".

---

## 📱 Responsividade

### Breakpoints

| Breakpoint | Largura | Layout |
|---|---|---|
| **Mobile** | 320–639px | 1 coluna, menu hamburger, cards empilhados |
| **Tablet** | 640–1023px | 2 colunas, sidebar cart |
| **Desktop** | 1024px+ | 3–4 colunas, navegação completa |

### Otimizações Mobile Implementadas

| Técnica | Implementação |
|---|---|
| **Touch targets** | `min-h-[44px] min-w-[44px]` em todos os botões interativos |
| **touch-manipulation** | Previne double-tap zoom em botões |
| **Safe areas iOS** | `env(safe-area-inset-bottom)` para home indicator |
| **Overscroll containment** | Chat e cart: `overscroll-contain` |
| **viewport-fit: cover** | Suporte a notch e cantos arredondados |
| **Chat full-screen** | No mobile, chat ocupa 90vh com `inset-2` |
| **Responsive grid** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| **Hidden labels** | Textos ocultos em mobile: `hidden sm:inline` |
| **Card layouts** | Tabelas → Cards em mobile: `hidden md:block` / `md:hidden` |

### Breakpoints Testados

- 320px (iPhone SE 1st gen)
- 375px (iPhone padrão / iPhone 12 Mini)
- 428px (iPhone 14 Pro Max)
- 768px (iPad / iPad Mini)
- 1024px (iPad Pro / laptop)
- 1440px (desktop standard)
- 1920px (desktop wide)

---

## 🔍 SEO e Indexação

### Metadata Implementada (`layout.tsx`)

| Metadado | Valor |
|---|---|
| **Title template** | `"%s \| Azores Essence"` |
| **Default title** | `"Azores Essence — Sabores Autênticos dos Açores"` |
| **Description** | 160 chars com keywords |
| **Keywords** | 19 termos (Açores, queijo São Jorge, vinho do Pico, etc.) |
| **OpenGraph** | Completo com imagem hero (1344×768) |
| **Twitter Card** | `summary_large_image` |
| **Canonical URL** | `https://azoresessence.pt` |
| **HREFLANG** | `pt-PT` e `en` |
| **Robots** | index, follow, max-image-preview: large |
| **Authors** | Azores Meet, Lda |
| **Category** | shopping |

### Ficheiros SEO

| Ficheiro | Função |
|---|---|
| `/public/robots.txt` | Permite crawl, bloqueia `/api/`, referencia sitemap |
| `/public/sitemap.xml` | URL raiz com prioridade 1.0, changefreq weekly |
| `/public/manifest.json` | PWA manifest (theme: #059669, name: Azores Essence) |

### Favicon e Logo

| Tamanho | Uso |
|---|---|
| 32×32 | Favicon padrão |
| 180×180 | Apple Touch Icon |
| 192×192 | Android Chrome |
| MS Tile | Cor #059669 |

### Meta Tags Especiais (no `<head>`)

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Azores Essence" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="application-name" content="Azores Essence" />
<meta name="msapplication-TileImage" content="/azores-logo.png" />
<meta name="msapplication-TileColor" content="#059669" />
```

---

## ⚖️ Legal (RGPD 2026)

### Política de Privacidade

| Item | Detalhe |
|---|---|
| **Empresa** | Azores Meet, Lda (NIF: 513553169) |
| **Dados recolhidos** | Nome, NIF, Morada, E-mail (processamento de encomendas) |
| **Processamento** | Atlas Core (encriptado, não armazenado nos servidores) |
| **Conservação** | 10 anos (exigência fiscal portuguesa — Art.º 29.º CIVA) |
| **Direitos** | Acesso, retificação, eliminação via geral@azoresmeet.pt |
| **Reclamações** | CNPD (Comissão Nacional de Proteção de Dados) |
| **Base legal** | Contrato (Art.º 6.º n.º 1 al. b) RGPD) + Obrigação legal (Art.º 6.º n.º 1 al. c) RGPD) |

### Termos e Condições

| Item | Detalhe |
|---|---|
| **Objeto** | Venda de produtos alimentares e lifestyle açorianos |
| **IVA** | Incluído à taxa legal dos Açores (18% reduced) |
| **Envio** | Hub em Portugal Continental ou Açores (3-5 dias UE) |
| **Portes** | Grátis ≥50€, 4.99€ <50€ |
| **Devolução** | 14 dias apenas para produtos não perecíveis com selo intacto |
| **Pagamentos** | Atlas Core (Cartões, MB WAY, Multibanco, SEPA) |
| **Foro** | Comarca de Ponta Delgada, Açores |

---

## 💳 Pagamentos — Atlas Core

### Integração Planeada

```
CheckoutFlow → POST /api/orders
        │
        ▼
Atlas Core API (a implementar)
        │
        ├── Cartão de Crédito/Débito (Visa, Mastercard, Maestro)
        ├── MB WAY (SIBS)
        ├── Multibanco (referência)
        └── SEPA Transfer
        │
        ▼
Webhook de confirmação
        │
        ▼
Order.status = "pago"
```

> 📝 **Estado atual:** O checkout está funcional com simulação de pagamento. A integração real com Atlas Core requer a API key (`ATLAS_CORE_API_KEY`) e implementação do webhook.

---

## 🚢 Deploy (Vercel)

### Passos

1. Conectar repositório GitHub à Vercel
2. Configurar variáveis de ambiente no painel
3. Deploy automático a cada push na branch `main`

### Variáveis Necessárias na Vercel

```
DATABASE_URL=file:./db/custom.db
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026
ADMIN_SECRET=azores-essence-secret-key-2026
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ATLAS_CORE_API_KEY=
NEXT_PUBLIC_SITE_URL=https://azoresessence.pt
```

### Notas de Deploy

- **Output:** `standalone` (configurado em `next.config.ts`)
- **Runtime:** Node.js 18+
- **BD:** SQLite em disco (migrar para Supabase para produção multi-instância)
- **Imagens:** Servidas de `/public` (otimizadas pelo Next.js Image)
- **SSL:** Automático via Vercel

---

## 🗺 Roadmap

### v1.0 (Atual) ✅
- [x] Catálogo de produtos com filtros
- [x] Carrinho de compras (Zustand)
- [x] Checkout 3 passos
- [x] Maria da Terra AI chatbot
- [x] Admin dashboard com autenticação HMAC
- [x] SEO completo (OG, robots, sitemap, manifest)
- [x] Responsivo (mobile/tablet/desktop)
- [x] RGPD 2026 compliant

### v1.1 (Próximo)
- [ ] Integração real Atlas Core (pagamentos)
- [ ] Webhook de confirmação de pagamento
- [ ] CRUD completo de produtos no admin
- [ ] Atualização de status de encomendas
- [ ] Geração de faturas PDF

### v1.2
- [ ] Migração SQLite → Supabase (PostgreSQL + RLS)
- [ ] Supabase Storage para imagens
- [ ] Autenticação de clientes (NextAuth.js)
- [ ] Perfis de cliente com histórico

### v1.3
- [ ] Scraper azores.bio para catálogo completo
- [ ] Descrições reescritas por LLM (Maria da Terra)
- [ ] Multi-idioma completo (PT/EN/FR/DE)
- [ ] Reviews e ratings de produtos

### v2.0
- [ ] App mobile (React Native / Expo)
- [ ] Notificações push
- [ ] Programa de fidelidade
- [ ] Dashboard analytics avançado

---

## 📞 Suporte

| Canal | Contacto |
|---|---|
| E-mail | geral@azoresmeet.pt |
| Telefone | +351 295 000 000 |
| GitHub | [AtlasGlobalCore/azores-essence-webstore](https://github.com/AtlasGlobalCore/azores-essence-webstore) |
| Empresa | Azores Meet, Lda — NIF: 513553169 |

---

**Feito com ❤️ nos Açores** — © 2026 Azores Meet, Lda (NIF: 513553169)
