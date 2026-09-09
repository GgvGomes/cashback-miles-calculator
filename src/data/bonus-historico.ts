/**
 * Campanhas de bônus de transferência 2026 — 05-usar-maximizar.md:223-236.
 * Serve de baseline: sem campanha 5-10%, bom 60-80%, excepcional 100%+.
 */

export interface CampanhaBonus {
  periodo: string;
  campanha: string;
  bonusPercentual: number;
  fonte: string;
  consultadoEm: string;
  volatilidade: "alta" | "media" | "baixa";
}

const DATA = "2026-08-18";

export const campanhasBonus: CampanhaBonus[] = [
  {
    periodo: "jan/2026",
    campanha: "Livelo → LATAM Pass (com pontos + dinheiro)",
    bonusPercentual: 0.25,
    fonte: "Melhores Destinos – Milheiro Livelo",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "mar/2026",
    campanha: "Azul, Smiles e LATAM simultâneas (pico do ano)",
    bonusPercentual: 1.33,
    fonte: "Melhores Cartões mar/2026",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "abr/2026",
    campanha: "LATAM Pass × Livelo/C6/Esfera/Itaú (multibanco)",
    bonusPercentual: 0.25,
    fonte: "Cartões de Crédito – transferência bonificada abr-jun/2026",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "abr/2026",
    campanha: "Smiles × C6 Bank",
    bonusPercentual: 0.7,
    fonte: "Smiles – campanha C6 04/2026",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "jul/2026",
    campanha: "Smiles × C6 Átomos (teto 300 mil milhas/CPF)",
    bonusPercentual: 0.8,
    fonte: "Melhores Cartões jul/2026",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "jul/2026",
    campanha: "Smiles × Esfera",
    bonusPercentual: 0.75,
    fonte: "Passageiro de Primeira – Smiles × Esfera",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "2026 (corrente)",
    campanha: "iupp → aéreas (faixa mais alta do mercado)",
    bonusPercentual: 1.2,
    fonte: "Fábrica de Milha – iupp",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    periodo: "ago/2026",
    campanha: "Aniversário Azul Fidelidade (ofertas relâmpago no clube)",
    bonusPercentual: 2.5,
    fonte: "Melhores Cartões 06/08/2026",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
];
