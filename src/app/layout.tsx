import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#059669",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://azoresessence.pt"),
  title: {
    default: "Azores Essence — Sabores Autênticos dos Açores",
    template: "%s | Azores Essence",
  },
  description:
    "Descubra queijos, vinhos, méis e tesouros das nove ilhas dos Açores. Produtos artesanais cultivados em solo vulcânico, banhados pelo Atlântico. A essência dos Açores, entregue em sua casa.",
  keywords: [
    "Açores",
    "Azores",
    "queijo São Jorge",
    "vinho do Pico",
    "mel açoriano",
    "produtos portugueses",
    "artesanal",
    "DOP",
    "Gorreana",
    "ananás",
    "Azores Essence",
    "comprar produtos Açores",
    "encomendar Açores",
    "linguiça Terceira",
    "chá Gorreana",
    "produtos típicos Açores",
    "regional Açores",
    "presente Açores",
    "gastronomia açoriana",
  ],
  authors: [{ name: "Azores Meet, Lda", url: "https://azoresessence.pt" }],
  creator: "Azores Meet, Lda",
  publisher: "Azores Meet, Lda",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://azoresessence.pt",
    siteName: "Azores Essence",
    title: "Azores Essence — Sabores Autênticos dos Açores",
    description:
      "Produtos artesanais das nove ilhas dos Açores, do meio do Atlântico para a sua mesa.",
    images: [
      {
        url: "/products/hero-azores.png",
        width: 1344,
        height: 768,
        alt: "Paisagem vulcânica dos Açores - Azores Essence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Azores Essence — Sabores Autênticos dos Açores",
    description: "Produtos artesanais das nove ilhas dos Açores.",
    images: ["/products/hero-azores.png"],
  },
  alternates: {
    canonical: "https://azoresessence.pt",
    languages: {
      "pt-PT": "https://azoresessence.pt",
      en: "https://azoresessence.pt/?lang=en",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/azores-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/azores-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/azores-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Azores Essence" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Azores Essence" />
        <meta
          name="msapplication-TileImage"
          content="/azores-logo.png"
        />
        <meta name="msapplication-TileColor" content="#059669" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
