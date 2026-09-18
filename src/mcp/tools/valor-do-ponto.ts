import { classificaRazao, razaoRetorno, valorPorMil, valorPorPonto, vereditoResgate } from "@/lib/calc/resgate";
import { formatBRL } from "@/lib/calc/format";
import { contextoDe } from "../contexto";
import { gate, semUndefined, type Pergunta } from "../gates";
import { okResult } from "../resultado";
import { ValorDoPontoInput } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "calcular_valor_do_ponto";

const OBRIGATORIOS: readonly Pergunta[] = [
  { campo: "precoPassagemBRL", pergunta: "Quanto custaria essa mesma passagem em dinheiro (mesma data, trecho e cabine)?", tipo: "number", unidade: "R$" },
  { campo: "taxasBRL", pergunta: "Quanto você paga de taxas mesmo emitindo com pontos?", tipo: "number", unidade: "R$" },
  { campo: "pontos", pergunta: "Quantos pontos ou milhas o resgate exige?", tipo: "number", unidade: "pontos" },
  { campo: "cpmPagoBRL", pergunta: "Quanto você pagou (ou pagaria) por mil pontos — o CPM?", tipo: "number", unidade: "R$/mil", dica: "Se não souber, use o preço-alvo do programa (veja listar_programas)." },
];

export const valorDoPontoTool = definirFerramenta({
  nome: NOME,
  titulo: "Valor do ponto",
  descricao:
    "Quanto vale o seu ponto nesse resgate específico? Compara o valor por ponto obtido na passagem com o custo por ponto que você pagou (razão de retorno). Pede os dados que faltarem.",
  inputSchema: ValorDoPontoInput,
  handler(args, opts) {
    const pendente = gate(NOME, args, OBRIGATORIOS, opts);
    if (pendente) return pendente;
    const { precoPassagemBRL, taxasBRL, pontos, cpmPagoBRL, perfil } = args as Required<typeof args>;

    const vpm = valorPorMil(precoPassagemBRL, taxasBRL, pontos);
    const vpp = valorPorPonto(precoPassagemBRL, taxasBRL, pontos);
    const razao = razaoRetorno(vpp, cpmPagoBRL);
    const faixa = classificaRazao(razao);
    const veredito = vereditoResgate(razao);

    return okResult(
      {
        calculadora: NOME,
        entradas: semUndefined({ precoPassagemBRL, taxasBRL, pontos, cpmPagoBRL }),
        resultado: { valorPorMilBRL: vpm, valorPorPontoBRL: vpp, razaoRetorno: razao, faixa },
        veredito,
        formula: [
          `valor por ponto = (${formatBRL(precoPassagemBRL)} − ${formatBRL(taxasBRL)}) ÷ ${pontos} = ${vpp.toFixed(4)}`,
          `custo por ponto = ${formatBRL(cpmPagoBRL)} ÷ 1000 = ${(cpmPagoBRL / 1000).toFixed(4)}`,
          `razão = ${vpp.toFixed(4)} ÷ ${(cpmPagoBRL / 1000).toFixed(4)} = ${razao.toFixed(2)}×`,
        ],
        contexto: contextoDe("valorDoPonto", [], perfil),
      },
      `Valor por mil: ${formatBRL(vpm)}. Razão de retorno: ${razao.toFixed(2)}× (${faixa}).`
    );
  },
});
