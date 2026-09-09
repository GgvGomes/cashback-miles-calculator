/**
 * CPM — custo por mil pontos.
 * Fórmulas de 04-acumulo-pontos.md e 06-clubes-calculadora.md.
 */

/** CPM = dinheiro desembolsado / (pontos recebidos / 1000) — 04:312. */
export function cpm(custoTotalBRL: number, pontos: number): number {
  if (pontos <= 0) return 0;
  return custoTotalBRL / (pontos / 1000);
}

/** Pontos com bônus aplicado: base × (1 + bônus) — 08:358-375. */
export function pontosComBonus(base: number, bonus: number): number {
  return base * (1 + bonus);
}

/**
 * CPM efetivo após bônus de transferência: CPM / (1 + bônus) — 04:358, 06:257.
 * Só vale para programa de coalizão (Livelo/Esfera) — a UI aplica esse guarda-rail,
 * esta função só faz a conta.
 */
export function cpmEfetivo(cpmBase: number, bonus: number): number {
  return cpmBase / (1 + bonus);
}

/** CPM de shopping de pontos: sobrepreço / (pontos extras / 1000) — 04:317-320. */
export function cpmSobrepreco(
  precoPortal: number,
  precoDireto: number,
  pontosExtras: number
): number {
  if (pontosExtras <= 0) return 0;
  return (precoPortal - precoDireto) / (pontosExtras / 1000);
}

/** Régua de referência por programa — 04:376-384. Limites superiores de cada faixa. */
const REGUA_CPM: Record<
  string,
  { excepcional: number; bom: number; aceitavel: number }
> = {
  livelo: { excepcional: 20, bom: 30, aceitavel: 35 },
  smiles: { excepcional: 12, bom: 16, aceitavel: 20 },
  "azul-fidelidade": { excepcional: 11, bom: 13, aceitavel: 17 },
  "latam-pass": { excepcional: 21, bom: 26, aceitavel: 32 },
  esfera: { excepcional: 25, bom: 35, aceitavel: 50 },
};

/** Classifica um CPM na régua 💎/👍/😐/❌ do programa — 04:376-384. */
export function classificaCPM(
  programa: string,
  cpmValor: number
): "excepcional" | "bom" | "aceitavel" | "ruim" {
  const regua = REGUA_CPM[programa];
  if (!regua) return "ruim";
  if (cpmValor <= regua.excepcional) return "excepcional";
  if (cpmValor <= regua.bom) return "bom";
  if (cpmValor <= regua.aceitavel) return "aceitavel";
  return "ruim";
}
