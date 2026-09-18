import type * as z from "zod";
import type { CallToolResult, InputRequiredResult } from "@modelcontextprotocol/server";
import type { GateOpts } from "../gates";

export type RespostaTool = CallToolResult | InputRequiredResult;

export interface Ferramenta<S extends z.ZodObject> {
  nome: string;
  titulo: string;
  descricao: string;
  inputSchema: S;
  /** Handler puro — sem HTTP, sem SDK — para testes diretos. */
  handler: (args: z.infer<S>, opts: GateOpts) => RespostaTool;
}

export function definirFerramenta<S extends z.ZodObject>(f: Ferramenta<S>): Ferramenta<S> {
  return f;
}

export const SEM_GATE: GateOpts = { podeElicitar: false };
