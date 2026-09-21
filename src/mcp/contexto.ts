/**
 * Contexto que acompanha todo resultado: regras de interpretação, o porquê,
 * fonte e data — é isso que permite à IA cliente escrever um feedback
 * personalizado sem inventar regra.
 */
import { SITE_URL } from "@/data/site";
import { comoUtilizar, type ConteudoComoUtilizar } from "@/data/como-utilizar";
import { programas, type Programa } from "@/data/programas";
import { indicadores } from "@/data/indicadores";
import type { PerfilT } from "./schemas";

export type ChaveCalculadora = keyof typeof comoUtilizar;

export interface Referencia {
  nome: string;
  valor: number | string | null;
  fonte: string;
  consultadoEm: string;
}

export interface Contexto {
  interpretacao: ConteudoComoUtilizar["interpretacao"];
  porque: string;
  fonte: string;
  consultadoEm: string;
  referencias: Referencia[];
  perfil?: PerfilT;
  paginaWeb: string;
}

export const ROTA_WEB: Record<ChaveCalculadora, string> = {
  valorDoPonto: "/valor-do-ponto",
  compraDePontos: "/compra-de-pontos",
  clube: "/clube",
  resgate: "/resgate",
  cartao: "/cartao",
  cenario: "/cenario",
};

export { SITE_URL };

export function contextoDe(
  chave: ChaveCalculadora,
  referencias: Referencia[] = [],
  perfil?: PerfilT
): Contexto {
  const c = comoUtilizar[chave];
  return {
    interpretacao: c.interpretacao,
    porque: c.porque,
    fonte: c.fonte,
    consultadoEm: c.consultadoEm,
    referencias,
    ...(perfil ? { perfil } : {}),
    paginaWeb: `${SITE_URL}${ROTA_WEB[chave]}`,
  };
}

export function programaPorId(id: string | undefined): Programa | undefined {
  if (!id) return undefined;
  return programas.find((p) => p.id === id);
}

export function refPrograma(p: Programa, campo: "precoAlvoCompra" | "valorDeUso"): Referencia {
  return {
    nome: `${p.nome} — ${campo === "precoAlvoCompra" ? "preço-alvo de compra (R$/mil)" : "valor de uso (R$/mil)"}`,
    valor: p[campo],
    fonte: p.fonte,
    consultadoEm: p.consultadoEm,
  };
}

export function refIndicador(chave: keyof typeof indicadores, nome: string): Referencia {
  const i = indicadores[chave];
  return { nome, valor: i.valor, fonte: i.fonte, consultadoEm: i.consultadoEm };
}
