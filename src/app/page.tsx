import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Coins,
  CreditCard,
  Layers,
  Plane,
  Repeat,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConteudoSeo } from "@/components/calc/ConteudoSeo";
import { AdSlot } from "@/components/ads/AdSlot";
import { home } from "@/data/seo/home";

export const metadata: Metadata = {
  title: {
    absolute: "Calculadora de Pontos e Milhas Grátis — Compensa?",
  },
  description:
    "Calculadora de pontos e milhas grátis: quanto vale o seu ponto, se compensa comprar milhas, assinar clube Livelo/Smiles/LATAM Pass ou pagar anuidade de cartão. Conta aberta, fonte e data em cada número.",
  alternates: { canonical: "/" },
};

const CALCULADORAS = [
  {
    href: "/valor-do-ponto",
    Icone: Coins,
    titulo: "Valor do ponto",
    pergunta: "Quanto vale o seu ponto nesse resgate específico?",
  },
  {
    href: "/compra-de-pontos",
    Icone: ShoppingCart,
    titulo: "Compra de pontos",
    pergunta: "Essa compra (avulsa, bonificada ou transferida) vale o preço?",
  },
  {
    href: "/clube",
    Icone: Repeat,
    titulo: "Clube de assinatura",
    pergunta: "Vale assinar o clube, considerando adesão, carência e bônus?",
  },
  {
    href: "/resgate",
    Icone: Plane,
    titulo: "Resgate / emissão",
    pergunta: "Quanto esse resgate devolve por milheiro?",
  },
  {
    href: "/cartao",
    Icone: CreditCard,
    titulo: "Cartão de crédito",
    pergunta: "O cartão compensa a anuidade? Parcelar ou pagar à vista?",
  },
  {
    href: "/cenario",
    Icone: Layers,
    titulo: "Cenário completo",
    pergunta: "Somando tudo — compra, clube, transferência — compensa?",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="bg-brand-glow -mx-4 -mt-8 space-y-4 px-4 pt-10 pb-2 md:-mt-12 md:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-background/70 px-3 py-1 text-xs font-medium text-brand">
          6 calculadoras grátis · sem cadastro
        </p>
        <h1 className="max-w-3xl text-4xl leading-[1.05] font-bold text-balance md:text-5xl">
          Calculadora de pontos e milhas: esse ponto{" "}
          <span className="text-brand">compensa?</span>
        </h1>
        <p className="max-w-2xl text-base text-pretty text-muted-foreground md:text-lg">
          Seis calculadoras gratuitas para saber se vale comprar, transferir
          ou resgatar pontos e milhas, assinar clube ou pagar anuidade de
          cartão — com a conta e a fonte de cada número sempre à mostra,
          nunca uma caixa-preta.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULADORAS.map(({ href, titulo, pergunta, Icone }) => (
          <Link
            key={href}
            href={href}
            className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Card className="h-full border-border/80 transition-all group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icone className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="flex w-full flex-1 items-center justify-between gap-2 font-heading text-lg">
                  {titulo}
                  <ArrowRight
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden="true"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{pergunta}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Link
        href="/mcp"
        className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Card className="border-dashed border-brand/30 bg-brand/[0.03] transition-colors group-hover:border-brand/50">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground">
              <Bot className="size-5" aria-hidden="true" />
            </span>
            <CardTitle className="font-heading text-lg">
              Usar pelo seu assistente de IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Conecte as calculadoras ao Claude, ChatGPT ou Cursor via MCP: o
              assistente pergunta o que falta, roda a conta aqui e escreve um
              feedback personalizado para o seu cenário.
            </p>
          </CardContent>
        </Card>
      </Link>

      <ConteudoSeo conteudo={home} />

      <AdSlot posicao="rodape" />
    </div>
  );
}
