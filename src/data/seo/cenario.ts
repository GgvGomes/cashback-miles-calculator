import type { ConteudoSeo } from "./tipos";

export const cenario: ConteudoSeo = {
  titulo: "Simulador de pontos e milhas: o CPM combinado de compra, clube e transferência com bônus",
  resumo:
    "Este simulador de pontos e milhas soma todas as camadas do seu acúmulo (compra de pontos, clube de assinatura, transferência com bônus, gasto bonificado) e devolve um único número: o CPM combinado, o custo por mil pontos do cenário inteiro. É ele que decide se o plano compensa, não o CPM de cada passo sozinho.",
  secoes: [
    {
      titulo: "Por que empilhar as fontes num CPM combinado",
      paragrafos: [
        "Ponto raramente vem de uma fonte só. Você compra um lote em promoção, tem um clube que credita todo mês, espera uma campanha de bônus para transferir da coalizão (Livelo, Esfera, iupp) para o programa aéreo (Smiles, LATAM Pass, Azul Fidelidade) e ainda passa uma compra grande no cartão para completar a emissão. Olhar cada camada isolada engana: uma compra excelente pode estar carregando um clube caro nas costas.",
        "O CPM (custo por mil pontos) coloca tudo na mesma régua: CPM combinado = dinheiro total desembolsado ÷ (total de pontos que chegam ao destino ÷ 1.000). O que importa é o que você paga no fim contra o que aterrissa na conta do programa aéreo, pronto para virar passagem.",
      ],
    },
    {
      titulo: "Como o cálculo pondera cada passo",
      paragrafos: [
        "Cada passo entra com dois números: quanto custou em reais e quantos pontos gerou. Compra de pontos: preço pago e pontos recebidos, já com o bônus da oferta. Clube: mensalidades do período e pontos mensais mais bônus de adesão. Gasto bonificado: só o sobrepreço pago a mais pela pontuação, não o valor inteiro da compra. Custo extra: taxa ou despesa que só existe por causa do plano, com zero pontos.",
        "A transferência com bônus é o passo diferente: não custa nada, só multiplica. Uma campanha de 100% dobra os pontos que chegam ao destino; de 80%, multiplica por 1,8. Como o custo fica igual e os pontos crescem, é a camada que mais derruba o CPM combinado. O veredito usa a mesma régua do clube: compensa se o CPM combinado ficar em até 80% do valor de uso do programa de destino (quanto mil pontos costumam devolver num resgate ali). Os 20% de folga cobrem a desvalorização que os programas fazem sem avisar.",
      ],
    },
    {
      titulo: "Como descobrir qual passo estraga a conta",
      paragrafos: [
        "A calculadora mostra o CPM acumulado passo a passo: o custo por mil de tudo até aquele ponto. Quando o número sobe, aquela camada está mais cara do que a média das anteriores; quando cai, está ajudando. Ache o degrau que subiu e você sabe o que cortar.",
        "Exemplo: 20.000 pontos Livelo comprados por R$ 588 (R$ 29,40 por mil, melhor compra direta registrada em 2026 segundo Melhores Destinos, consultado em 2026-08-18). Acumulado: R$ 29,40. Mais 6 meses de Clube Livelo Classic, 6 × R$ 44,90 = R$ 269,40 por 6.000 pontos. Acumulado: R$ 857,40 ÷ 26 = R$ 32,98; subiu, é o clube pesando. Transferência para a Smiles com 100% de bônus: 52.000 milhas pelo mesmo dinheiro. CPM combinado: R$ 857,40 ÷ 52 = R$ 16,49. Com valor de uso de R$ 21 por mil na Smiles (MilhasBot, jul–ago/2026), o teto é R$ 16,80: passou por pouco. Sem o clube, fecharia em R$ 14,70. O passo que estragou a conta tem nome: ou o clube entra com oferta de adesão, ou sai.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "O que é CPM combinado?",
      resposta:
        "É o custo por mil pontos de todo o cenário, não de um passo só: soma de tudo que você pagou dividida pelo total de pontos que chegaram ao programa de destino, em milheiros. Ele é o número certo para comparar com o valor de uso do resgate, porque ninguém emite passagem com o ponto de uma fonte separada das outras.",
    },
    {
      pergunta: "Como juntar clube e bônus de transferência na mesma conta?",
      resposta:
        "Coloque o clube como um passo com custo (mensalidades do período) e pontos (mensais × meses + bônus de adesão), e a transferência como um passo sem custo que multiplica os pontos por (1 + bônus). O bônus de transferência só existe para clube de coalizão, como Livelo e Esfera; a milha do Clube Smiles ou do Clube LATAM Pass já nasce no programa aéreo e não passa por transferência.",
    },
    {
      pergunta: "Vale a pena transferir pontos com bônus?",
      resposta:
        "Quase sempre é o passo que mais reduz o CPM, porque multiplica os pontos sem custar nada. Mas ponto transferido é decisão irreversível: você fica preso àquela companhia. Transfira quando tiver bônus alto e um resgate definido, e simule antes se o CPM combinado depois do bônus fica abaixo do teto de 80% do valor de uso.",
    },
    {
      pergunta: "Como simular acúmulo de milhas para uma viagem?",
      resposta:
        "Comece pelo resgate: quantas milhas a emissão exige e quanto ela devolve por mil. Depois adicione um passo para cada fonte que você vai usar, na ordem em que acontece, até somar as milhas necessárias. O simulador devolve o CPM combinado e o veredito; se não passar, tire o passo que mais subiu o CPM acumulado e refaça.",
    },
    {
      pergunta: "Gasto no cartão entra no cenário com o valor inteiro da compra?",
      resposta:
        "Não. Entra só o que você pagou a mais para pontuar: o sobrepreço de uma loja parceira em relação ao melhor preço do mercado, ou zero se a compra ia acontecer de qualquer jeito. Contar o valor cheio da compra como custo infla o CPM e faz um cenário bom parecer ruim.",
    },
  ],
  relacionadas: [
    {
      href: "/compra-de-pontos",
      titulo: "Compra de pontos",
      porque: "calcula o CPM de cada oferta antes de ela virar um passo do cenário.",
    },
    {
      href: "/clube",
      titulo: "Clube de assinatura",
      porque: "faz a conta do clube isolado, com carência e bônus de adesão, antes de empilhar.",
    },
    {
      href: "/valor-do-ponto",
      titulo: "Valor do ponto",
      porque: "descobre quanto o resgate devolve por mil, o valor de uso que fecha esta conta.",
    },
  ],
  fonte: "04-acumulo-pontos.md (fórmula única do CPM, bônus de transferência e exemplo de compra Livelo) e 06-clubes-calculadora.md (regra de corte de 80% e valor de uso de referência)",
  consultadoEm: "2026-09-18",
};
