import type { Metadata } from "next";
import { contato } from "@/data/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/contato" },
  title: contato.titulo,
  description: contato.descricao,
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
