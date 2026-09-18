import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cenario" },
  title: "Simulador de Pontos e Milhas: CPM Combinado",
  description:
    "Simule compra, clube, transferência com bônus e gasto bonificado num único CPM combinado — e descubra qual passo estraga a conta.",
};

export default function CenarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
