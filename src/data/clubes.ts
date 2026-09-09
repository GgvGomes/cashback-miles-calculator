/**
 * Planos de clube de assinatura por programa — 06-clubes-calculadora.md:74-171.
 * Campos "não confirmado" no conteúdo ficam confirmado: false — a UI deve marcar isso.
 */

export interface PlanoClube {
  id: string;
  nome: string;
  precoMes: number | null;
  pontosMes: number | null;
  cpmTabela: number | null;
  carenciaMeses: number | null;
  confirmado: boolean;
  observacao?: string;
  fonte: string;
  consultadoEm: string;
  volatilidade: "alta" | "media" | "baixa";
}

export interface GrupoClube {
  programaId: string;
  nome: string;
  /** Bônus de transferência só aplica a clube de coalizão (Livelo/Esfera) — 06:277-279. */
  tipo: "coalizao" | "aereo";
  planos: PlanoClube[];
}

const FONTE_LIVELO = "Site oficial Livelo";
const FONTE_ESFERA = "Fábrica de Milha / Mobills";
const FONTE_SMILES = "MilhasBot";
const FONTE_LATAM = "Site LATAM Pass / MilhasBot";
const FONTE_AZUL = "Mobills / Flávio Viaja com Milhas";
const DATA = "2026-08-18";

export const clubes: GrupoClube[] = [
  {
    programaId: "livelo",
    nome: "Clube Livelo",
    tipo: "coalizao",
    planos: [
      {
        id: "livelo-mini",
        nome: "Mini",
        precoMes: null,
        pontosMes: 500,
        cpmTabela: null,
        carenciaMeses: null,
        confirmado: false,
        observacao: "Edição limitada anual; CPM não confirmado.",
        fonte: FONTE_LIVELO,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "livelo-classic",
        nome: "Classic",
        precoMes: 44.9,
        pontosMes: 1000,
        cpmTabela: 44.9,
        carenciaMeses: 0,
        confirmado: true,
        observacao: "Cancelamento livre no plano mensal.",
        fonte: FONTE_LIVELO,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "livelo-special",
        nome: "Special",
        precoMes: 87.9,
        pontosMes: 2000,
        cpmTabela: 43.95,
        carenciaMeses: 0,
        confirmado: true,
        fonte: FONTE_LIVELO,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "livelo-plus",
        nome: "Plus",
        precoMes: 129.9,
        pontosMes: 3000,
        cpmTabela: 43.3,
        carenciaMeses: 0,
        confirmado: true,
        fonte: FONTE_LIVELO,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
    ],
  },
  {
    programaId: "esfera",
    nome: "Clube Esfera",
    tipo: "coalizao",
    planos: [
      {
        id: "esfera-pro",
        nome: "Pro",
        precoMes: 43.9,
        pontosMes: 1000,
        cpmTabela: 43.9,
        carenciaMeses: null,
        confirmado: false,
        observacao: "Carência/multa não confirmada nas fontes.",
        fonte: FONTE_ESFERA,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "esfera-master",
        nome: "Master",
        precoMes: 106.9,
        pontosMes: 2500,
        cpmTabela: 42.76,
        carenciaMeses: null,
        confirmado: false,
        fonte: FONTE_ESFERA,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "esfera-vip",
        nome: "VIP",
        precoMes: 211.9,
        pontosMes: 5000,
        cpmTabela: 42.38,
        carenciaMeses: null,
        confirmado: false,
        fonte: FONTE_ESFERA,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "esfera-premium",
        nome: "Premium",
        precoMes: 414.9,
        pontosMes: 10000,
        cpmTabela: 41.49,
        carenciaMeses: null,
        confirmado: false,
        fonte: FONTE_ESFERA,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "esfera-exclusive",
        nome: "Exclusive",
        precoMes: 799.9,
        pontosMes: 20000,
        cpmTabela: 40.0,
        carenciaMeses: null,
        confirmado: false,
        fonte: FONTE_ESFERA,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
    ],
  },
  {
    programaId: "smiles",
    nome: "Clube Smiles",
    tipo: "aereo",
    planos: [
      {
        id: "smiles-1000",
        nome: "1.000",
        precoMes: 44,
        pontosMes: 1000,
        cpmTabela: 44,
        carenciaMeses: 6,
        confirmado: true,
        observacao: "Multa = mensalidades restantes até a carência.",
        fonte: FONTE_SMILES,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "smiles-20000",
        nome: "20.000",
        precoMes: null,
        pontosMes: 20000,
        cpmTabela: null,
        carenciaMeses: 10,
        confirmado: false,
        observacao: "Mensalidade ~R$800+, não confirmado com precisão.",
        fonte: FONTE_SMILES,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
    ],
  },
  {
    programaId: "latam-pass",
    nome: "Clube LATAM Pass",
    tipo: "aereo",
    planos: [
      {
        id: "latam-base",
        nome: "Base",
        precoMes: 40.9,
        pontosMes: 1000,
        cpmTabela: 40.9,
        carenciaMeses: 3,
        confirmado: true,
        fonte: FONTE_LATAM,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "latam-turbo",
        nome: "Base + Turbo",
        precoMes: 356.8,
        pontosMes: 10000,
        cpmTabela: 35.68,
        carenciaMeses: 3,
        confirmado: true,
        fonte: FONTE_LATAM,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
    ],
  },
  {
    programaId: "azul-fidelidade",
    nome: "Clube Azul Fidelidade",
    tipo: "aereo",
    planos: [
      {
        id: "azul-1000",
        nome: "1.000 (mensal)",
        precoMes: 45,
        pontosMes: 1000,
        cpmTabela: 45.0,
        carenciaMeses: null,
        confirmado: false,
        observacao: "Preços divergem entre fontes; confirme no site oficial.",
        fonte: FONTE_AZUL,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
      {
        id: "azul-20000",
        nome: "20.000 (mensal)",
        precoMes: 819,
        pontosMes: 20000,
        cpmTabela: 40.95,
        carenciaMeses: null,
        confirmado: false,
        observacao: "Preços divergem entre fontes; confirme no site oficial.",
        fonte: FONTE_AZUL,
        consultadoEm: DATA,
        volatilidade: "alta",
      },
    ],
  },
];
