import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compra de pontos",
  description:
    "Essa compra avulsa, bonificada ou transferida entre programas vale o preço pedido? Calcule o CPM efetivo e compare com a régua de cada programa.",
};

export default function CompraDePontosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
