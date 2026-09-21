import type { Metadata } from "next";
import { termos } from "@/data/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/termos" },
  title: termos.titulo,
  description: termos.descricao,
};

export default function TermosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
