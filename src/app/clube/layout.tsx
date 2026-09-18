import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/clube" },
  title: "Calculadora de Clube de Pontos (Livelo, Smiles, LATAM)",
  description:
    "Clube de pontos vale a pena? Calcule o CPM efetivo da assinatura com bônus de transferência e aplique a regra de corte antes de assinar Livelo, Smiles, LATAM Pass ou TudoAzul.",
};

export default function ClubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
