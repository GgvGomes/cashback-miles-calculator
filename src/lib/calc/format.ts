/**
 * Formatação e parsing de números em pt-BR.
 */

/** Formata número como moeda BRL: 1234.5 -> "R$ 1.234,50". */
export function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Formata pontos/milhas com separador de milhar pt-BR: 26800 -> "26.800". */
export function formatPts(valor: number): string {
  return Math.round(valor).toLocaleString("pt-BR");
}

/**
 * Faz parse de um número digitado em pt-BR ("1.234,56" ou "1234,56" ou "1234.56")
 * para float. Vazio ou inválido -> 0.
 */
export function parseNumeroPtBR(input: string): number {
  if (!input) return 0;
  const limpo = input.trim();
  if (limpo === "") return 0;

  // Se tem vírgula, ela é o separador decimal; pontos antes dela são milhar.
  if (limpo.includes(",")) {
    const semMilhar = limpo.replace(/\./g, "").replace(",", ".");
    const n = Number(semMilhar);
    return Number.isFinite(n) ? n : 0;
  }

  const n = Number(limpo);
  return Number.isFinite(n) ? n : 0;
}
