import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conectar ao seu assistente de IA (MCP)",
  description:
    "Use as calculadoras de pontos, milhas e cashback direto no Claude, ChatGPT ou Cursor via MCP: o assistente pergunta o que falta, roda a conta e escreve um feedback personalizado.",
};

export default function McpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
