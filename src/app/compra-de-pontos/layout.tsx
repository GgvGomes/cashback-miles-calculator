import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/compra-de-pontos" },
  title: "Calculadora de Compra de Pontos e Milhas (CPM)",
  description:
    "Comprar milhas vale a pena? Calcule o CPM efetivo da compra avulsa, bonificada ou com bônus de transferência e compare com a régua de cada programa.",
};

export default function CompraDePontosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
