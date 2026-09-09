/**
 * Clube de assinatura de pontos/milhas.
 * Fórmulas de 06-clubes-calculadora.md.
 */

import type { Veredito } from "./types";

/** CPM do clube sem bônus: mensalidade / (pontos do mês / 1000) — 06:41. */
export function cpmClube(mensalidade: number, pontosMes: number): number {
  if (pontosMes <= 0) return 0;
  return mensalidade / (pontosMes / 1000);
}

/**
 * CPM diluindo o bônus de adesão pelo período de permanência — 06:235.
 * (mensalidade × meses) / ((pontos mensais × meses + bônus de adesão) / 1000)
 */
export function cpmComAdesao(
  mensalidade: number,
  meses: number,
  pontosMes: number,
  bonusAdesao: number
): number {
  const totalPago = mensalidade * meses;
  const totalPontos = pontosMes * meses + bonusAdesao;
  if (totalPontos <= 0) return 0;
  return totalPago / (totalPontos / 1000);
}

/**
 * CPM real quando carência/multa obriga a pagar mais meses do que os pontos
 * efetivamente recebidos justificariam — 06:287-291.
 * totalObrigatorio em R$, pontosRecebidos em pontos (não em milheiros).
 */
export function cpmComCarencia(
  totalObrigatorio: number,
  pontosRecebidos: number
): number {
  if (pontosRecebidos <= 0) return 0;
  return totalObrigatorio / (pontosRecebidos / 1000);
}

/**
 * Custo de oportunidade de pagar o plano à vista — 06:298-305.
 * valorPago × taxaMensal × (meses / 2)
 * Taxa padrão do guia: i = 0,00872 (CDI 13,90% a.a. líquido de IR — 06:301-303).
 */
export function custoOportunidade(
  valorPago: number,
  taxaMensal: number,
  meses: number
): number {
  return valorPago * taxaMensal * (meses / 2);
}

/**
 * Regra de corte do clube — 06:311-320.
 * Assine só se o CPM efetivo (após bônus de transferência) for ≤ 80% do valor
 * por mil no resgate pretendido. Aqui só a comparação numérica central (item 1
 * das 4 condições) — as outras 3 (destino definido, além da carência, resolve algo
 * que a compra avulsa não resolve) são checkbox na UI, não número.
 */
export function vereditoClube(
  cpmEfetivoValor: number,
  valorPorMilResgate: number
): Veredito {
  const teto = 0.8 * valorPorMilResgate;
  if (cpmEfetivoValor <= teto) return "ok";
  if (cpmEfetivoValor <= teto * 1.15) return "limite";
  return "nao";
}
