import type { ConteudoSeo } from "./tipos";

export const valorDoPonto: ConteudoSeo = {
  titulo: "Calculadora de valor do ponto e da milha: quanto o seu resgate devolve",
  resumo:
    "Esta calculadora de pontos e milhas responde uma pergunta só: cada ponto que você usou nesse resgate devolveu mais dinheiro do que custou? A conta compara o valor por ponto com o CPM (custo por mil pontos) que você pagou.",
  secoes: [
    {
      titulo: "O que é o valor do ponto",
      paragrafos: [
        "Valor por ponto é quanto de dinheiro cada ponto ou milha devolve quando você o usa. Se um resgate custa 20.000 pontos e economiza R$ 2.000, cada ponto valeu R$ 0,10 — ou R$ 100 por milheiro (mil pontos).",
        "É a mesma régua do CPM, só que virada do avesso: o CPM é quanto você pagou por mil pontos; o valor por ponto é quanto recebeu de volta por cada um. Sozinho, o valor por ponto não diz nada. Ele só significa alguma coisa quando encostado no que você pagou pelo ponto.",
      ],
    },
    {
      titulo: "Como calcular o valor da milha",
      paragrafos: [
        "Primeiro, descubra o valor por ponto: pegue o preço da mesma passagem em dinheiro (mesma data, mesmo trecho, mesma cabine), subtraia as taxas que você paga mesmo emitindo com pontos, e divida pela quantidade de pontos que o resgate exige.",
        "Depois, coloque o seu custo na mesma unidade: divida o CPM por 1.000 para ter o custo por ponto. A razão de retorno é o valor por ponto dividido pelo custo por ponto — e é ela que decide.",
        "Exemplo: passagem de R$ 1.700 em dinheiro, resgate por 15.000 milhas mais R$ 90 de taxas, pontos comprados ao CPM de R$ 26. Valor por ponto = (1.700 − 90) ÷ 15.000 = R$ 0,107. Custo por ponto = 26 ÷ 1.000 = R$ 0,026. Razão = 4,1×. Emita.",
      ],
    },
    {
      titulo: "Como interpretar a razão de retorno",
      paragrafos: [
        "Abaixo de 1,3×: não emita. Você estaria entregando o ponto quase de graça — comprando a passagem em dinheiro faria o mesmo negócio e ainda acumularia pontos na compra. Entre 1,3× e 2×: aceitável, emita se a viagem já estava decidida. Acima de 2×: bom resgate, é a faixa que justifica o trabalho de acumular. Acima de 4×: sweet spot, emita e não fique procurando melhor.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Quanto vale 1.000 milhas em reais?",
      resposta:
        "Depende do resgate. Divida o valor da passagem em dinheiro (menos as taxas) pelos pontos usados e multiplique por mil. No exemplo da calculadora, 1.000 milhas valeram R$ 107. Na hierarquia de uso, passagem aérea bem escolhida costuma render mais por milheiro do que produto ou cashback.",
    },
    {
      pergunta: "Qual é a diferença entre CPM e valor por ponto?",
      resposta:
        "CPM (custo por mil pontos) é quanto você pagou por cada milheiro. Valor por ponto é quanto cada ponto devolveu no resgate. A decisão de emitir vem da razão entre os dois, não de nenhum deles isoladamente.",
    },
    {
      pergunta: "Por que subtrair as taxas do preço da passagem?",
      resposta:
        "Porque as taxas de embarque você paga em dinheiro mesmo emitindo com pontos. O que os pontos realmente cobrem é a diferença entre o preço em dinheiro e as taxas — só essa parte entra no valor por ponto.",
    },
    {
      pergunta: "Meus pontos vieram do cartão, sem custo. Que CPM eu uso?",
      resposta:
        "Use o preço-alvo de compra do programa (o CPM que você pagaria para comprar aqueles pontos). Ele representa o custo de oportunidade: se o resgate devolve menos do que custaria repor os pontos, não compensa.",
    },
    {
      pergunta: "Qual CPM usar para Livelo, Smiles, LATAM Pass ou TudoAzul?",
      resposta:
        "Cada programa tem um preço-alvo de compra diferente, e ele muda com o tempo. Use a régua da calculadora de compra de pontos, que mostra a fonte e a data de cada valor, ou o CPM real que você pagou na última compra.",
    },
  ],
  relacionadas: [
    {
      href: "/resgate",
      titulo: "Resgate e emissão",
      porque: "compara o valor por mil do resgate com o preço-alvo de compra do programa.",
    },
    {
      href: "/compra-de-pontos",
      titulo: "Compra de pontos",
      porque: "descobre o CPM efetivo que você pagou, o outro lado desta conta.",
    },
    {
      href: "/cenario",
      titulo: "Cenário completo",
      porque: "empilha compra, clube e transferência num único CPM combinado.",
    },
  ],
  fonte: "05-usar-maximizar.md (valor por ponto, régua de decisão e exemplo GRU–SCL)",
  consultadoEm: "2026-09-18",
};
