/**
 * Gates: como uma ferramenta pede informação que falta.
 *
 * Mecanismo primário: devolver `status: "precisa_info"` com a lista de
 * perguntas — funciona em qualquer cliente MCP, a IA pergunta em texto.
 *
 * Mecanismo secundário (best-effort): elicitation nativa (formulário) via
 * multi-round-trip do MCP 2026-07-28. Só entra quando o cliente declarou a
 * capacidade `elicitation` (form) e `MCP_ELICITATION=1`. Em HTTP stateless com
 * cliente legado (2025) o SDK recusa — por isso nunca é o único caminho.
 */
import {
  CLIENT_CAPABILITIES_META_KEY,
  inputRequired,
  type CallToolResult,
  type ClientCapabilities,
  type ElicitRequestFormParams,
  type InputRequiredResult,
  type McpServer,
  type ServerContext,
} from "@modelcontextprotocol/server";

export type TipoPergunta = "number" | "enum" | "boolean" | "string";

export interface Pergunta {
  campo: string;
  pergunta: string;
  tipo: TipoPergunta;
  unidade?: string;
  opcoes?: readonly string[];
  dica?: string;
}

export interface PrecisaInfo {
  status: "precisa_info";
  calculadora: string;
  perguntas: Pergunta[];
  entradasRecebidas: Record<string, unknown>;
  instrucao: string;
}

export interface GateOpts {
  podeElicitar: boolean;
}

/** Chave do formulário usada em `inputRequests`/`inputResponses`. */
export const CHAVE_FORM = "form";

function vazio(v: unknown): boolean {
  return v === undefined || v === null || (typeof v === "number" && Number.isNaN(v));
}

/** Perguntas cujos campos ainda não vieram nos args. */
export function faltantes(args: Record<string, unknown>, campos: readonly Pergunta[]): Pergunta[] {
  return campos.filter((c) => vazio(args[c.campo]));
}

/** Resultado estruturado pedindo os campos que faltam. */
export function precisaInfo(
  calculadora: string,
  perguntas: Pergunta[],
  entradasRecebidas: Record<string, unknown>
): CallToolResult & { structuredContent: PrecisaInfo } {
  const structured: PrecisaInfo = {
    status: "precisa_info",
    calculadora,
    perguntas,
    entradasRecebidas: semUndefined(entradasRecebidas),
    instrucao:
      "Pergunte ao usuário, em linguagem simples, cada item abaixo (uma pergunta por vez se forem muitos). Depois chame esta ferramenta de novo com as entradas já recebidas mais as novas.",
  };
  const linhas = perguntas.map(
    (p) =>
      `- ${p.campo}${p.unidade ? ` (${p.unidade})` : ""}: ${p.pergunta}${p.opcoes ? ` Opções: ${p.opcoes.join(", ")}.` : ""}${p.dica ? ` Dica: ${p.dica}` : ""}`
  );
  return {
    content: [
      {
        type: "text",
        text: `Preciso de mais informação para "${calculadora}":\n${linhas.join("\n")}`,
      },
    ],
    structuredContent: structured,
  };
}

/** Monta o formulário de elicitation (JSON Schema plano, como a spec exige). */
export function elicitar(calculadora: string, perguntas: Pergunta[]): InputRequiredResult {
  type Props = ElicitRequestFormParams["requestedSchema"]["properties"];
  const properties: Props = {};
  for (const p of perguntas) {
    const base = { title: p.campo, description: p.pergunta };
    if (p.tipo === "number") properties[p.campo] = { ...base, type: "number", minimum: 0 };
    else if (p.tipo === "boolean") properties[p.campo] = { ...base, type: "boolean" };
    else if (p.tipo === "enum") properties[p.campo] = { ...base, type: "string", enum: [...(p.opcoes ?? [])] };
    else properties[p.campo] = { ...base, type: "string" };
  }
  return inputRequired({
    inputRequests: {
      [CHAVE_FORM]: inputRequired.elicit({
        message: `Para calcular "${calculadora}" preciso de: ${perguntas.map((p) => p.campo).join(", ")}.`,
        requestedSchema: {
          type: "object",
          properties,
          required: perguntas.map((p) => p.campo),
        },
      }),
    },
  });
}

/**
 * Decide o caminho do gate. Devolve `null` quando nada falta.
 */
export function gate(
  calculadora: string,
  args: Record<string, unknown>,
  campos: readonly Pergunta[],
  opts: GateOpts
): CallToolResult | InputRequiredResult | null {
  const falta = faltantes(args, campos);
  if (falta.length === 0) return null;
  if (opts.podeElicitar) return elicitar(calculadora, falta);
  return precisaInfo(calculadora, falta, args);
}

/**
 * Cliente declarou elicitation por formulário?
 * 2026-era: capacidades vêm no envelope de cada request.
 * 2025-era: vêm do `initialize` (em HTTP stateless não existe → false).
 */
export function podeElicitar(server: McpServer, ctx: ServerContext): boolean {
  if (process.env.MCP_ELICITATION !== "1") return false;
  const envelope = ctx.mcpReq.envelope as Record<string, unknown> | undefined;
  const caps =
    (envelope?.[CLIENT_CAPABILITIES_META_KEY] as ClientCapabilities | undefined) ??
    server.server.getClientCapabilities();
  const el = caps?.elicitation as Record<string, unknown> | undefined;
  if (!el) return false;
  // `elicitation: {}` = só form (compat); `elicitation.form` explícito também vale.
  return el.form !== undefined || Object.keys(el).length === 0;
}

export function semUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}
