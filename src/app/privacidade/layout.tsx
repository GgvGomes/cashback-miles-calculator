import type { Metadata } from "next";
import { privacidade } from "@/data/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/privacidade" },
  title: privacidade.titulo,
  description: privacidade.descricao,
};

export default function PrivacidadeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
