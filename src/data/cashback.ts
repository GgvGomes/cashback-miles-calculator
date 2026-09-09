/**
 * Plataformas de cashback e cartões com cashback — 03-cashback.md.
 */

export interface PlataformaCashback {
  id: string;
  nome: string;
  prazoLiberacaoDias: string;
  minimoSaque: string;
  aceitaCupom: string;
  observacao: string;
  fonte: string;
  consultadoEm: string;
  volatilidade: "alta" | "media" | "baixa";
}

export interface CartaoCashback {
  id: string;
  nome: string;
  cashbackDeclarado: string;
  percentualEfetivo: number;
  anuidadeAnual: number;
  observacao: string;
  fonte: string;
  consultadoEm: string;
  volatilidade: "alta" | "media" | "baixa";
}

const DATA = "2026-08-18";

export const plataformasCashback: PlataformaCashback[] = [
  {
    id: "meliuz",
    nome: "Méliuz",
    prazoLiberacaoDias: "30 a 90 (loja a loja); nota fiscal até 15",
    minimoSaque: "R$ 20 (sem mínimo no Prime)",
    aceitaCupom: "Sim, se listado no próprio Méliuz",
    observacao:
      "Prime (~R$9,90/mês) dobra o percentual padrão; não soma com promoção da loja.",
    fonte: "Méliuz (prazos/resgate/Prime)",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    id: "cuponomia",
    nome: "Cuponomia",
    prazoLiberacaoDias: "validação média ~120",
    minimoSaque: "R$ 20, transferência sem custo",
    aceitaCupom: "Sim, se listado na Cuponomia",
    observacao: "Saldo vale 730 dias após confirmação de cada compra.",
    fonte: "Cuponomia (central de ajuda)",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    id: "inter-shop",
    nome: "Inter Shop / Inter Loja",
    prazoLiberacaoDias: "~30 (correntista); até 120 em casos excepcionais",
    minimoSaque: "não confirmado",
    aceitaCupom: "Só cupom autorizado",
    observacao: "Exige ser correntista Inter; cancelamento invalida o cashback.",
    fonte: "Cobertura Passageiro de Primeira",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
  {
    id: "nubank-shopping",
    nome: "Nubank Shopping",
    prazoLiberacaoDias: "até 90",
    minimoSaque: "sem saque, cai como saldo em conta",
    aceitaCupom: "Segue a regra da loja parceira",
    observacao: "O cashback do Shopping não rende (só o do cartão Ultravioleta).",
    fonte: "Nubank (Seu Crédito Digital)",
    consultadoEm: DATA,
    volatilidade: "alta",
  },
];

export const cartoesCashback: CartaoCashback[] = [
  {
    id: "meliuz-mastercard",
    nome: "Méliuz Mastercard",
    cashbackDeclarado: "até 2%",
    percentualEfetivo: 0.001,
    anuidadeAnual: 0,
    observacao:
      "0,1% até R$1.500/mês de gasto; escalona até 1% acima de R$5.000/mês.",
    fonte: "fdr.com.br / mobills.com.br",
    consultadoEm: DATA,
    volatilidade: "media",
  },
  {
    id: "recargapay",
    nome: "RecargaPay Mastercard",
    cashbackDeclarado: "1,5%",
    percentualEfetivo: 0.015,
    anuidadeAnual: 0,
    observacao: "Linear em todas as compras, sem escalonamento.",
    fonte: "fdr.com.br",
    consultadoEm: DATA,
    volatilidade: "media",
  },
  {
    id: "c6-carbon",
    nome: "C6 Carbon",
    cashbackDeclarado: "até 1,7%",
    percentualEfetivo: 0.017,
    anuidadeAnual: 0,
    observacao: "Segmento alto: exige renda/relacionamento para aprovação.",
    fonte: "fdr.com.br",
    consultadoEm: DATA,
    volatilidade: "media",
  },
  {
    id: "nubank-ultravioleta",
    nome: "Nubank Ultravioleta",
    cashbackDeclarado: "1% (guia adota cenário conservador)",
    percentualEfetivo: 0.01,
    anuidadeAnual: 1068,
    observacao:
      "Isenta com R$8.000/mês de gasto ou R$50.000 investidos. Cashback rende 200% do CDI parado.",
    fonte: "techtudo.com.br (nota de divergência: parte das fontes cita 1,25%)",
    consultadoEm: DATA,
    volatilidade: "media",
  },
];
