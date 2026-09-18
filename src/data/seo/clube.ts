import type { ConteudoSeo } from "./tipos";

export const clube: ConteudoSeo = {
  titulo: "Calculadora de clube de pontos: clube Livelo, Smiles ou LATAM Pass vale a pena?",
  resumo:
    "Esta calculadora de clube de pontos compara o que você paga por mil pontos na assinatura com o que esses pontos devolvem no resgate que você realmente vai fazer. Se o custo, já com bônus, ficar em até 80% do valor do resgate, assine. Se passar, espere a próxima promoção.",
  secoes: [
    {
      titulo: "O que é um clube de assinatura de pontos",
      paragrafos: [
        "Clube de assinatura é um plano mensal: você paga uma mensalidade fixa e o programa credita uma quantidade fixa de pontos ou milhas todo mês. Livelo e Esfera são programas de coalizão (os pontos ainda precisam ser transferidos para uma companhia aérea); Smiles, LATAM Pass e Azul Fidelidade são programas aéreos (a milha já nasce onde vira passagem).",
        "O ponto mensal quase nunca é o principal benefício. O que faz um clube valer a pena é o resto: validade do saldo congelada, bônus permanente de transferência e, acima de tudo, a oferta de adesão. A preço de tabela, todos os clubes entregam um CPM (custo por mil pontos) pior do que o preço-alvo de compra de qualquer programa.",
      ],
    },
    {
      titulo: "Como calcular o CPM do clube e o CPM efetivo com bônus",
      paragrafos: [
        "CPM do clube = mensalidade ÷ (pontos do mês ÷ 1.000). Com bônus de adesão, dilua pelo tempo que você vai ficar: (mensalidade × meses) ÷ ((pontos mensais × meses + bônus) ÷ 1.000). Depois, só para programa de coalizão, aplique o bônus de transferência esperado: CPM efetivo = CPM ÷ (1 + bônus). Bônus de 80% divide por 1,8; de 100%, por 2. Não use esse divisor em clube aéreo: a milha do Clube Smiles não passa por transferência.",
        "Do outro lado está o valor por mil no resgate: (preço da passagem em dinheiro − taxas pagas mesmo com milhas) ÷ (milhas necessárias ÷ 1.000). A regra de corte: assine se o CPM efetivo for menor ou igual a 0,8 × valor por mil no resgate. A margem de 20% é o colchão contra desvalorização da tabela e mudança de regra no meio da assinatura.",
        "Exemplo: Clube Livelo Classic a R$ 44,90 por 1.000 pontos ao mês (site da Livelo, consultado em 2026-08-18; o preço muda, e a calculadora mostra fonte e data de cada plano). CPM = R$ 44,90. O resgate-alvo custa R$ 1.200 em dinheiro ou 40.000 milhas + R$ 120 de taxas: valor por mil = 1.080 ÷ 40 = R$ 27,00; teto = R$ 21,60. Com 80% de bônus de transferência, o CPM efetivo cai para R$ 24,94, ainda acima. Não assine. Numa adesão promocional que leve o CPM a R$ 14,56, o efetivo vira R$ 8,09. Aí sim.",
      ],
    },
    {
      titulo: "Armadilhas: validade, carência e cancelamento",
      paragrafos: [
        "Carência é o tempo mínimo que você fica obrigado a pagar, e a multa entra no CPM: Clube Smiles plano 1.000 a R$ 44/mês com carência de 6 meses, cancelado no terceiro mês, cobra 6 × 44 = R$ 264 por 3.000 pontos, ou R$ 88 por mil. O CPM dobrou porque você saiu na hora errada. Confira também se a validade do lote do clube (não a do programa) alcança a data da viagem.",
        "Cancelar nem sempre é neutro: no Clube Livelo, quem cancela fica 365 dias fora das campanhas promocionais de contratação, justamente as ofertas que fazem o clube valer a pena. Veja se pausar ou migrar de plano resolve. E a calculadora cobre só o número; as outras três condições (destino definido em até 12 meses, ficar além da carência, o clube resolver algo que a compra avulsa não resolve) são um checklist seu.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Clube Livelo vale a pena?",
      resposta:
        "A preço de tabela, não: o CPM fica acima do preço-alvo de compra de todos os programas aéreos, mesmo com bônus de transferência alto. Vale a pena em oferta de adesão, quando o bônus de adesão dilui a mensalidade, e só se você tem um resgate definido. Rode os números da oferta na calculadora antes de assinar.",
    },
    {
      pergunta: "Qual é o melhor clube de pontos?",
      resposta:
        "O que tem o menor CPM efetivo para o resgate que você vai fazer, dentro da carência que você aguenta. Não existe melhor clube em abstrato: um clube de coalizão ganha quando há bônus de transferência no horizonte; um clube aéreo ganha quando você já voa com aquela companhia e quer o bônus permanente de transferência ou a validade congelada.",
    },
    {
      pergunta: "Quanto custa o clube Smiles?",
      resposta:
        "Os planos vão de 1.000 a 20.000 milhas por mês e o preço muda com reajustes e promoções. A calculadora lista cada plano com fonte e data de consulta e marca o que não está confirmado. Lembre que o Clube Smiles tem carência (cerca de 6 meses no plano 1.000) e a multa é o restante das mensalidades.",
    },
    {
      pergunta: "Posso cancelar o clube a qualquer momento?",
      resposta:
        "Depende do plano. O Clube Livelo mensal permite cancelamento livre, mas bloqueia novas promoções de adesão por 365 dias. Smiles, LATAM Pass e o plano anual do Azul Fidelidade têm carência com multa. Leia o contrato e coloque a multa na conta: ela pode dobrar o seu CPM real.",
    },
    {
      pergunta: "Como calcular o CPM do clube?",
      resposta:
        "Divida a mensalidade pelos pontos do mês em milheiros: R$ 44,90 por 1.000 pontos dá CPM de R$ 44,90. Com bônus de adesão, some todas as mensalidades do período e divida pelo total de pontos (mensais × meses + bônus). Se o programa for de coalizão, divida ainda por (1 + bônus de transferência) para chegar ao CPM efetivo.",
    },
  ],
  relacionadas: [
    {
      href: "/compra-de-pontos",
      titulo: "Compra de pontos",
      porque: "mostra se a compra avulsa em promoção resolve o mesmo problema por menos.",
    },
    {
      href: "/resgate",
      titulo: "Resgate e emissão",
      porque: "calcula o valor por mil do resgate-alvo, o outro lado desta conta.",
    },
    {
      href: "/cenario",
      titulo: "Cenário completo",
      porque: "empilha o clube com compra e transferência bonificada num único CPM combinado.",
    },
  ],
  fonte: "06-clubes-calculadora.md (fórmulas, regra de corte de 80%, carência e bloqueio de 365 dias) e 04-acumulo-pontos.md (clube como fonte de pontos)",
  consultadoEm: "2026-09-18",
};
