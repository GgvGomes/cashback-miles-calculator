import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resgate e emissão",
  description:
    "Quanto esse resgate devolve por milheiro? Compare o valor por mil da passagem emitida com o preço-alvo de compra do seu programa.",
};

export default function ResgateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
