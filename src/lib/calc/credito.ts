/**
 * Cartão de crédito: float, retorno em pontos, parcelado × PIX.
 * Fórmulas de 02-credito.md.
 */

export interface GanhoFloat {
  saldoMedio: number;
  ganhoBrutoAno: number;
  ganhoLiquidoAno: number;
}

/**
 * Ganho do float do cartão — 02:52-62.
 * saldo médio parado = gasto mensal × (float em dias / 30)
 * ganho bruto/ano = saldo médio × CDI anual
 * ganho líquido/ano = ganho bruto × 0,80 (IR de 20%)
 */
export function ganhoFloat(
  gastoMensal: number,
  floatDias: number,
  cdiAnual: number
): GanhoFloat {
  const saldoMedio = gastoMensal * (floatDias / 30);
  const ganhoBrutoAno = saldoMedio * cdiAnual;
  const ganhoLiquidoAno = ganhoBrutoAno * 0.8;
  return { saldoMedio, ganhoBrutoAno, ganhoLiquidoAno };
}

/**
 * Retorno % de um cartão que pontua sobre o gasto — 02:130-138.
 * retorno % = (pontos por US$ / cotação do dólar) × valor do milheiro / 1000
 */
export function retornoPercentualCartao(
  pontosPorUSD: number,
  cotacaoDolar: number,
  valorMilheiro: number
): number {
  return (pontosPorUSD / cotacaoDolar) * (valorMilheiro / 1000);
}

/**
 * Valor presente de um total parcelado sem juros — 02:215-226.
 * VP = Σ (parcela / (1+i)^n), n = 1..nParcelas, primeira parcela vencendo em ~1 mês.
 */
export function valorPresenteParcelas(
  totalValor: number,
  nParcelas: number,
  taxaMensal: number
): number {
  if (nParcelas <= 0) return 0;
  const parcela = totalValor / nParcelas;
  let vp = 0;
  for (let n = 1; n <= nParcelas; n++) {
    vp += parcela / Math.pow(1 + taxaMensal, n);
  }
  return vp;
}

/**
 * Desconto no PIX que empata com o parcelado sem juros — 02:255-263.
 * desconto que empata (%) = 100 − VP das parcelas (%) + recompensa do cartão (%)
 */
export function descontoQueEmpata(
  totalValor: number,
  nParcelas: number,
  taxaMensal: number,
  recompensaCartao: number = 0
): number {
  const vp = valorPresenteParcelas(totalValor, nParcelas, taxaMensal);
  const vpPercentual = vp / totalValor;
  return 1 - vpPercentual + recompensaCartao;
}
