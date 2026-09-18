import type { ConteudoSeo } from "./tipos";

export const compraDePontos: ConteudoSeo = {
  titulo: "Calculadora de compra de pontos: comprar milhas vale a pena?",
  resumo:
    "Esta calculadora de compra de pontos transforma qualquer oferta em um número só, o CPM (custo por mil pontos), aplica o bônus de transferência e diz se a compra cabe na régua do programa. Comprar milhas vale a pena quando o milheiro sai abaixo do preço-alvo — e só quando você já sabe em que resgate vai usá-las.",
  secoes: [
    {
      titulo: "O que é CPM (custo por mil pontos)",
      paragrafos: [
        "CPM é quanto você paga por cada milheiro (mil pontos). A conta é simples: divida o dinheiro desembolsado pela quantidade de pontos recebidos, já em milhares. Se uma oferta cobra R$ 588 por 20.000 pontos, o CPM é 588 ÷ 20 = R$ 29,40 por mil.",
        "O CPM existe para colocar fontes diferentes na mesma régua. Compra direta, shopping de pontos, clube de assinatura e portal de viagem cobram de jeitos diferentes — em preço, em sobrepreço ou em mensalidade — mas todas viram um custo por milheiro, e aí dá para comparar. Sem esse número, você compara oferta com oferta pelo desconto anunciado, que é exatamente o que o programa quer que você faça.",
      ],
    },
    {
      titulo: "Como calcular o CPM efetivo com bônus de transferência",
      paragrafos: [
        "Quando você compra pontos em um programa de coalizão (Livelo, Esfera, iupp), eles ainda precisam ser transferidos para um programa aéreo (Smiles, LATAM Pass, TudoAzul) antes de virar passagem. Se a transferência tem bônus, cada mil pontos vira mais de mil milhas — e o custo real de cada milheiro cai. A fórmula é CPM efetivo = CPM ÷ (1 + bônus). Com 80% de bônus, divida por 1,8; com 100%, divida por 2.",
        "Exemplo: pontos Livelo comprados a R$ 29,50 por mil e transferidos para a Smiles com 100% de bônus. CPM efetivo = 29,50 ÷ 2 = R$ 14,75 por mil milhas Smiles. É esse número, não os R$ 29,50, que você compara com a régua da Smiles.",
        "Dois cuidados. Primeiro: o divisor só vale para programa de coalizão. Milha comprada direto na aérea já nasce lá, não tem transferência e portanto não tem bônus de transferência sobre ela. Segundo: bônus de 80% a 100% é campanha, não regra. Faça a conta também com o bônus em 0% e veja se a compra ainda faz sentido.",
      ],
    },
    {
      titulo: "Como usar a régua por programa",
      paragrafos: [
        "Cada programa tem faixas de CPM: excepcional, bom, aceitável e ruim. A calculadora classifica o seu CPM efetivo nessas faixas automaticamente. Excepcional ou bom: dentro da régua, compra faz sentido. Aceitável: no limite, só se o resgate já está definido. Ruim: acima da régua, não compre — espere a próxima promoção.",
        "As faixas são ancoradas no preço-alvo de compra de cada programa, e esse preço muda com o tempo, conforme campanhas e mudanças de tabela. Por isso a calculadora mostra a fonte e a data de cada valor. No exemplo acima, os R$ 14,75 por mil ficaram abaixo do preço-alvo da Smiles vigente na data da fonte, o que classifica a compra como boa.",
        "Antes de fechar, aplique o teste final: você faria essa compra se não houvesse ponto nenhum? Ponto comprado sem resgate em mente é dinheiro parado em um ativo que perde valor toda vez que o programa muda a tabela.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Vale a pena comprar milhas?",
      resposta:
        "Só em duas condições ao mesmo tempo: o CPM efetivo (já com bônus de transferência) fica dentro da régua do programa, e você já sabe qual resgate vai fazer com esses pontos. Fora disso, a compra imobiliza dinheiro em um ativo que o programa pode desvalorizar a qualquer momento.",
    },
    {
      pergunta: "O que é CPM em milhas?",
      resposta:
        "CPM é o custo por mil pontos: quanto você pagou por cada milheiro. Fórmula: dinheiro gasto ÷ (pontos recebidos ÷ 1.000). Serve para comparar compra direta, clube, shopping de pontos e portal na mesma régua.",
    },
    {
      pergunta: "Como funciona o bônus de transferência da Livelo?",
      resposta:
        "Em campanhas, a Livelo (ou outro programa de coalizão) entrega mais milhas do que os pontos transferidos: 100% de bônus significa que 1.000 pontos viram 2.000 milhas na aérea. O efeito no custo é dividir o CPM por (1 + bônus). O bônus varia por campanha e por programa aéreo de destino, e nem sempre está disponível — confira a campanha vigente antes de comprar.",
    },
    {
      pergunta: "Quanto custa o milheiro?",
      resposta:
        "Depende do programa e da oferta do momento. O que importa não é o preço de tabela, e sim o CPM efetivo depois do bônus e se ele cabe na régua do programa. A calculadora mostra o preço-alvo de cada programa com fonte e data, porque esses valores mudam ao longo do ano.",
    },
    {
      pergunta: "Comprar pontos com bônus compensa?",
      resposta:
        "Compensa quando o CPM efetivo (CPM ÷ (1 + bônus)) fica dentro da régua do programa aéreo de destino. Um bônus alto não salva uma compra cara: refaça a conta com o bônus em 0% e, se a compra só sobrevive com o bônus máximo, ela é frágil.",
    },
  ],
  relacionadas: [
    {
      href: "/valor-do-ponto",
      titulo: "Valor do ponto",
      porque: "mostra quanto cada ponto devolve no resgate, o outro lado desta conta.",
    },
    {
      href: "/clube",
      titulo: "Clube de pontos",
      porque: "calcula o CPM de uma assinatura mensal com bônus de adesão diluído.",
    },
    {
      href: "/cenario",
      titulo: "Cenário completo",
      porque: "empilha compra, clube e transferência num único CPM combinado.",
    },
  ],
  fonte:
    "04-acumulo-pontos.md (CPM de entrada, bônus de transferência e régua por programa) e 06-clubes-calculadora.md (CPM efetivo)",
  consultadoEm: "2026-09-18",
};
