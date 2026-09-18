/**
 * Formato comum de resposta das calculadoras.
 *
 * `structuredContent` é o que a IA cliente usa para escrever o feedback;
 * `content[0].text` é um resumo curto para clientes que só mostram texto.
 */
import type { CallToolResult } from "@modelcontextprotocol/server";
import type { Veredito } from "@/lib/calc/types";
import type { Contexto } from "./contexto";

export const AVISO = "Cálculo educativo com base no guia; não é promessa de retorno financeiro nem recomendação de investimento.";

export interface ResultadoOk<R extends Record<string, unknown>> {
  status: "ok";
  calculadora: string;
  entradas: Record<string, unknown>;
  resultado: R;
  veredito: Veredito;
  vereditoRotulo: string;
  formula: string[];
  contexto: Contexto;
  aviso: string;
}

export const ROTULO_VEREDITO: Record<Veredito, string> = {
  ok: "COMPENSA",
  limite: "LIMÍTROFE",
  nao: "NÃO COMPENSA",
};

export function okResult<R extends Record<string, unknown>>(
  dados: Omit<ResultadoOk<R>, "status" | "aviso" | "vereditoRotulo">,
  resumo: string
): CallToolResult & { structuredContent: ResultadoOk<R> } {
  const structured: ResultadoOk<R> = {
    status: "ok",
    vereditoRotulo: ROTULO_VEREDITO[dados.veredito],
    aviso: AVISO,
    ...dados,
  };
  return {
    content: [{ type: "text", text: `${resumo}\nVeredito: ${structured.vereditoRotulo}.\n${AVISO}` }],
    structuredContent: structured,
  };
}

/** Resultado informativo (sem veredito), ex.: perfil ou lista de programas. */
export function infoResult<S extends Record<string, unknown>>(
  structured: S,
  texto: string
): CallToolResult & { structuredContent: S } {
  return { content: [{ type: "text", text: texto }], structuredContent: structured };
}
