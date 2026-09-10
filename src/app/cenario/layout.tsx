import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cenário completo",
  description:
    "Empilhe compra, clube, transferência com bônus e gasto bonificado num único CPM combinado — e descubra qual passo estraga a conta.",
};

export default function CenarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
