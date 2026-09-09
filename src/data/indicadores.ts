/**
 * Indicadores de mercado usados nas contas do app.
 * Fonte: content/13-registro-revisoes.md (Tabela 2) e content/02-credito.md.
 * `i` (taxa mensal líquida) é derivada: CDI anual, descontado IR de 20%, convertido pra mês.
 */

export interface Indicador {
  valor: number;
  fonte: string;
  consultadoEm: string;
  volatilidade: "alta" | "media" | "baixa";
}

export const indicadores = {
  selicAnual: {
    valor: 0.14,
    fonte: "Copom",
    consultadoEm: "2026-08-05",
    volatilidade: "alta",
  },
  cdiAnual: {
    valor: 0.139,
    fonte: "Mercado",
    consultadoEm: "2026-08-13",
    volatilidade: "alta",
  },
  dolar: {
    valor: 5.2213,
    fonte: "Mercado",
    consultadoEm: "2026-08-14",
    volatilidade: "alta",
  },
  rotativoMensal: {
    valor: 0.1513,
    fonte: "Banco Central",
    consultadoEm: "2026-06",
    volatilidade: "media",
  },
  parcelamentoFaturaMensal: {
    valor: 0.0932,
    fonte: "Banco Central",
    consultadoEm: "2026-06",
    volatilidade: "media",
  },
  irRendaFixa: {
    valor: 0.2,
    fonte: "Premissa do guia",
    consultadoEm: "2026-08",
    volatilidade: "baixa",
  },
  /** i = CDI anual × (1 − IR) convertido a taxa mensal — 06:298-305, 02:215-226. */
  taxaMensalLiquida: {
    valor: 0.00872,
    fonte: "Cálculo derivado do CDI (Mercado) e IR (premissa do guia)",
    consultadoEm: "2026-08-13",
    volatilidade: "alta",
  },
  premissaMilheiro: {
    valor: 20,
    fonte: "Premissa do guia",
    consultadoEm: "2026-08",
    volatilidade: "baixa",
  },
} as const satisfies Record<string, Indicador>;
