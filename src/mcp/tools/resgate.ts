import { classificaRazao, razaoRetorno, valorPorMil, valorPorPonto } from "@/lib/calc/resgate";
import { formatBRL } from "@/lib/calc/format";
import type { Veredito } from "@/lib/calc/types";
import { contextoDe, programaPorId, refPrograma, type Referencia } from "../contexto";
import { gate, precisaInfo, semUndefined, type Pergunta } from "../gates";
import { okResult } from "../resultado";
import { PROGRAMA_IDS, ResgateInput } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "calcular_resgate";

const OBRIGATORIOS: readonly Pergunta[] = [
  { campo: "precoPassagemBRL", pergunta: "Quanto custaria a passagem em dinheiro?", tipo: "number", unidade: "R$" },
  { campo: "taxasBRL", pergunta: "Quanto de taxas você paga na emissão com milhas?", tipo: "number", unidade: "R$" },
  { campo: "milhas", pergunta: "Quantas milhas a emissão exige?", tipo: "number", unidade: "milhas" },
];

const PERGUNTA_ALVO: Pergunta = {
  campo: "precoAlvoBRL",
  pergunta: "Qual o preço-alvo de compra do milheiro para comparar? (Ou informe o programa e uso o preço-alvo dele.)",
  tipo: "number",
  unidade: "R$/mil",
  opcoes: PROGRAMA_IDS,
};

/** Mesma regra da página web: ≥ alvo compensa; ≥ 80% do alvo limítrofe. */
export function vereditoPorAlvo(valorPorMilValor: number, alvo: number): Veredito {
  if (valorPorMilValor >= alvo) return "ok";
  if (valorPorMilValor >= alvo * 0.8) return "limite";
  return "nao";
}

export const resgateTool = definirFerramenta({
  nome: NOME,
  titulo: "Resgate / emissão",
  descricao:
    "Quanto esse resgate devolve por milheiro? Compara o valor por mil da passagem emitida com o preço-alvo de compra do programa. Pede os dados que faltarem.",
  inputSchema: ResgateInput,
  handler(args, opts) {
    const completos = { ...args, programa: args.programa ?? args.perfil?.programaPrincipal };
    const pendente = gate(NOME, completos, OBRIGATORIOS, opts);
    if (pendente) return pendente;
    const { precoPassagemBRL, taxasBRL, milhas, perfil } = completos as Required<typeof completos>;

    const referencias: Referencia[] = [];
    const programa = programaPorId(completos.programa);
    let alvo = completos.precoAlvoBRL;
    let origemAlvo = "informado";
    if (alvo === undefined && programa) {
      alvo = programa.precoAlvoCompra;
      origemAlvo = `preço-alvo de ${programa.nome}`;
      referencias.push(refPrograma(programa, "precoAlvoCompra"));
    }
    if (alvo === undefined) return precisaInfo(NOME, [PERGUNTA_ALVO], semUndefined(completos));

    const vpm = valorPorMil(precoPassagemBRL, taxasBRL, milhas);
    const vpp = valorPorPonto(precoPassagemBRL, taxasBRL, milhas);
    const razao = razaoRetorno(vpp, alvo);
    const faixa = classificaRazao(razao);
    const veredito = vereditoPorAlvo(vpm, alvo);

    return okResult(
      {
        calculadora: NOME,
        entradas: semUndefined({ precoPassagemBRL, taxasBRL, milhas, precoAlvoBRL: alvo, programa: programa?.id }),
        resultado: { valorPorMilBRL: vpm, precoAlvoBRL: alvo, origemAlvo, razaoRetorno: razao, faixa },
        veredito,
        formula: [
          `valor por mil = (${formatBRL(precoPassagemBRL)} − ${formatBRL(taxasBRL)}) ÷ (${milhas} ÷ 1000) = ${formatBRL(vpm)}/mil`,
          `comparação: ${formatBRL(vpm)} vs alvo ${formatBRL(alvo)} (${origemAlvo}); limítrofe a partir de ${formatBRL(alvo * 0.8)}`,
          `razão = ${razao.toFixed(2)}× (${faixa})`,
        ],
        contexto: contextoDe("resgate", referencias, perfil),
      },
      `Resgate devolve ${formatBRL(vpm)}/mil contra alvo de ${formatBRL(alvo)}/mil (razão ${razao.toFixed(2)}×).`
    );
  },
});
