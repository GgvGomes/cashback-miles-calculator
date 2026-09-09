/**
 * Tipos compartilhados por lib/calc.
 * Nenhum arquivo aqui importa React nem src/data — funções puras, número entra, número sai.
 */

export type Veredito = "ok" | "limite" | "nao";

/** Resultado padrão de qualquer calculadora: valor, veredito e o porquê em uma frase. */
export interface ResultadoCalculo {
  valor: number;
  veredito: Veredito;
  porque: string;
  formula: string;
}

/** Classificação de CPM na régua 💎/👍/😐/❌ (04-acumulo-pontos.md:376-384). */
export type ClassificacaoCPM = "excepcional" | "bom" | "aceitavel" | "ruim";

export type TipoStep =
  | "compra"
  | "clube"
  | "transferencia"
  | "gasto-bonificado"
  | "custo-extra";

/** Um passo do cenário multi-etapa (a "aba de soma"). */
export interface Step {
  tipo: TipoStep;
  label: string;
  custoBRL: number;
  pontosGerados: number;
  programaDestino?: string;
}
