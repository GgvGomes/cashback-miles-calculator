import type * as z from "zod";
import type { Ferramenta } from "./tipos";
import { perfilTool } from "./perfil";
import { listarProgramasTool } from "./listar-programas";
import { valorDoPontoTool } from "./valor-do-ponto";
import { compraDePontosTool } from "./compra-de-pontos";
import { clubeTool } from "./clube";
import { resgateTool } from "./resgate";
import { cartaoTool } from "./cartao";
import { cenarioTool } from "./cenario";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TOOLS: Ferramenta<z.ZodObject<any>>[] = [
  perfilTool,
  listarProgramasTool,
  valorDoPontoTool,
  compraDePontosTool,
  clubeTool,
  resgateTool,
  cartaoTool,
  cenarioTool,
];

export {
  perfilTool,
  listarProgramasTool,
  valorDoPontoTool,
  compraDePontosTool,
  clubeTool,
  resgateTool,
  cartaoTool,
  cenarioTool,
};
