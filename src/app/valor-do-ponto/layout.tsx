import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/valor-do-ponto" },
  title: "Calculadora de Valor do Ponto e da Milha",
  description:
    "Calculadora de valor do ponto: descubra quanto a sua milha valeu num resgate. Compare o preço da passagem em dinheiro com o CPM pago e veja se emitir compensa.",
};

export default function ValorDoPontoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
