/**
 * Empilhamento de cashback e retorno de cartão.
 * Fórmulas de 03-cashback.md.
 */

export interface EmpilhamentoResultado {
  baseAposCupom: number;
  totalRetorno: number;
  custoEfetivo: number;
  descontoReal: number;
}

/**
 * Empilha camadas de cashback sobre uma compra — 03:216-233.
 * 1) desconto de cupom imediato reduz o preço de etiqueta -> base que você paga no cartão.
 * 2) cada camada (cashback de plataforma, cartão, fidelidade, nota fiscal...) devolve
 *    um valor em R$ sobre essa base — os valores já vêm calculados (% × base), somados aqui.
 * custoEfetivo = base − soma das camadas
 * descontoReal = (preço de etiqueta − custoEfetivo) / preço de etiqueta
 */
export function empilhaCashback(
  precoEtiqueta: number,
  descontoCupom: number,
  camadasBRL: number[]
): EmpilhamentoResultado {
  const baseAposCupom = precoEtiqueta * (1 - descontoCupom);
  const totalRetorno = camadasBRL.reduce((acc, v) => acc + v, 0);
  const custoEfetivo = baseAposCupom - totalRetorno;
  const descontoReal =
    precoEtiqueta > 0 ? (precoEtiqueta - custoEfetivo) / precoEtiqueta : 0;
  return { baseAposCupom, totalRetorno, custoEfetivo, descontoReal };
}

/**
 * Retorno anual de um cartão com cashback, para comparar com a anuidade — 03:291-300.
 * retorno anual = gasto mensal × 12 × percentual efetivo
 */
export function retornoAnualCartao(
  gastoMensal: number,
  percEfetivo: number
): number {
  return gastoMensal * 12 * percEfetivo;
}
