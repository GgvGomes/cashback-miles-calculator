import { cpmAcumulado, cpmBlended, totalCusto, totalPontos, vereditoCenario } from "@/lib/calc/cenario";
import { formatBRL } from "@/lib/calc/format";
import type { Step } from "@/lib/calc/types";
import { contextoDe, programaPorId, refPrograma, type Referencia } from "../contexto";
import { precisaInfo, semUndefined, elicitar, type Pergunta } from "../gates";
import { okResult } from "../resultado";
import { CenarioInput, PROGRAMA_IDS } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "calcular_cenario";

const PERGUNTA_STEPS: Pergunta = {
  campo: "steps",
  pergunta:
    "Liste cada passo do cenário com: tipo (compra | clube | transferencia | gasto-bonificado | custo-extra), label, custoBRL e pontosGerados. Ex.: comprar 20.000 pts por R$ 588, depois transferir com 80% de bônus (custo 0, +16.000 pts).",
  tipo: "string",
  dica: "Custo-extra (taxa, anuidade) entra com pontosGerados = 0.",
};

const PERGUNTA_VALOR_USO: Pergunta = {
  campo: "valorDeUsoBRL",
  pergunta: "Quanto vale, em R$ por mil, o uso que você dará aos pontos? (Ou informe o programa e uso o valor de uso dele.)",
  tipo: "number",
  unidade: "R$/mil",
  opcoes: PROGRAMA_IDS,
};

/** Índice 1-based do passo que leva o acumulado acima do teto em definitivo; null se fecha dentro. */
export function passoQueEstraga(acumulados: number[], teto: number): number | null {
  if (acumulados.length === 0 || acumulados[acumulados.length - 1] <= teto) return null;
  for (let i = acumulados.length - 1; i >= 0; i--) {
    if (acumulados[i] <= teto) return i + 2;
  }
  return 1;
}

export const cenarioTool = definirFerramenta({
  nome: NOME,
  titulo: "Cenário completo",
  descricao:
    "Somando tudo — compra, clube, transferência, custos extras — o CPM blended compensa frente ao valor de uso? Mostra o CPM acumulado passo a passo e onde ele estoura o teto. Pede os dados que faltarem.",
  inputSchema: CenarioInput,
  handler(args, opts) {
    const programaId = args.programa ?? args.perfil?.programaPrincipal;
    const programa = programaPorId(programaId);
    const referencias: Referencia[] = [];

    let valorDeUso = args.valorDeUsoBRL;
    let origemValor = "informado";
    if (valorDeUso === undefined && programa && programa.valorDeUso !== null) {
      valorDeUso = programa.valorDeUso;
      origemValor = `valor de uso de ${programa.nome}`;
      referencias.push(refPrograma(programa, "valorDeUso"));
    }

    const faltam: Pergunta[] = [];
    if (!args.steps || args.steps.length === 0) faltam.push(PERGUNTA_STEPS);
    if (valorDeUso === undefined) faltam.push(PERGUNTA_VALOR_USO);
    if (faltam.length > 0) {
      // Steps é um array — elicitation só aceita campos planos, então
      // formulário só quando falta apenas o valor de uso.
      const soValor = faltam.length === 1 && faltam[0] === PERGUNTA_VALOR_USO;
      if (opts.podeElicitar && soValor) return elicitar(NOME, faltam);
      return precisaInfo(NOME, faltam, semUndefined({ ...args, programa: programaId }));
    }

    const steps: Step[] = args.steps!;
    const custo = totalCusto(steps);
    const pontos = totalPontos(steps);
    const cpm = cpmBlended(steps);
    const veredito = vereditoCenario(cpm, valorDeUso!);
    const teto = valorDeUso! * 0.8;
    const acumulados = steps.map((s, i) => ({ passo: i + 1, label: s.label, cpmAcumuladoBRL: cpmAcumulado(steps, i) }));
    // Passo que "estraga": só faz sentido se o cenário fecha acima do teto.
    // Como um passo de custo zero (transferência bonificada) derruba o acumulado,
    // o culpado é o passo seguinte ao último em que o acumulado ainda cabia.
    const passoQueEstoura = passoQueEstraga(acumulados.map((a) => a.cpmAcumuladoBRL), teto);

    return okResult(
      {
        calculadora: NOME,
        entradas: semUndefined({ steps, valorDeUsoBRL: valorDeUso, programa: programa?.id }),
        resultado: {
          custoTotalBRL: custo,
          pontosTotais: pontos,
          cpmBlendedBRL: cpm,
          valorDeUsoBRL: valorDeUso!,
          origemValorDeUso: origemValor,
          tetoBRL: teto,
          acumulados,
          passoQueEstoura,
        },
        veredito,
        formula: [
          `custo total = ${formatBRL(custo)}; pontos totais = ${pontos}`,
          `CPM blended = ${formatBRL(custo)} ÷ (${pontos} ÷ 1000) = ${formatBRL(cpm)}/mil`,
          `teto = 80% × ${formatBRL(valorDeUso!)} (${origemValor}) = ${formatBRL(teto)}/mil; limítrofe até ${formatBRL(teto * 1.15)}/mil`,
        ],
        contexto: contextoDe("cenario", referencias, args.perfil),
      },
      `CPM blended ${formatBRL(cpm)}/mil (${steps.length} passos) vs teto ${formatBRL(teto)}/mil.${passoQueEstoura ? ` O passo ${passoQueEstoura} é onde o acumulado estoura o teto.` : ""}`
    );
  },
});
