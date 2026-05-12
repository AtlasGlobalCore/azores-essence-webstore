# 🌋 Azores Essence — Webstore

> Sabores Autênticos dos Açores — Do meio do Atlântico para a sua mesa.

Plataforma de e-commerce para produtos artesanais açorianos, desenvolvida com Next.js 16, TypeScript e inteligência artificial. Operada pela **Azores Meet, Lda** (NIF: 513553169).

---

## 📋 Índice

- [Arquitetura](#-arquitetura)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Setup](#-instalação-e-setup)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Base de Dados (Prisma)](#-base-de-dados-prisma)
- [API Routes](#-api-routes)
- [CRM e Painel Admin](#-crm-e-painel-admin)
- [Assistente IA — Maria da Terra](#-assistente-ia--maria-da-terra)
- [Layout e Navegação](#-layout-e-navegação)
- [Responsividade](#-responsividade)
- [SEO e Indexação](#-seo-e-indexação)
- [Legal (RGPD)](#-legal-rgpd)
- [Deploy (Vercel)](#-deploy-vercel)
- [Gestão de Credenciais Admin](#-gestão-de-credenciais-admin)

---

## 🏗 Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   AZORES ESSENCE                     │
│                   (Next.js 16)                       │
├──────────┬──────────┬──────────┬────────────────────┤
│  Client  │  Server  │   API    │     Database       │
│  (React) │  (SSR)   │  Routes  │   (SQLite/Prisma)  │
├──────────┼──────────┼──────────┼────────────────────┤
│ Zustand  │ Metadata │ /products│    Products        │
│ Cart     │ Viewport │ /orders  │    Profiles        │
│ UI Views │ SEO      │ /chat    │    Orders          │
│ Chat     │ Manifest │ /admin/* │    OrderItems      │
│ Checkout │ robots   │ /seed    │    Invoices        │
└──────────┴──────────┴──────────┴────────────────────┘
         │                        │
         ▼                        ▼
  z-ai-web-dev-sdk          Prisma Client
  (Maria da Terra AI)       (SQLite Database)
```

A aplicação é uma **SPA (Single Page Application)** com vista gerida por estado (`AppView`), sem necessidade de rotas dinâmicas. Toda a navegação ocorre no cliente, com APIs REST para comunicação com o servidor.

---

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Uso |
|---|---|---|
| **Next.js** | 16 | Framework principal (App Router) |
| **TypeScript** | 5 | Linguagem |
| **Tailwind CSS** | 4 | Estilização |
| **shadcn/ui** | New York | Componentes UI |
| **Prisma ORM** | 6 | Base de dados (SQLite) |
| **Zustand** | 5 | Estado do carrinho |
| **TanStack Query** | 5 | Estado do servidor (Admin) |
| **Framer Motion** | 12 | Animações |
| **z-ai-web-dev-sdk** | 0.0.17+ | Maria da Terra AI |
| **Lucide React** | 0.525+ | Ícones |
| **React Hook Form** | 7 | Formulários |

---

## 📁 Estrutura do Projeto

```
azores-essence-webstore/
├── prisma/
│   └── schema.prisma          # Schema da BD (5 models)
├── db/
│   └── custom.db              # SQLite database
├── public/
│   ├── products/              # Imagens dos produtos (AI-generated)
│   │   ├── queijo-sao-jorge.png
│   │   ├── vinho-pico.png
│   │   ├── mel-flores.png
│   │   ├── ananas-saomiguel.png
│   │   ├── cha-gorreana.png
│   │   ├── linguica-terceira.png
│   │   └── hero-azores.png
│   ├── azores-logo.png        # Logo da marca
│   ├── manifest.json          # PWA manifest
│   ├── robots.txt             # SEO crawling
│   └── sitemap.xml            # SEO indexação
├── src/
│   ├── app/
│   │   ├── page.tsx           # Página principal (SPA router)
│   │   ├── layout.tsx         # Root layout + SEO metadata
│   │   ├── globals.css        # CSS global + utilities
│   │   └── api/
│   │       ├── products/route.ts
│   │       ├── orders/route.ts
│   │       ├── chat/route.ts
│   │       ├── seed/route.ts
│   │       └── admin/
│   │           ├── auth/route.ts
│   │           └── verify/route.ts
│   ├── components/
│   │   ├── azores/
│   │   │   ├── header.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── product-catalog.tsx
│   │   │   ├── cart-sidebar.tsx
│   │   │   ├── checkout-flow.tsx
│   │   │   ├── chat-widget.tsx
│   │   │   ├── admin-login.tsx
│   │   │   ├── admin-dashboard.tsx
│   │   │   ├── privacy-policy.tsx
│   │   │   ├── terms-and-conditions.tsx
│   │   │   └── footer.tsx
│   │   ├── ui/                # shadcn/ui components
│   │   └── providers.tsx      # QueryClientProvider
│   ├── stores/
│   │   └── cart-store.ts      # Zustand cart state
│   ├── lib/
│   │   ├── products.ts        # Types, constants, sample data
│   │   ├── db.ts              # Prisma client
│   │   └── utils.ts           # Utility functions
│   └── hooks/
│       ├── use-toast.ts
│       └── use-mobile.ts
├── .env                       # Variáveis de ambiente
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Instalação e Setup

### Pré-requisitos
- **Node.js** 18+ ou **Bun** 1.0+
- **Git**

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/AtlasGlobalCore/azores-essence-webstore.git
cd azores-essence-webstore

# Instalar dependências
bun install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as suas chaves (ver secção abaixo)

# Inicializar a base de dados
bun run db:push

# Semear com produtos de exemplo
curl -X POST http://localhost:3000/api/seed

# Iniciar o servidor de desenvolvimento
bun run dev
```

### Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `bun run dev` | Servidor de desenvolvimento (porta 3000) |
| `bun run build` | Build de produção |
| `bun run lint` | Verificação ESLint |
| `bun run db:push` | Sincronizar schema Prisma com a BD |
| `bun run db:generate` | Gerar Prisma Client |

---

## 🔐 Variáveis de Ambiente

Criar ficheiro `.env` na raiz do projeto:

```env
# ═══════════════════════════════════════════
# BASE DE DADOS
# ═══════════════════════════════════════════
DATABASE_URL=file:./db/custom.db

# ═══════════════════════════════════════════
# ADMIN — Autenticação ID:Senha
# Formato: id1:senha1,id2:senha2,id3:senha3
# Pode adicionar quantos utilizadores quiser
# ═══════════════════════════════════════════
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026
ADMIN_SECRET=azores-essence-secret-key-2026

# ═══════════════════════════════════════════
# SUPABASE (Produção)
# ═══════════════════════════════════════════
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# ═══════════════════════════════════════════
# ATLAS CORE — Pagamentos
# ═══════════════════════════════════════════
ATLAS_CORE_API_KEY=

# ═══════════════════════════════════════════
# OPENROUTER — Maria da Terra AI
# ═══════════════════════════════════════════
OPENROUTER_API_KEY=

# ═══════════════════════════════════════════
# SITE
# ═══════════════════════════════════════════
NEXT_PUBLIC_SITE_URL=https://azoresessence.pt
```

---

## 💾 Base de Dados (Prisma)

### Schema (5 Models)

```prisma
Product        # Produtos do catálogo
Profile        # Clientes / utilizadores
Order          # Encomendas
OrderItem      # Itens de cada encomenda
Invoice        # Faturas
```

### Modelos Detalhados

#### Product
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | ID único |
| `namePt` / `nameEn` | String | Nome em PT/EN |
| `descriptionPt` / `descriptionEn` | String? | Descrição |
| `price` | Float | Preço em EUR |
| `currency` | String | Moeda (default: EUR) |
| `stockQuantity` | Int | Stock disponível |
| `island` | String? | Ilha de origem |
| `category` | String? | Categoria |
| `imageUrl` | String? | Caminho da imagem |
| `isActive` | Boolean | Produto ativo |

#### Order
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | ID único |
| `profileId` | String? | Ref. ao perfil |
| `totalAmount` | Float | Valor total |
| `status` | String | pendente / pago / enviado / cancelado |
| `paymentRef` | String? | Referência Atlas Core |
| `billingData` | String? | JSON com dados faturação |

### Comandos Úteis

```bash
# Reset completo da BD
bun run db:push --force-reset

# Semear produtos
curl -X POST http://localhost:3000/api/seed

# Ver dados com Prisma Studio
npx prisma studio
```

---

## 🔌 API Routes

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/products` | Listar produtos ativos |
| `POST` | `/api/products` | Criar produto |

### Encomendas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/orders` | Listar encomendas (com itens) |
| `POST` | `/api/orders` | Criar encomenda (+ atualiza stock) |

### Chat (Maria da Terra)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/chat` | Enviar mensagem à IA |

**Body:**
```json
{
  "message": "Que produtos têm do Pico?",
  "history": [
    { "role": "user", "content": "Olá" },
    { "role": "assistant", "content": "Seja bem-vindo!" }
  ],
  "systemPrompt": "..."
}
```

### Admin Auth

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/admin/auth` | Autenticar (ID + Senha) |
| `POST` | `/api/admin/verify` | Verificar token |

**Auth body:**
```json
{ "id": "admin", "senha": "azores2026" }
```

**Auth response (sucesso):**
```json
{ "success": true, "token": "base64(id:timestamp:hmac-signature)" }
```

### Seed

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/seed` | Popular BD com 6 produtos exemplo |

---

## 📊 CRM e Painel Admin

### Como Aceder

1. Clique em **"Admin"** na navegação (ou no footer)
2. Será apresentado o ecrã de login
3. Insira o **Identificador** e a **Senha** definidos em `ADMIN_CREDENTIALS`
4. Após autenticação, acede ao painel completo

### Credenciais Padrão

| ID | Senha | Perfil |
|---|---|---|
| `admin` | `azores2026` | Administrador principal |
| `geral` | `essence2026` | Gestor operacional |

> ⚠️ **Alterar as senhas em produção!** Edite a variável `ADMIN_CREDENTIALS` no `.env` e faça redeploy.

### Funcionalidades do Admin

| Secção | Funcionalidade |
|---|---|
| **Dashboard** | 4 cards de estatísticas (Produtos, Encomendas, Receita, Conversão) |
| **Produtos** | Tabela com imagem, nome, ilha, categoria, preço, stock, estado |
| **Encomendas** | Tabela com ID, data, total, itens, estado (pendente/pago/enviado/cancelado), ref. pagamento |
| **Logout** | Botão no canto superior direito para sair da sessão |

### Adicionar Novos Utilizadores Admin

Editar o `.env`:

```env
# Formato: id1:senha1,id2:senha2,id3:senha3
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026,novo:senhanova
```

Após alterar, reiniciar o servidor (`bun run dev`).

### Segurança

- Tokens são **HMAC-SHA256 assinados** com `ADMIN_SECRET`
- Tokens expiram após **24 horas**
- Tokens são armazenados em `localStorage`
- A verificação é feita em cada acesso ao admin
- Credenciais nunca são expostas ao cliente

---

## 🤖 Assistente IA — Maria da Terra

A Maria da Terra é a assistente virtual da Azores Essence, com personalidade açoriana autêntica.

### Características

| Atributo | Detalhe |
|---|---|
| **Personalidade** | Mulher açoriana, orgulhosa, hospitaleira e sábia |
| **Expressões** | "Seja bem-vindo, menino(a)", "Está um dia de bruma", "Isso é que é um queijinho de primeira" |
| **Idiomas** | PT (principal), EN, FR, DE |
| **Conhecimento** | Catálogo de produtos, envio, pagamentos, empresa |
| **Motor** | z-ai-web-dev-sdk (LLM) |

### Funcionamento Técnico

1. O utilizador clica no botão flutuante (canto inferior direito)
2. A janela de chat abre com mensagem de boas-vindas
3. Cada mensagem é enviada para `/api/chat`
4. O histórico da conversa é mantido no cliente
5. O `systemPrompt` inclui toda a informação dos produtos e regras

### Personalização

Para alterar a personalidade, edite a constante `MARIA_SYSTEM_PROMPT` em:
`/src/components/azores/chat-widget.tsx`

---

## 🧭 Layout e Navegação

A aplicação é uma **SPA com 6 vistas** geridas por estado:

| Vista | Componente | Descrição |
|---|---|---|
| `home` | HeroSection + ProductCatalog | Landing page com hero e catálogo |
| `products` | ProductCatalog | Catálogo completo com filtros |
| `checkout` | CheckoutFlow | 3 passos: Faturação → Pagamento → Confirmação |
| `privacy` | PrivacyPolicy | Política RGPD 2026 |
| `terms` | TermsAndConditions | Termos e Condições de Venda |
| `admin` | AdminLogin / AdminDashboard | Painel de gestão (protegido) |

### Componentes Globais

| Componente | Descrição |
|---|---|
| **Header** | Navegação sticky com logo, menu, carrinho |
| **Footer** | 4 colunas: marca, navegação, legal, contacto |
| **CartSidebar** | Sheet lateral com itens, quantidades, total |
| **ChatWidget** | Botão flutuante + janela de chat com Maria da Terra |

---

## 📱 Responsividade

O site é otimizado para todos os dispositivos:

| Breakpoint | Largura | Layout |
|---|---|---|
| **Mobile** | 320-639px | 1 coluna, menu hamburger, cards empilhados |
| **Tablet** | 640-1023px | 2 colunas, sidebar cart |
| **Desktop** | 1024px+ | 3-4 colunas, navegação completa |

### Otimizações Mobile

- **Touch targets**: Mínimo 44px em todos os botões interativos
- **touch-manipulation**: Previne double-tap zoom em botões
- **Safe areas**: `env(safe-area-inset-bottom)` para iOS com home indicator
- **Overscroll containment**: Chat e cart não propagam scroll
- **viewport-fit: cover**: Suporte a notch e cantos arredondados
- **Chat full-screen**: No mobile, o chat ocupa quase todo o ecrã (90vh)

### Breakpoints Testados

- 320px (iPhone SE)
- 375px (iPhone padrão)
- 428px (iPhone Pro Max)
- 768px (iPad)
- 1024px (iPad Pro / laptop)
- 1440px (desktop)

---

## 🔍 SEO e Indexação

### Metadata Implementada

- **Title template**: `"%s | Azores Essence"`
- **19 keywords** incluindo termos de busca longa
- **OpenGraph** completo com imagem hero (1344×768)
- **Twitter Card**: `summary_large_image`
- **Canonical URL**: `https://azoresessence.pt`
- **HREFLANG**: `pt-PT` e `en`
- **Robots**: index, follow, max-image-preview: large

### Ficheiros SEO

| Ficheiro | Função |
|---|---|
| `/public/robots.txt` | Permite crawl, bloqueia `/api/`, referencia sitemap |
| `/public/sitemap.xml` | URL raiz com prioridade 1.0 |
| `/public/manifest.json` | PWA manifest (theme: #059669) |

### Favicon e Logo

- **Favicon**: `/public/azores-logo.png` (32×32 e 192×192)
- **Apple Touch Icon**: 180×180
- **MS Tile**: Configurado com cor #059669

---

## ⚖️ Legal (RGPD)

### Política de Privacidade

- **Empresa**: Azores Meet, Lda (NIF: 513553169)
- **Dados recolhidos**: Nome, NIF, Morada, E-mail (processamento de encomendas)
- **Processamento**: Atlas Core (encriptado, não armazenado nos servidores)
- **Conservação**: 10 anos (exigência fiscal portuguesa — Art.º 29.º CIVA)
- **Direitos**: Acesso, retificação, eliminação via geral@azoresmeet.pt
- **Reclamações**: CNPD

### Termos e Condições

- **Objeto**: Venda de produtos alimentares e lifestyle açorianos
- **IVA**: Incluído à taxa legal dos Açores
- **Envio**: Hub em Portugal Continental ou Açores (3-5 dias UE)
- **Devolução**: 14 dias apenas para produtos não perecíveis com selo intacto
- **Pagamentos**: Atlas Core (Cartões, MB WAY, Multibanco, SEPA)

---

## 🚢 Deploy (Vercel)

### Passos

1. Conectar repositório GitHub à Vercel
2. Configurar variáveis de ambiente no painel
3. Deploy automático a cada push na branch `main`

### Variáveis Necessárias na Vercel

```
DATABASE_URL=
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026
ADMIN_SECRET=azores-essence-secret-key-2026
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ATLAS_CORE_API_KEY=
OPENROUTER_API_KEY=
NEXT_PUBLIC_SITE_URL=https://azoresessence.pt
```

---

## 🔑 Gestão de Credenciais Admin

### Formato

```
ADMIN_CREDENTIALS=id1:senha1,id2:senha2,id3:senha3
```

### Adicionar Novo Utilizador

```bash
# Editar .env
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026,maria:maria2026

# Reiniciar servidor
bun run dev
```

### Remover Utilizador

```bash
# Remover do .env
ADMIN_CREDENTIALS=admin:azores2026,geral:essence2026

# Reiniciar
bun run dev
```

### Alterar Senha

```bash
# Alterar no .env
ADMIN_CREDENTIALS=admin:novaSenha2026,geral:essence2026

# Reiniciar
bun run dev
```

> 📝 Nota: Sessões atativas (tokens em localStorage) expiram após 24h. Após alterar credenciais, utilizadores com sessões antigas terão de voltar a autenticar-se.

---

## 📞 Suporte

| Canal | Contacto |
|---|---|
| E-mail | geral@azoresmeet.pt |
| Telefone | +351 295 000 000 |
| GitHub | [AtlasGlobalCore/azores-essence-webstore](https://github.com/AtlasGlobalCore/azores-essence-webstore) |

---

**Feito com ❤️ nos Açores** — © 2026 Azores Meet, Lda (NIF: 513553169)
