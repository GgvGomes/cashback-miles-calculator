import { classificaCPM, cpm, cpmEfetivo } from "@/lib/calc/cpm";
import { formatBRL } from "@/lib/calc/format";
import type { ClassificacaoCPM, Veredito } from "@/lib/calc/types";
import { contextoDe, programaPorId, refPrograma } from "../contexto";
import { gate, semUndefined, type Pergunta } from "../gates";
import { okResult } from "../resultado";
import { CompraDePontosInput, PROGRAMA_IDS } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "calcular_compra_de_pontos";

const OBRIGATORIOS: readonly Pergunta[] = [
  { campo: "programa", pergunta: "Em qual programa você está comprando os pontos?", tipo: "enum", opcoes: PROGRAMA_IDS },
  { campo: "precoPagoBRL", pergunta: "Quanto você vai pagar no total?", tipo: "number", unidade: "R$" },
  { campo: "pontosRecebidos", pergunta: "Quantos pontos você recebe por esse valor (sem contar bônus de transferência)?", tipo: "number", unidade: "pontos" },
];

/** Mesma tabela usada na página web: classe da régua → veredito. */
export function classificacaoParaVeredito(c: ClassificacaoCPM): Veredito {
  if (c === "excepcional" || c === "bom") return "ok";
  if (c === "aceitavel") return "limite";
  return "nao";
}

export const compraDePontosTool = definirFerramenta({
  nome: NOME,
  titulo: "Compra de pontos",
  descricao:
    "Essa compra de pontos (avulsa ou com bônus de transferência) vale o preço? Calcula o CPM (custo por milheiro) e classifica na régua do programa. Pede os dados que faltarem.",
  inputSchema: CompraDePontosInput,
  handler(args, opts) {
    const completos = { ...args, programa: args.programa ?? args.perfil?.programaPrincipal };
    const pendente = gate(NOME, completos, OBRIGATORIOS, opts);
    if (pendente) return pendente;
    const { programa: programaId, precoPagoBRL, pontosRecebidos, bonusTransferencia = 0, perfil } =
      completos as Required<typeof completos>;
    const programa = programaPorId(programaId)!;
    const ehCoalizao = programa.tipo === "coalizao";

    const cpmBase = cpm(precoPagoBRL, pontosRecebidos);
    const aplicaBonus = ehCoalizao && bonusTransferencia > 0;
    const cpmFinal = aplicaBonus ? cpmEfetivo(cpmBase, bonusTransferencia) : cpmBase;
    const classificacao = classificaCPM(programa.id, cpmFinal);
    const veredito = classificacaoParaVeredito(classificacao);

    const formula = [`CPM base = ${formatBRL(precoPagoBRL)} ÷ (${pontosRecebidos} ÷ 1000) = ${formatBRL(cpmBase)}/mil`];
    if (aplicaBonus) {
      formula.push(`CPM efetivo = ${formatBRL(cpmBase)} ÷ (1 + ${bonusTransferencia}) = ${formatBRL(cpmFinal)}/mil`);
    } else if (bonusTransferencia > 0 && !ehCoalizao) {
      formula.push(`bônus de transferência ignorado: ${programa.nome} é programa aéreo, não coalizão.`);
    }
    formula.push(
      `régua ${programa.nome}: excepcional ≤ ${programa.regua.excepcional}, bom ≤ ${programa.regua.bom}, aceitável ≤ ${programa.regua.aceitavel} → ${classificacao}`
    );

    return okResult(
      {
        calculadora: NOME,
        entradas: semUndefined({ programa: programa.id, precoPagoBRL, pontosRecebidos, bonusTransferencia }),
        resultado: {
          cpmBaseBRL: cpmBase,
          cpmFinalBRL: cpmFinal,
          classificacao,
          regua: programa.regua,
          precoAlvoCompraBRL: programa.precoAlvoCompra,
          bonusAplicado: aplicaBonus,
        },
        veredito,
        formula,
        contexto: contextoDe("compraDePontos", [refPrograma(programa, "precoAlvoCompra")], perfil),
      },
      `CPM final: ${formatBRL(cpmFinal)}/mil em ${programa.nome} — classificação ${classificacao} (preço-alvo ${formatBRL(programa.precoAlvoCompra)}/mil).`
    );
  },
});
