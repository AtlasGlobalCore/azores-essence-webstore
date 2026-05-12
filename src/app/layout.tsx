import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Azores Essence — Sabores Autênticos dos Açores",
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
    "enanás",
  ],
  authors: [{ name: "Azores Meet, Lda" }],
  icons: {
    icon: "/azores-logo.png",
  },
  openGraph: {
    title: "Azores Essence — Sabores Autênticos dos Açores",
    description:
      "Produtos artesanais das nove ilhas dos Açores, do meio do Atlântico para a sua mesa.",
    url: "https://azoresessence.pt",
    siteName: "Azores Essence",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
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
