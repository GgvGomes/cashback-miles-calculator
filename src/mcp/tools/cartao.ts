import { ganhoFloat, valorPresenteParcelas } from "@/lib/calc/credito";
import { retornoAnualCartao } from "@/lib/calc/cashback";
import { formatBRL } from "@/lib/calc/format";
import type { Veredito } from "@/lib/calc/types";
import { indicadores } from "@/data/indicadores";
import { contextoDe, refIndicador } from "../contexto";
import { gate, semUndefined, type Pergunta } from "../gates";
import { okResult } from "../resultado";
import { CartaoInput } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "calcular_cartao";

const OBRIGATORIOS: readonly Pergunta[] = [
  { campo: "gastoMensalBRL", pergunta: "Quanto você gasta por mês no cartão?", tipo: "number", unidade: "R$" },
  { campo: "percEfetivo", pergunta: "Qual o retorno efetivo do cartão em % do gasto (pontos convertidos em R$ ou cashback)?", tipo: "number", unidade: "%", dica: "Ex.: 1 = 1%. Para pontos, use pontos por real × valor do milheiro ÷ 1000." },
  { campo: "anuidadeBRL", pergunta: "Qual a anuidade anual do cartão (0 se isento)?", tipo: "number", unidade: "R$" },
];

/** Mesma regra da página web: retorno ≥ anuidade compensa; ≥ 80% limítrofe. */
export function vereditoCartao(retornoTotal: number, anuidade: number): Veredito {
  if (retornoTotal >= anuidade) return "ok";
  if (retornoTotal >= anuidade * 0.8) return "limite";
  return "nao";
}

export const cartaoTool = definirFerramenta({
  nome: NOME,
  titulo: "Cartão de crédito",
  descricao:
    "O cartão compensa a anuidade (recompensa + ganho do float)? Opcionalmente, qual desconto no PIX empata com parcelar sem juros. Pede os dados que faltarem.",
  inputSchema: CartaoInput,
  handler(args, opts) {
    const completos = { ...args, gastoMensalBRL: args.gastoMensalBRL ?? args.perfil?.gastoMensalBRL };
    const pendente = gate(NOME, completos, OBRIGATORIOS, opts);
    if (pendente) return pendente;
    const gastoMensalBRL = completos.gastoMensalBRL!;
    const percEfetivo = completos.percEfetivo!;
    const anuidadeBRL = completos.anuidadeBRL!;
    const { floatDias = 25, perfil } = completos;

    const float = ganhoFloat(gastoMensalBRL, floatDias, indicadores.cdiAnual.valor);
    const retornoRecompensa = retornoAnualCartao(gastoMensalBRL, percEfetivo / 100);
    const retornoTotal = retornoRecompensa + float.ganhoLiquidoAno;
    const veredito = vereditoCartao(retornoTotal, anuidadeBRL);

    const referencias = [refIndicador("cdiAnual", "CDI anual (ganho do float)")];
    const formula = [
      `recompensa/ano = ${formatBRL(gastoMensalBRL)} × 12 × ${percEfetivo}% = ${formatBRL(retornoRecompensa)}`,
      `float líquido/ano (${floatDias} dias a CDI ${(indicadores.cdiAnual.valor * 100).toFixed(1)}%) = ${formatBRL(float.ganhoLiquidoAno)}`,
      `retorno total = ${formatBRL(retornoTotal)} vs anuidade ${formatBRL(anuidadeBRL)} (limítrofe a partir de ${formatBRL(anuidadeBRL * 0.8)})`,
    ];

    let parcelamento: Record<string, number> | undefined;
    if (args.totalParceladoBRL && args.nParcelas) {
      const vp = valorPresenteParcelas(args.totalParceladoBRL, args.nParcelas, indicadores.taxaMensalLiquida.valor);
      const desconto = (1 - vp / args.totalParceladoBRL) * 100;
      parcelamento = { totalParceladoBRL: args.totalParceladoBRL, nParcelas: args.nParcelas, valorPresenteBRL: vp, descontoQueEmpataPct: desconto };
      referencias.push(refIndicador("taxaMensalLiquida", "taxa mensal líquida (valor presente das parcelas)"));
      formula.push(`valor presente de ${args.nParcelas}x de ${formatBRL(args.totalParceladoBRL / args.nParcelas)} = ${formatBRL(vp)} → desconto no PIX que empata: ${desconto.toFixed(1)}%`);
    }

    return okResult(
      {
        calculadora: NOME,
        entradas: semUndefined({ gastoMensalBRL, percEfetivo, anuidadeBRL, floatDias, totalParceladoBRL: args.totalParceladoBRL, nParcelas: args.nParcelas }),
        resultado: {
          retornoRecompensaAnoBRL: retornoRecompensa,
          ganhoFloatAnoBRL: float.ganhoLiquidoAno,
          saldoMedioFloatBRL: float.saldoMedio,
          retornoTotalAnoBRL: retornoTotal,
          anuidadeBRL,
          sobraAnoBRL: retornoTotal - anuidadeBRL,
          ...(parcelamento ? { parcelamento } : {}),
        },
        veredito,
        formula,
        contexto: contextoDe("cartao", referencias, perfil),
      },
      `Retorno anual ${formatBRL(retornoTotal)} (recompensa ${formatBRL(retornoRecompensa)} + float ${formatBRL(float.ganhoLiquidoAno)}) vs anuidade ${formatBRL(anuidadeBRL)}.${parcelamento ? ` Desconto no PIX que empata ${parcelamento.nParcelas}x: ${parcelamento.descontoQueEmpataPct.toFixed(1)}%.` : ""}`
    );
  },
});
