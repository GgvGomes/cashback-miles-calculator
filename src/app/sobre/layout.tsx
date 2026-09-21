import type { Metadata } from "next";
import { sobre } from "@/data/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/sobre" },
  title: sobre.titulo,
  description: sobre.descricao,
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
