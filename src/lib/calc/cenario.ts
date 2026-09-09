/**
 * Cenário multi-step (a "aba de soma"): compra + clube + transferência + gasto
 * bonificado + custo extra, tudo virando um CPM só.
 */

import type { Step, Veredito } from "./types";
import { cpm } from "./cpm";

/** Custo total em R$ do cenário. Transferência não adiciona custo (só multiplica pontos). */
export function totalCusto(steps: Step[]): number {
  return steps.reduce((acc, s) => acc + s.custoBRL, 0);
}

/** Total de pontos do cenário, já com bônus de cada step aplicado. */
export function totalPontos(steps: Step[]): number {
  return steps.reduce((acc, s) => acc + s.pontosGerados, 0);
}

/** CPM combinado de todo o cenário: custo total / (pontos totais / 1000). */
export function cpmBlended(steps: Step[]): number {
  return cpm(totalCusto(steps), totalPontos(steps));
}

/**
 * CPM acumulado até (e incluindo) o step de índice `ate` — permite mostrar
 * qual step "estraga" o cenário, olhando o CPM subir a cada passo.
 */
export function cpmAcumulado(steps: Step[], ate: number): number {
  const parcial = steps.slice(0, ate + 1);
  return cpmBlended(parcial);
}

/** Veredito do cenário: mesma regra de corte do clube — CPM blended ≤ 80% do valor de uso. */
export function vereditoCenario(
  cpmBlendedValor: number,
  valorDeUso: number
): Veredito {
  const teto = 0.8 * valorDeUso;
  if (cpmBlendedValor <= teto) return "ok";
  if (cpmBlendedValor <= teto * 1.15) return "limite";
  return "nao";
}
