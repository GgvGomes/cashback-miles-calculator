import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clube de assinatura",
  description:
    "Vale assinar o clube de pontos? Some mensalidade, bônus de adesão, transferência e carência, e veja se o CPM efetivo fica abaixo do que você usaria.",
};

export default function ClubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
