/**
 * Resgate e emissão: quanto vale o ponto no uso.
 * Fórmulas de 05-usar-maximizar.md e 06-clubes-calculadora.md.
 */

import type { Veredito } from "./types";

/**
 * Valor por mil (milheiro) no resgate — 06:45, 05:106.
 * (preço da passagem em R$ − taxas pagas) / (milhas necessárias / 1000)
 */
export function valorPorMil(
  precoPassagemBRL: number,
  taxasPagas: number,
  milhas: number
): number {
  if (milhas <= 0) return 0;
  return (precoPassagemBRL - taxasPagas) / (milhas / 1000);
}

/**
 * Valor por ponto (unitário, não por mil) — 05:106-114.
 * (preço da passagem em R$ − taxas pagas) / pontos usados
 */
export function valorPorPonto(
  precoPassagemBRL: number,
  taxasPagas: number,
  pontos: number
): number {
  if (pontos <= 0) return 0;
  return (precoPassagemBRL - taxasPagas) / pontos;
}

/**
 * Razão de retorno: valor por ponto / custo por ponto — 05:126-127.
 * cpmAlvo é o CPM (por mil) que você pagou/pagaria pelo ponto.
 */
export function razaoRetorno(valorPontoValor: number, cpmAlvo: number): number {
  const custoPorPonto = cpmAlvo / 1000;
  if (custoPorPonto <= 0) return 0;
  return valorPontoValor / custoPorPonto;
}

export type FaixaRazao = "nao-emita" | "aceitavel" | "bom" | "sweet-spot";

/** Classifica a razão de retorno pela régua — 05:132-135. */
export function classificaRazao(razao: number): FaixaRazao {
  if (razao > 4) return "sweet-spot";
  if (razao > 2) return "bom";
  if (razao >= 1.3) return "aceitavel";
  return "nao-emita";
}

/** Veredito simplificado a partir da razão de retorno — 05:132-135. */
export function vereditoResgate(razao: number): Veredito {
  if (razao > 2) return "ok";
  if (razao >= 1.3) return "limite";
  return "nao";
}
