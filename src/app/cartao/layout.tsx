import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cartão de crédito",
  description:
    "O cartão compensa a anuidade? Some float e recompensa, compare com o custo da anuidade, e veja se vale parcelar sem juros ou pagar à vista com desconto.",
};

export default function CartaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
