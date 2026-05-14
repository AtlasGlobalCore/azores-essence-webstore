# 🌿 AZORES.BIO — Premium E-Commerce Webstore

> Plataforma e-commerce premium de produtos artesanais dos Açores, migrada de Vite+Express para **Next.js 16 App Router**, otimizada para deploy na Vercel.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Migração Vite → Next.js](#migração-vite--nextjs)
- [Arquitetura](#arquitetura)
- [Tech Stack](#tech-stack)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Base de Dados (Prisma ORM)](#base-de-dados-prisma-orm)
- [API Routes (Next.js App Router)](#api-routes-nextjs-app-router)
- [Frontend — Páginas & Componentes](#frontend--páginas--componentes)
- [Internacionalização (i18n)](#internacionalização-i18n)
- [Multimoeda](#multimoeda)
- [Assistente AI — Maria da Terra](#assistente-ai--maria-da-terra)
- [Pagamentos — Stripe](#pagamentos--stripe)
- [Carrinho & Checkout](#carrinho--checkout)
- [Design System — Organic Boutique](#design-system--organic-boutique)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Instalação & Desenvolvimento](#instalação--desenvolvimento)
- [Deploy na Vercel](#deploy-na-vercel)
- [Entidade Legal](#entidade-legal)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## Visão Geral

**AZORES.BIO** é uma loja online premium que comercializa produtos artesanais das 9 ilhas dos Açores (Portugal). A plataforma oferece:

- **26+ produtos** em **12 categorias** (queijos DOP, vinhos do Pico, chá Gorreana, conservas, licores, etc.)
- **4 idiomas** — PT 🇵🇹 | EN 🇬🇧 | FR 🇫🇷 | DE 🇩🇪
- **3 moedas** — EUR € | USD $ | GBP £
- **Carrinho persistente** com localStorage
- **Checkout em 4 passos** com emissão automática de fatura
- **Assistente AI** "Maria da Terra" com LLM integrado
- **Pagamentos Stripe** (Payment Intents)
- **Design Organic Boutique** — tipografia Playfair Display + Inter + Cormorant Garamond

---

## Migração Vite → Next.js

Este projeto foi originalmente desenvolvido com **Vite + Express + tRPC + Drizzle ORM (MySQL)** e foi completamente migrado para **Next.js 16 App Router + Prisma ORM (SQLite)**:

| Aspecto | Antes (Vite) | Depois (Next.js) |
|---------|-------------|-------------------|
| **Framework** | Vite + React | Next.js 16 App Router |
| **Servidor** | Express.js | Next.js API Routes |
| **API** | tRPC (httpBatchLink) | REST API (NextResponse) |
| **ORM** | Drizzle ORM (MySQL) | Prisma ORM (SQLite) |
| **Roteamento** | wouter | Next.js File-based Routing |
| **Estado servidor** | Express middleware | Next.js Route Handlers |
| **Build** | vite build + esbuild | next build |
| **Deploy** | VPS / Docker | **Vercel** (serverless) |
| **SSR** | Não (SPA) | Sim (App Router) |

### Principais mudanças na migração:

1. **Roteamento**: `wouter` → Next.js App Router (`/app/[route]/page.tsx`)
2. **API**: tRPC procedures → REST API Routes (`/app/api/[route]/route.ts`)
3. **Data fetching**: `trpc.useQuery()` → `fetch()` + `useState/useEffect`
4. **Base de dados**: Drizzle + MySQL → Prisma + SQLite (facilmente adaptável para PostgreSQL/MySQL)
5. **Imagens**: `next/image` com `remotePatterns` para Unsplash
6. **Navegação**: `<Link href>` do Next.js substitui `<Link href>` do wouter
7. **404**: `not-found.tsx` nativo do Next.js

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     VERCEL (Edge/Serverless)                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │   Next.js    │   │  API Routes  │   │  Prisma ORM    │  │
│  │  App Router  │──▶│  (REST)      │──▶│  (SQLite/PG)   │  │
│  │  (SSR/CSR)  │   │              │   │                │  │
│  └──────┬──────┘   └──────┬───────┘   └────────────────┘  │
│         │                  │                                  │
│  ┌──────▼──────┐   ┌──────▼───────┐                        │
│  │  React UI   │   │  z-ai-sdk    │                        │
│  │  Components │   │  (LLM Chat)  │                        │
│  └─────────────┘   └──────────────┘                        │
│                                                             │
│  ┌──────────────────────────────────┐                       │
│  │  Stripe API (Payment Intents)   │                       │
│  └──────────────────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **Next.js** | 16.x | Framework React com App Router |
| **React** | 19.x | UI Library |
| **TypeScript** | 5.x | Type Safety |
| **Prisma ORM** | 6.x | Database ORM (SQLite → PostgreSQL) |
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **shadcn/ui** | latest | Component library (New York style) |
| **Lucide React** | latest | Icon library |
| **Framer Motion** | 12.x | Animations |
| **TanStack Query** | 5.x | Server state management |
| **Zod** | 4.x | Schema validation |
| **Stripe** | 22.x | Payment processing |
| **Sonner** | 2.x | Toast notifications |
| **z-ai-web-dev-sdk** | latest | AI chat integration (Maria da Terra) |
| **next-themes** | 0.4.x | Dark/Light mode |
| **nanoid** | 5.x | Unique ID generation |

---

## Estrutura do Projeto

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (Navbar + Footer + Providers)
│   ├── page.tsx                  # Homepage (Hero, Featured, Categories)
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Global styles + AZORES.BIO theme
│   ├── about/page.tsx            # About page
│   ├── store/page.tsx            # Store page (filter, sort, search)
│   ├── product/[id]/page.tsx     # Product detail page
│   ├── checkout/page.tsx         # Checkout flow (4 steps)
│   └── api/                      # REST API Routes
│       ├── categories/route.ts
│       ├── chat/route.ts
│       ├── orders/route.ts
│       ├── orders/[orderNumber]/route.ts
│       ├── products/route.ts
│       ├── products/[id]/route.ts
│       ├── products/featured/route.ts
│       └── stripe/payment-intent/route.ts
│
├── components/
│   ├── Navbar.tsx                # Fixed navbar (lang/currency selector)
│   ├── Footer.tsx                # 4-column footer
│   ├── CartDrawer.tsx            # Slide-in cart drawer
│   ├── ProductCard.tsx           # Product card with hover effects
│   ├── MariaChat.tsx             # AI chat assistant
│   ├── Providers.tsx             # QueryClient + StoreProvider
│   └── ui/                       # shadcn/ui components (50+)
│
├── contexts/
│   └── StoreContext.tsx          # Global state (cart, locale, currency, i18n)
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
└── lib/
    ├── db.ts                     # Prisma client singleton
    └── utils.ts                  # cn() utility

prisma/
└── schema.prisma                 # Database schema (6 models)

public/
└── logo.svg                      # Favicon/logo
```

---

## Base de Dados (Prisma ORM)

### Diagrama ER

```
┌─────────────┐       ┌──────────────────┐
│  Category   │1─────*│     Product       │
├─────────────┤       ├──────────────────┤
│ id (PK)     │       │ id (PK)          │
│ slug (UQ)   │       │ sku (UQ)         │
│ namePt      │       │ name / nameEn    │
│ nameEn      │       │ nameFr / nameDe  │
│ nameFr      │       │ description*4    │
│ nameDe      │       │ price            │
│ description │       │ compareAtPrice   │
│ imageUrl    │       │ stock            │
│ sortOrder   │       │ imageUrl         │
└─────────────┘       │ images (JSON)    │
                      │ weight / origin  │
                      │ featured / active│
                      │ tags (JSON)      │
                      └────────┬─────────┘
                               │
┌─────────────┐       ┌────────┴─────────┐
│   Invoice   │1─────1│      Order        │
├─────────────┤       ├──────────────────┤
│ invoiceNum  │       │ orderNumber (UQ)  │
│ issuerName  │       │ status            │
│ issuerVat   │       │ customerName      │
│ customerName│       │ customerEmail     │
│ customerEmail│      │ customerPhone/Vat │
│ subtotal    │       │ shippingAddress   │
│ tax / total │       │ shippingCity      │
│ currency    │       │ postalCode/Country│
│ pdfUrl      │       │ subtotal/total    │
│ status      │       │ shippingCost      │
└─────────────┘       │ currency / locale │
                      └────────┬─────────┘
                               │1─────*
                      ┌────────┴─────────┐
                      │    OrderItem      │
                      ├──────────────────┤
                      │ productId        │
                      │ productName      │
                      │ productSku       │
                      │ quantity         │
                      │ unitPrice        │
                      │ totalPrice       │
                      └──────────────────┘

┌──────────────────┐
│   ChatSession    │
├──────────────────┤
│ sessionId (UQ)   │
│ messages (JSON)  │
│ userId           │
└──────────────────┘
```

### Modelos Prisma (6 total)

| Modelo | Campos | Relações |
|--------|--------|----------|
| **Category** | 9 campos | 1:N → Product |
| **Product** | 20 campos | N:1 → Category |
| **Order** | 19 campos | 1:N → OrderItem, 1:1 → Invoice |
| **OrderItem** | 8 campos | N:1 → Order |
| **Invoice** | 15 campos | 1:1 → Order |
| **ChatSession** | 5 campos | — |

---

## API Routes (Next.js App Router)

### Produtos

| Método | Rota | Descrição | Parâmetros |
|--------|------|-----------|-----------|
| `GET` | `/api/products` | Lista produtos com filtros | `categorySlug`, `search`, `sort`, `limit`, `offset` |
| `GET` | `/api/products/:id` | Detalhe do produto | `id` (path) |
| `GET` | `/api/products/featured` | Produtos em destaque (max 8) | — |

### Categorias

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/categories` | Todas as categorias com contagem de produtos |

### Encomendas

| Método | Rota | Descrição | Body |
|--------|------|-----------|------|
| `POST` | `/api/orders` | Criar encomenda | `{ customerName, customerEmail, shippingAddress, items[] }` |
| `GET` | `/api/orders/:orderNumber` | Detalhe da encomenda | `orderNumber` (path) |

### Chat (AI)

| Método | Rota | Descrição | Body |
|--------|------|-----------|------|
| `POST` | `/api/chat` | Enviar mensagem à Maria da Terra | `{ sessionId, message, locale }` |

### Pagamentos

| Método | Rota | Descrição | Body |
|--------|------|-----------|------|
| `POST` | `/api/stripe/payment-intent` | Criar Payment Intent | `{ amount, currency, customerEmail, customerName }` |

---

## Frontend — Páginas & Componentes

### Páginas

| Rota | Ficheiro | Descrição |
|------|----------|-----------|
| `/` | `page.tsx` | Homepage com Hero, Valores, Produtos em Destaque, Categorias, About, CTA |
| `/store` | `store/page.tsx` | Loja com sidebar de categorias, pesquisa, ordenação, grid de produtos |
| `/product/:id` | `product/[id]/page.tsx` | Detalhe do produto com galeria, breadcrumbs, produtos relacionados |
| `/about` | `about/page.tsx` | Sobre a AZORES.BIO, missão, valores, entidade legal |
| `/checkout` | `checkout/page.tsx` | Checkout em 4 passos (Dados → Endereço → Confirmar → Confirmação) |
| `*` | `not-found.tsx` | Página 404 |

### Componentes Principais

| Componente | Descrição |
|-----------|-----------|
| **Navbar** | Navbar fixa com transparência → opaco no scroll, seletor de idioma/moeda, carrinho badge, menu mobile |
| **Footer** | 4 colunas (Marca, Loja, Informações, Contacto), linha dourada, dados legais |
| **CartDrawer** | Drawer lateral com overlay, barra de progresso envio gratuito, controles de quantidade, totais |
| **ProductCard** | Card com hover zoom, botão "Adicionar" que desliza para cima, badges (Destaque, -XX%, Esgotado) |
| **MariaChat** | Chat flutuante com janela 360x520px, mensagens com avatar "M", sugestões iniciais, loading spinner |
| **Providers** | QueryClientProvider + StoreProvider wrapper |

---

## Internacionalização (i18n)

Sistema de tradução client-side implementado no `StoreContext`:

- **4 idiomas**: PT (padrão), EN, FR, DE
- **120+ chaves de tradução** por idioma
- Detecção automática do idioma do navegador (`navigator.language`)
- Persistência em `localStorage` (`azoresbio-locale`)
- Nomes de categorias e produtos em 4 idiomas (campos `namePt/nameEn/nameFr/nameDe`)

### Funções auxiliares no StoreContext:

```typescript
t(key: string): string                  // Tradução por chave
getCategoryName(category): string       // Nome da categoria no idioma ativo
getProductName(product): string         // Nome do produto no idioma ativo
getProductDescription(product): string  // Descrição no idioma ativo
```

---

## Multimoeda

- **3 moedas**: EUR (padrão), USD, GBP
- Taxas de câmbio embutidas (atualizáveis):
  - EUR: 1.00 | USD: 1.08 | GBP: 0.86
- Conversão automática no carrinho e checkout
- Formatação com símbolo: `€12.50`, `$13.50`, `£10.75`
- Persistência em `localStorage` (`azoresbio-currency`)

---

## Assistente AI — Maria da Terra

Chat bot integrado com LLM via **z-ai-web-dev-sdk**:

- **Personalidade**: Açoriana orgulhosa, especialista em gastronomia
- **Conhecimento**: Catálogo completo, envios, entidade legal
- **Idiomas**: Responde no idioma do utilizador
- **Sessão**: Histórico persistido em BD (ChatSession)
- **Contexto**: Últimas 20 mensagens mantidas como contexto

```
User → POST /api/chat { sessionId, message, locale }
  → Load ChatSession from DB
  → Build messages array (system prompt + history)
  → Call z-ai-web-dev-sdk LLM
  → Save updated history to DB
  → Return assistant message
```

---

## Pagamentos — Stripe

Integração com Stripe Payment Intents:

1. Frontend envia dados do carrinho + valor total
2. `POST /api/stripe/payment-intent` cria o PaymentIntent
3. Retorna `clientSecret` para confirmação no client
4. Após confirmação, `POST /api/orders` cria a encomenda

---

## Carrinho & Checkout

### Carrinho (CartDrawer)

- Slide-in lateral com overlay
- Barra de progresso para envio gratuito (≥€75)
- Controles de quantidade (±) com limite de stock
- Remover item individual
- Cálculo automático de subtotal + envio + total
- Persistência em `localStorage` (`azoresbio-cart`)

### Checkout (4 Passos)

| Passo | Ícone | Conteúdo |
|-------|-------|----------|
| **1** | User | Nome, Email, Telefone, NIF |
| **2** | MapPin | Morada, Cidade, Código Postal, País |
| **3** | CreditCard | Confirmação + resumo |
| **4** | FileText | Confirmação com número de pedido e fatura |

- Validação por passo
- Criação de encomenda + fatura automática + decremento de stock (transação Prisma)
- Número de encomenda: `AZB-{timestamp}-{random4}`
- Número de fatura: `FAT-{year}-{orderId padded 6}`

---

## Design System — Organic Boutique

### Paleta de Cores

| Token | Hex | Uso |
|-------|-----|-----|
| `--azores-teal` | `#1a3a3a` | Cor primária (navbar, botões, badges) |
| `--azores-gold` | `#b8962e` | Cor de destaque (origem, badges, ícones) |
| `--azores-cream` | `#f8f5f0` | Fundo principal |
| `--azores-tan` | `#ede8e0` | Fundo secundário, borders |
| `--azores-muted` | `#6b6b6b` | Texto secundário |
| `--azores-dark` | `#3d3d3d` | Texto terciário |
| `--azores-gold-muted` | `#c8b89a` | Placeholder, ícones inativos |
| `--azores-cream-light` | `#f0ebe3` | Fundo de imagens |

### Tipografia

| Font | Uso | weights |
|------|-----|---------|
| **Playfair Display** | Títulos (h1-h6, serif) | 400, 500, 600, 700 |
| **Inter** | Corpo, navegação (sans) | 300, 400, 500, 600 |
| **Cormorant Garamond** | Subtítulos hero (display) | 300, 400, 500 |

### Componentes CSS Customizados

| Classe | Efeito |
|--------|--------|
| `.fade-in` | Animação fadeInUp (0.6s ease-out) |
| `.divider-gold` | Linha horizontal com gradiente dourado |
| `.product-hover` | Elevação + sombra no hover |
| `.btn-press` | Scale(0.97) no active |
| `.container` | Max-width 1280px, padding responsivo |

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `DATABASE_URL` | ✅ | URL da base de dados (SQLite: `file:./dev.db`) |
| `STRIPE_SECRET_KEY` | ❌ | Chave secreta Stripe para pagamentos |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ❌ | Chave pública Stripe (client-side) |
| `BUILT_IN_FORGE_API_KEY` | ❌ | API key para LLM (Maria da Terra chat) |

---

## Instalação & Desenvolvimento

### Pré-requisitos

- **Node.js** 18+ ou **Bun** 1.0+
- **Git**

### Setup

```bash
# 1. Clonar o repositório
git clone https://github.com/AtlasGlobalCore/azores-essence-webstore.git
cd azores-essence-webstore

# 2. Instalar dependências
bun install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as suas chaves

# 4. Inicializar a base de dados
bun run db:push

# 5. Iniciar o servidor de desenvolvimento
bun run dev
```

O servidor estará disponível em `http://localhost:3000`

### Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `bun run dev` | Servidor de desenvolvimento (port 3000) |
| `bun run build` | Build de produção |
| `bun run start` | Servidor de produção |
| `bun run lint` | Verificação de qualidade (ESLint) |
| `bun run db:push` | Push do schema Prisma para a BD |
| `bun run db:generate` | Gerar Prisma Client |
| `bun run db:migrate` | Criar e aplicar migrações |

---

## Deploy na Vercel

### Deploy Automático (Recomendado)

1. **Fork/Connect** este repositório no [Vercel Dashboard](https://vercel.com/new)
2. **Configurar variáveis de ambiente** no Vercel:
   - `DATABASE_URL` → URL da base de dados de produção (recomendado: PostgreSQL via Vercel Postgres)
   - `STRIPE_SECRET_KEY` → Chave Stripe de produção
   - `BUILT_IN_FORGE_API_KEY` → API key do LLM
3. **Deploy** — a Vercel detecta automaticamente o Next.js

### Para PostgreSQL em Produção

1. Atualizar `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Atualizar o schema para tipos nativos do PostgreSQL (ex: `Float` → `Decimal`, adicionar `@default(autoincrement())`)
3. Executar `bun run db:push` com a `DATABASE_URL` de produção

### Variáveis no Vercel

```
DATABASE_URL=postgresql://user:pass@host:5432/db
STRIPE_SECRET_KEY=sk_live_...
BUILT_IN_FORGE_API_KEY=...
```

---

## Entidade Legal

| Campo | Valor |
|-------|-------|
| **Razão Social** | Azores Meet, Lda |
| **NIF** | 513553169 |
| **Sede** | Macela, 9875-030 Santo Antão, Calheta (São Jorge), Açores, Portugal |
| **E-mail** | info@azores.bio |

---

## Roadmap

- [ ] **PostgreSQL** para produção na Vercel
- [ ] **NextAuth.js** para autenticação de utilizadores
- [ ] **Admin Dashboard** para gestão de produtos e encomendas
- [ ] **Webhooks Stripe** para confirmação automática de pagamentos
- [ ] **Envio de emails** (confirmação de encomenda, fatura PDF)
- [ ] **SEO avançado** com `generateMetadata` e sitemap dinâmico
- [ ] **Testes E2E** com Playwright
- [ ] **PWA** com Service Worker para experiência offline
- [ ] **Integração com transportadoras** (rastreamento de envios)
- [ ] **Programa de fidelização** (pontos por compra)

---

## Licença

MIT © Azores Meet, Lda

---

<p align="center">
  <strong>AZORES.BIO</strong> — O Sabor Autêntico dos Açores 🌿
</p>
