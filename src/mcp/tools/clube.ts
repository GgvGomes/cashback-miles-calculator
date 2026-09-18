import { cpmComAdesao, custoOportunidade, vereditoClube } from "@/lib/calc/clube";
import { cpmEfetivo } from "@/lib/calc/cpm";
import { formatBRL } from "@/lib/calc/format";
import { indicadores } from "@/data/indicadores";
import { contextoDe, programaPorId, refIndicador, refPrograma, type Referencia } from "../contexto";
import { gate, precisaInfo, semUndefined, type Pergunta } from "../gates";
import { okResult } from "../resultado";
import { ClubeInput, PROGRAMA_IDS } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "calcular_clube";

const OBRIGATORIOS: readonly Pergunta[] = [
  { campo: "programa", pergunta: "Clube de qual programa?", tipo: "enum", opcoes: PROGRAMA_IDS },
  { campo: "mensalidadeBRL", pergunta: "Qual a mensalidade do plano?", tipo: "number", unidade: "R$" },
  { campo: "pontosMes", pergunta: "Quantos pontos o plano entrega por mês?", tipo: "number", unidade: "pontos" },
];

const PERGUNTA_RESGATE: Pergunta = {
  campo: "valorPorMilResgateBRL",
  pergunta: "Quanto vale, em R$ por mil pontos, o resgate que você pretende fazer com esses pontos? (Ou informe precoPassagemBRL, taxasBRL e milhasNecessarias e eu calculo.)",
  tipo: "number",
  unidade: "R$/mil",
  dica: "Sem um resgate-alvo não dá para dizer se o clube compensa.",
};

export const clubeTool = definirFerramenta({
  nome: NOME,
  titulo: "Clube de assinatura",
  descricao:
    "Vale assinar o clube de pontos, considerando adesão, bônus e o resgate que você pretende fazer? Compara o CPM efetivo do clube com o valor por mil do resgate. Pede os dados que faltarem.",
  inputSchema: ClubeInput,
  handler(args, opts) {
    const completos = { ...args, programa: args.programa ?? args.perfil?.programaPrincipal };
    const pendente = gate(NOME, completos, OBRIGATORIOS, opts);
    if (pendente) return pendente;
    const {
      programa: programaId,
      mensalidadeBRL,
      pontosMes,
      meses = 12,
      bonusAdesao = 0,
      bonusTransferencia = 0,
      pagoAVista = false,
      perfil,
    } = completos as Required<typeof completos>;
    const programa = programaPorId(programaId)!;
    const ehCoalizao = programa.tipo === "coalizao";

    // Resgate-alvo: explícito > passagem/taxas/milhas > valor de uso do programa.
    const referencias: Referencia[] = [];
    let valorPorMilResgate: number | undefined = args.valorPorMilResgateBRL;
    let origemResgate = "informado";
    if (valorPorMilResgate === undefined && args.precoPassagemBRL !== undefined && args.milhasNecessarias) {
      valorPorMilResgate = (args.precoPassagemBRL - (args.taxasBRL ?? 0)) / (args.milhasNecessarias / 1000);
      origemResgate = "calculado da passagem";
    }
    if (valorPorMilResgate === undefined && programa.valorDeUso !== null) {
      valorPorMilResgate = programa.valorDeUso;
      origemResgate = `valor de uso de ${programa.nome}`;
      referencias.push(refPrograma(programa, "valorDeUso"));
    }
    if (valorPorMilResgate === undefined) {
      return precisaInfo(NOME, [PERGUNTA_RESGATE], semUndefined(completos));
    }

    const cpmClubeValor = cpmComAdesao(mensalidadeBRL, meses, pontosMes, bonusAdesao);
    const bonus = ehCoalizao ? bonusTransferencia : 0;
    const cpmEf = cpmEfetivo(cpmClubeValor, bonus);
    const totalPago = mensalidadeBRL * meses;
    const oportunidade = pagoAVista
      ? custoOportunidade(totalPago, indicadores.taxaMensalLiquida.valor, meses)
      : 0;
    if (pagoAVista) referencias.push(refIndicador("taxaMensalLiquida", "taxa mensal líquida (custo de oportunidade)"));
    const veredito = vereditoClube(cpmEf, valorPorMilResgate);
    const teto = valorPorMilResgate * 0.8;

    const formula = [
      `CPM do clube = (${formatBRL(mensalidadeBRL)} × ${meses}) ÷ ((${pontosMes} × ${meses} + ${bonusAdesao}) ÷ 1000) = ${formatBRL(cpmClubeValor)}/mil`,
    ];
    if (bonus > 0) formula.push(`CPM efetivo com bônus ${bonus * 100}% = ${formatBRL(cpmEf)}/mil`);
    formula.push(`teto = 80% × ${formatBRL(valorPorMilResgate)} (${origemResgate}) = ${formatBRL(teto)}/mil`);
    if (pagoAVista) formula.push(`custo de oportunidade do pagamento à vista ≈ ${formatBRL(oportunidade)}`);

    return okResult(
      {
        calculadora: NOME,
        entradas: semUndefined({ programa: programa.id, mensalidadeBRL, pontosMes, meses, bonusAdesao, bonusTransferencia: bonus, pagoAVista, valorPorMilResgateBRL: valorPorMilResgate }),
        resultado: {
          cpmClubeBRL: cpmClubeValor,
          cpmEfetivoBRL: cpmEf,
          valorPorMilResgateBRL: valorPorMilResgate,
          origemResgate,
          tetoBRL: teto,
          totalPagoBRL: totalPago,
          custoOportunidadeBRL: oportunidade,
          pontosTotais: pontosMes * meses + bonusAdesao,
        },
        veredito,
        formula,
        contexto: contextoDe("clube", referencias, perfil),
      },
      `CPM efetivo do clube: ${formatBRL(cpmEf)}/mil vs teto ${formatBRL(teto)}/mil (80% do resgate a ${formatBRL(valorPorMilResgate)}/mil).`
    );
  },
});
