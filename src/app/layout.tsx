import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { ThemeProvider } from "@/components/theme-provider";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { ADSENSE_CLIENT } from "@/data/ads";
import { SITE_URL } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITULO = "Calculadora de Pontos e Milhas Grátis — Compensa?";
const DESCRICAO =
  "Calculadora de pontos e milhas grátis: descubra quanto vale o seu ponto, se compensa comprar milhas, assinar clube Livelo/Smiles/LATAM Pass ou pagar anuidade de cartão. Conta aberta, fonte e data em cada número.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO,
    template: "%s — Compensa?",
  },
  description: DESCRICAO,
  keywords: [
    "calculadora de pontos e milhas",
    "calculadora de milhas",
    "valor do ponto",
    "valor da milha",
    "quanto vale o milheiro",
    "CPM custo por milheiro",
    "compra de pontos",
    "clube de pontos",
    "clube Livelo",
    "clube Smiles",
    "bônus de transferência",
    "cashback ou pontos",
    "anuidade de cartão vale a pena",
  ],
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  // Verificação do site no painel AdSense (meta tag google-adsense-account).
  other: ADSENSE_CLIENT ? { "google-adsense-account": ADSENSE_CLIENT } : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Compensa?",
    title: TITULO,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRICAO,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.99 0.003 250)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.16 0.012 255)" },
  ],
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Compensa? — Calculadora de pontos e milhas",
      alternateName: "Compensa?",
      url: SITE_URL,
      inLanguage: "pt-BR",
    },
    {
      "@type": "SoftwareApplication",
      name: "Compensa? — Calculadora de pontos e milhas",
      url: SITE_URL,
      description: DESCRICAO,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
      },
      inLanguage: "pt-BR",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* JSON-LD no body: o React iça <script async src> (AdSense) para o <head>
            e, com um script inline lá, a ordem servidor/cliente diverge na hidratação. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Shell>{children}</Shell>
        </ThemeProvider>
        <AdSenseScript />
      </body>
    </html>
  );
}
