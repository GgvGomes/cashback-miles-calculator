import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valor do ponto",
  description:
    "Descubra quanto o seu ponto ou milha realmente valeu num resgate específico — compare o preço da passagem em dinheiro com o CPM pago e veja a razão de retorno.",
};

export default function ValorDoPontoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
