/**
 * Programas de pontos/milhas: os três conceitos distintos de "quanto vale o milheiro"
 * — nunca colapsar num só campo (13-registro-revisoes.md, Tabela 1).
 * Régua 💎/👍/😐/❌ de 04-acumulo-pontos.md:376-384.
 */

export interface Programa {
  id: string;
  nome: string;
  tipo: "coalizao" | "aereo";
  /** Preço-alvo de compra (CPM alvo): teto do que vale pagar por mil pontos. */
  precoAlvoCompra: number;
  /** Valor de uso de referência: quanto o milheiro costuma render num resgate comum. */
  valorDeUso: number | null;
  regua: { excepcional: number; bom: number; aceitavel: number };
  minimoTransferencia: number | null;
  fonte: string;
  consultadoEm: string;
  volatilidade: "alta" | "media" | "baixa";
}

export const programas: Programa[] = [
  {
    id: "livelo",
    nome: "Livelo",
    tipo: "coalizao",
    precoAlvoCompra: 30,
    valorDeUso: 23,
    regua: { excepcional: 20, bom: 30, aceitavel: 35 },
    minimoTransferencia: null,
    fonte: "Melhores Destinos (preço-alvo) / MilhasBot (valor de uso)",
    consultadoEm: "2026-08-18",
    volatilidade: "alta",
  },
  {
    id: "esfera",
    nome: "Esfera",
    tipo: "coalizao",
    precoAlvoCompra: 25,
    valorDeUso: null,
    regua: { excepcional: 25, bom: 35, aceitavel: 50 },
    minimoTransferencia: 30000,
    fonte: "Fábrica de Milha / Mobills",
    consultadoEm: "2026-08-18",
    volatilidade: "alta",
  },
  {
    id: "smiles",
    nome: "Smiles",
    tipo: "aereo",
    precoAlvoCompra: 16,
    valorDeUso: 21,
    regua: { excepcional: 12, bom: 16, aceitavel: 20 },
    minimoTransferencia: null,
    fonte: "Melhores Destinos (preço-alvo) / MilhasBot (valor de uso)",
    consultadoEm: "2026-08-18",
    volatilidade: "alta",
  },
  {
    id: "latam-pass",
    nome: "LATAM Pass",
    tipo: "aereo",
    precoAlvoCompra: 26,
    valorDeUso: null,
    regua: { excepcional: 21, bom: 26, aceitavel: 32 },
    minimoTransferencia: null,
    fonte: "Melhores Destinos",
    consultadoEm: "2026-07",
    volatilidade: "alta",
  },
  {
    id: "azul-fidelidade",
    nome: "Azul Fidelidade",
    tipo: "aereo",
    precoAlvoCompra: 13,
    valorDeUso: null,
    regua: { excepcional: 11, bom: 13, aceitavel: 17 },
    minimoTransferencia: null,
    fonte: "Melhores Destinos",
    consultadoEm: "2026-07",
    volatilidade: "alta",
  },
];
