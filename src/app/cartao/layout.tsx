import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cartao" },
  title: "Calculadora de Cartão de Crédito: Anuidade, Pontos ou Cashback",
  description:
    "A anuidade do cartão compensa? Some float e recompensa em pontos ou cashback, compare com o custo da anuidade e veja se vale parcelar sem juros ou pagar à vista.",
};

export default function CartaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
