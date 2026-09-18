import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/resgate" },
  title: "Calculadora de Resgate de Milhas: Valor do Milheiro",
  description:
    "Quanto esse resgate devolve por milheiro? Compare o valor por mil da passagem emitida com o preço-alvo de compra do programa e decida entre milhas ou dinheiro.",
};

export default function ResgateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
