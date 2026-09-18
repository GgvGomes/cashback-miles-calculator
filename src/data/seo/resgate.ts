import type { ConteudoSeo } from "./tipos";

export const resgate: ConteudoSeo = {
  titulo: "Calculadora de resgate de milhas: o valor do milheiro no resgate",
  resumo:
    "Esta calculadora de resgate de milhas descobre quanto cada milheiro (mil pontos) devolve em uma emissão específica e compara com o preço-alvo de compra do programa. Se o resgate devolve mais do que custaria comprar os pontos, emita; se devolve menos, pague em dinheiro e guarde as milhas.",
  secoes: [
    {
      titulo: "O que é o valor por mil no resgate",
      paragrafos: [
        "Valor por mil é quanto de dinheiro cada milheiro devolve quando você o troca por uma passagem. A fórmula: (preço da passagem em dinheiro − taxas que você paga mesmo assim) ÷ (milhas usadas ÷ 1.000). As taxas saem da conta porque você paga as taxas de embarque em dinheiro de qualquer jeito; o que as milhas realmente cobrem é o resto.",
        "É a mesma régua do CPM (custo por mil pontos), só que virada do avesso. O CPM mede quanto você pagou por mil pontos; o valor por mil mede quanto recebeu de volta. Use o preço real que você pagaria pela passagem, na mesma data, trecho e cabine. Se você jamais compraria aquele assento em dinheiro, o resgate dele não vale aquele preço para você.",
      ],
    },
    {
      titulo: "Como comparar com o preço-alvo de compra do programa",
      paragrafos: [
        "O preço-alvo de compra é o máximo que vale a pena pagar para comprar mil pontos naquele programa — Smiles, LATAM Pass, TudoAzul, cada um tem o seu. Ele funciona como custo de oportunidade: se um resgate devolve menos por milheiro do que custaria repor esses pontos, você está entregando ponto barato demais. Esses valores mudam com o tempo, e por isso a calculadora mostra fonte e data de cada um.",
        "A calculadora dá três vereditos. Compensa: o valor por mil é maior ou igual ao preço-alvo. Limítrofe: fica entre 80% e 100% do preço-alvo — emita só se a viagem já está decidida. Não compensa: fica abaixo de 80% do preço-alvo. Um resgate que devolve R$ 21 por mil contra um preço-alvo de R$ 21 por mil fica exatamente na linha: não é ruim, mas não é o resgate que justifica o trabalho de acumular.",
      ],
    },
    {
      titulo: "Quando emitir com milhas e quando pagar em dinheiro",
      paragrafos: [
        "Exemplo: passagem de R$ 1.700 em dinheiro, resgate por 15.000 milhas mais R$ 90 de taxas. Valor por mil = (1.700 − 90) ÷ 15 = R$ 107,33 por milheiro. Contra um preço-alvo de R$ 26 por mil, é mais de quatro vezes o custo de repor os pontos. Emita.",
        "Agora inverta: a mesma passagem de R$ 1.700 exigindo 90.000 milhas devolveria R$ 17,89 por mil. Abaixo de 80% do preço-alvo, não compensa. Pague em dinheiro, acumule pontos na compra e guarde as milhas para uma emissão em que a tabela esteja a seu favor. Quem paga com milhas uma passagem barata gasta o ativo mais caro que tem para economizar o mais barato.",
        "A regra prática: compare sempre o valor por mil do resgate com o preço-alvo do programa que emitiu, nunca com o preço da coalizão de origem. Pontos Livelo que viraram milhas Smiles são julgados pela régua da Smiles.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Quanto vale o milheiro Smiles, LATAM Pass ou Azul no resgate?",
      resposta:
        "Não existe um valor fixo: depende da passagem. Calcule (preço em dinheiro − taxas) ÷ (milhas ÷ 1.000) para cada emissão. O que existe de fixo é o preço-alvo de compra de cada programa, que serve de referência mínima; ele muda com o tempo e a calculadora mostra a fonte e a data do valor usado.",
    },
    {
      pergunta: "Compensa pagar passagem com milhas ou em dinheiro?",
      resposta:
        "Compensa emitir quando o valor por mil do resgate é maior ou igual ao preço-alvo de compra do programa. Entre 80% e 100% do preço-alvo é limítrofe. Abaixo disso, pague em dinheiro, acumule pontos na compra e guarde as milhas para um resgate melhor.",
    },
    {
      pergunta: "Como calcular o valor por mil de um resgate?",
      resposta:
        "Pegue o preço da mesma passagem em dinheiro, subtraia as taxas que você paga mesmo com milhas e divida pelas milhas usadas em milhares. Exemplo: (1.700 − 90) ÷ 15 = R$ 107,33 por milheiro.",
    },
    {
      pergunta: "Por que subtrair as taxas do preço da passagem?",
      resposta:
        "Porque as taxas de embarque são pagas em dinheiro tanto na emissão com milhas quanto na compra normal. Elas não fazem parte do que as milhas cobrem, então inflariam o valor do milheiro se ficassem na conta.",
    },
    {
      pergunta: "Meus pontos vieram do cartão, de graça. Ainda preciso comparar?",
      resposta:
        "Sim. Ponto não é de graça: ele tem custo de oportunidade, que é o preço-alvo de compra do programa. Se o resgate devolve menos do que custaria comprar aqueles pontos, você está usando mal um ativo que poderia render mais em outra emissão.",
    },
  ],
  relacionadas: [
    {
      href: "/valor-do-ponto",
      titulo: "Valor do ponto",
      porque: "calcula a razão de retorno entre o valor por ponto e o CPM que você pagou.",
    },
    {
      href: "/compra-de-pontos",
      titulo: "Compra de pontos",
      porque: "descobre o CPM efetivo de uma compra, o número que este resgate precisa superar.",
    },
    {
      href: "/cartao",
      titulo: "Cartão de crédito",
      porque: "avalia se a anuidade do cartão se paga com os pontos que ele gera.",
    },
  ],
  fonte:
    "06-clubes-calculadora.md (valor por mil no resgate, regra de corte) e 05-usar-maximizar.md (preço-alvo de compra, exemplo GRU–SCL)",
  consultadoEm: "2026-09-18",
};
