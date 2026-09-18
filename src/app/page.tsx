import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: {
    absolute: "Compensa? — Calculadora de pontos, milhas e cashback",
  },
  description:
    "Seis calculadoras gratuitas para saber se vale comprar, transferir ou resgatar pontos e milhas — com a conta e a fonte de cada número sempre à mostra.",
};

const CALCULADORAS = [
  {
    href: "/valor-do-ponto",
    titulo: "Valor do ponto",
    pergunta: "Quanto vale o seu ponto nesse resgate específico?",
  },
  {
    href: "/compra-de-pontos",
    titulo: "Compra de pontos",
    pergunta: "Essa compra (avulsa, bonificada ou transferida) vale o preço?",
  },
  {
    href: "/clube",
    titulo: "Clube de assinatura",
    pergunta: "Vale assinar o clube, considerando adesão, carência e bônus?",
  },
  {
    href: "/resgate",
    titulo: "Resgate / emissão",
    pergunta: "Quanto esse resgate devolve por milheiro?",
  },
  {
    href: "/cartao",
    titulo: "Cartão de crédito",
    pergunta: "O cartão compensa a anuidade? Parcelar ou pagar à vista?",
  },
  {
    href: "/cenario",
    titulo: "Cenário completo",
    pergunta: "Somando tudo — compra, clube, transferência — compensa?",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Esse ponto compensa?
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Seis calculadoras que executam as fórmulas do guia de pontos, milhas
          e cashback, com as contas e as fontes sempre à mostra, nunca uma
          caixa-preta.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CALCULADORAS.map((c) => (
          <Link key={c.href} href={c.href} className="block">
            <Card className="h-full border-border/80 transition-colors hover:border-primary/40 hover:shadow-sm">
              <CardHeader>
                <CardTitle>{c.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{c.pergunta}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Link href="/mcp" className="block">
        <Card className="border-dashed border-border/80 transition-colors hover:border-primary/40 hover:shadow-sm">
          <CardHeader>
            <CardTitle>Usar pelo seu assistente de IA</CardTitle>
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
    </div>
  );
}
