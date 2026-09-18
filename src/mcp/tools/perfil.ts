/**
 * `investigar_perfil`: a ferramenta de investigação. Colhe o cenário da
 * pessoa (programa, estratégia, objetivo, valores) via gates e devolve um
 * `perfil` que a IA cliente repassa às calculadoras + um roteiro de quais
 * ferramentas chamar e o que perguntar a seguir.
 *
 * Stateless: nada é guardado no servidor. O perfil vive na conversa.
 */
import { gate, semUndefined, type Pergunta } from "../gates";
import { infoResult } from "../resultado";
import { programaPorId } from "../contexto";
import { Estrategia, PerfilInput, PROGRAMA_IDS, type EstrategiaT, type PerfilT } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "investigar_perfil";

const OBRIGATORIOS: readonly Pergunta[] = [
  { campo: "programaPrincipal", pergunta: "Qual programa de pontos/milhas você mais usa ou está avaliando?", tipo: "enum", opcoes: PROGRAMA_IDS },
  { campo: "estrategia", pergunta: "O que você quer fazer agora: acumular pontos, resgatar já, decidir se assina um clube, ou avaliar um cartão?", tipo: "enum", opcoes: Estrategia.options },
  { campo: "objetivo", pergunta: "Descreva em uma frase o objetivo (ex.: 'viajar GRU→LIS em dezembro com 2 pessoas', 'zerar a anuidade do cartão').", tipo: "string" },
];

const ROTEIRO: Record<EstrategiaT, { ferramentas: string[]; perguntas: string[] }> = {
  acumular: {
    ferramentas: ["calcular_compra_de_pontos", "calcular_cenario", "calcular_clube"],
    perguntas: [
      "Há promoção de compra ou bônus de transferência ativa? Qual o preço e o bônus?",
      "Você já tem um resgate em mente para saber o valor de uso?",
      "Vai juntar mais de uma fonte (compra + clube + transferência)? Se sim, liste os passos para o cenário completo.",
    ],
  },
  resgatar_ja: {
    ferramentas: ["calcular_resgate", "calcular_valor_do_ponto"],
    perguntas: [
      "Qual o preço da passagem em dinheiro na mesma data/trecho/cabine?",
      "Quantas milhas + quanto de taxas a emissão pede?",
      "Quanto você pagou pelos pontos (CPM)? Se não souber, uso o preço-alvo do programa.",
    ],
  },
  comparar_clube: {
    ferramentas: ["calcular_clube", "calcular_compra_de_pontos"],
    perguntas: [
      "Qual plano (mensalidade e pontos/mês) e por quantos meses?",
      "Tem bônus de adesão ou bônus de transferência?",
      "Qual resgate você pretende fazer com esses pontos (para calcular o valor por mil)?",
    ],
  },
  cartao: {
    ferramentas: ["calcular_cartao"],
    perguntas: [
      "Quanto você gasta por mês no cartão e qual a anuidade?",
      "Quantos pontos por real (ou % de cashback) o cartão dá?",
      "Está pensando em parcelar alguma compra? Total e número de parcelas.",
    ],
  },
};

export const perfilTool = definirFerramenta({
  nome: NOME,
  titulo: "Investigar perfil",
  descricao:
    "Comece por aqui. Colhe o cenário da pessoa (programa, estratégia, objetivo, gasto mensal, saldo) e devolve um `perfil` para repassar às calculadoras, além de quais ferramentas usar e o que perguntar em seguida. Pede os dados que faltarem.",
  inputSchema: PerfilInput,
  handler(args, opts) {
    const pendente = gate(NOME, args, OBRIGATORIOS, opts);
    if (pendente) return pendente;
    const perfil = semUndefined(args) as PerfilT & { programaPrincipal: string; estrategia: EstrategiaT; objetivo: string };
    const programa = programaPorId(perfil.programaPrincipal)!;
    const roteiro = ROTEIRO[perfil.estrategia];

    const opcionaisFaltando = (["gastoMensalBRL", "saldoPontos", "temClube", "horizonteMeses"] as const).filter(
      (k) => perfil[k] === undefined
    );

    const structured = {
      status: "ok" as const,
      perfil,
      programa: {
        id: programa.id,
        nome: programa.nome,
        tipo: programa.tipo,
        precoAlvoCompraBRL: programa.precoAlvoCompra,
        valorDeUsoBRL: programa.valorDeUso,
        regua: programa.regua,
        fonte: programa.fonte,
        consultadoEm: programa.consultadoEm,
      },
      proximasFerramentas: roteiro.ferramentas,
      perguntasSugeridas: roteiro.perguntas,
      camposOpcionaisFaltando: opcionaisFaltando,
      instrucao:
        "Repasse este `perfil` no campo `perfil` das próximas ferramentas. Ao final, escreva um feedback personalizado usando `contexto.interpretacao` e cite fonte + data dos números. Não prometa retorno financeiro.",
    };

    return infoResult(
      structured,
      `Perfil: ${programa.nome} (${programa.tipo}), estratégia "${perfil.estrategia}", objetivo "${perfil.objetivo}". Próximas ferramentas: ${roteiro.ferramentas.join(", ")}. Perguntas sugeridas: ${roteiro.perguntas.join(" | ")}`
    );
  },
});
