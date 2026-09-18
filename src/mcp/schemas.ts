/**
 * Schemas zod (v4) das ferramentas MCP.
 *
 * Todos os campos são opcionais de propósito: a checagem de "o que falta"
 * é feita em runtime por `gates.ts`, que devolve `precisa_info` (ou pede via
 * elicitation) em vez de o cliente receber um erro de validação seco.
 */
import * as z from "zod";
import { programas } from "@/data/programas";

export const PROGRAMA_IDS = programas.map((p) => p.id) as [string, ...string[]];
export const ProgramaId = z.enum(PROGRAMA_IDS);
export type ProgramaIdT = z.infer<typeof ProgramaId>;

export const Estrategia = z.enum(["acumular", "resgatar_ja", "comparar_clube", "cartao"]);
export type EstrategiaT = z.infer<typeof Estrategia>;

const num = z.number().finite();
const numPos = num.nonnegative();

/** Perfil colhido por `investigar_perfil`; o cliente repassa nas outras tools. */
export const Perfil = z.object({
  programaPrincipal: ProgramaId.optional(),
  estrategia: Estrategia.optional(),
  objetivo: z.string().max(500).optional(),
  gastoMensalBRL: numPos.optional(),
  saldoPontos: numPos.optional(),
  temClube: z.boolean().optional(),
  horizonteMeses: z.number().int().positive().max(120).optional(),
});
export type PerfilT = z.infer<typeof Perfil>;

const comPerfil = { perfil: Perfil.optional() };

export const ValorDoPontoInput = z.object({
  precoPassagemBRL: numPos.optional(),
  taxasBRL: numPos.optional(),
  pontos: numPos.optional(),
  cpmPagoBRL: numPos.optional(),
  ...comPerfil,
});

export const CompraDePontosInput = z.object({
  programa: ProgramaId.optional(),
  precoPagoBRL: numPos.optional(),
  pontosRecebidos: numPos.optional(),
  /** Fração 0–1 (ex.: 0.8 = 80%). Só vale para programas de coalizão. */
  bonusTransferencia: num.min(0).max(5).optional(),
  ...comPerfil,
});

export const ClubeInput = z.object({
  programa: ProgramaId.optional(),
  mensalidadeBRL: numPos.optional(),
  pontosMes: numPos.optional(),
  meses: z.number().int().positive().max(120).optional(),
  bonusAdesao: numPos.optional(),
  /** Fração 0–1. Só vale para coalizão. */
  bonusTransferencia: num.min(0).max(5).optional(),
  /** Valor por mil do resgate-alvo; se omitido, tenta passagem/taxas/milhas ou valorDeUso do programa. */
  valorPorMilResgateBRL: numPos.optional(),
  precoPassagemBRL: numPos.optional(),
  taxasBRL: numPos.optional(),
  milhasNecessarias: numPos.optional(),
  pagoAVista: z.boolean().optional(),
  ...comPerfil,
});

export const ResgateInput = z.object({
  precoPassagemBRL: numPos.optional(),
  taxasBRL: numPos.optional(),
  milhas: numPos.optional(),
  /** Preço-alvo de compra do milheiro; se omitido, usa o do programa. */
  precoAlvoBRL: numPos.optional(),
  programa: ProgramaId.optional(),
  ...comPerfil,
});

export const CartaoInput = z.object({
  gastoMensalBRL: numPos.optional(),
  /** Retorno efetivo em % (ex.: 1 = 1%). */
  percEfetivo: numPos.optional(),
  anuidadeBRL: numPos.optional(),
  floatDias: z.number().int().min(0).max(60).optional(),
  totalParceladoBRL: numPos.optional(),
  nParcelas: z.number().int().positive().max(48).optional(),
  ...comPerfil,
});

export const StepInput = z.object({
  tipo: z.enum(["compra", "clube", "transferencia", "gasto-bonificado", "custo-extra"]),
  label: z.string().max(120),
  custoBRL: numPos,
  pontosGerados: numPos,
  programaDestino: z.string().max(60).optional(),
});

export const CenarioInput = z.object({
  steps: z.array(StepInput).max(30).optional(),
  valorDeUsoBRL: numPos.optional(),
  programa: ProgramaId.optional(),
  ...comPerfil,
});

export const PerfilInput = z.object({
  programaPrincipal: ProgramaId.optional(),
  estrategia: Estrategia.optional(),
  objetivo: z.string().max(500).optional(),
  gastoMensalBRL: numPos.optional(),
  saldoPontos: numPos.optional(),
  temClube: z.boolean().optional(),
  horizonteMeses: z.number().int().positive().max(120).optional(),
});

export const Vazio = z.object({});
