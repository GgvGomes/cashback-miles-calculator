import type { ConteudoSeo } from "./tipos";

export const home: ConteudoSeo = {
  titulo: "Calculadora de pontos e milhas: como saber se compensa",
  resumo:
    "Toda decisão com pontos e milhas — comprar, transferir, assinar clube, emitir passagem, pagar anuidade — cabe numa conta de poucas linhas. Estas calculadoras fazem essa conta na sua frente, com a fórmula, a fonte e a data de cada número.",
  secoes: [
    {
      titulo: "O que esta calculadora de milhas faz de diferente",
      paragrafos: [
        "A maioria das calculadoras de pontos e milhas multiplica o seu saldo por um valor médio e devolve um número em reais. Isso responde “quanto tenho”, mas não “o que fazer”. Aqui a pergunta é sempre a segunda: esse resgate compensa? Comprar esses pontos compensa? Esse clube compensa?",
        "Para responder, cada calculadora compara o que você paga por ponto (o CPM, custo por mil pontos) com o que o ponto devolve no uso (o valor por ponto). A régua de decisão vem do guia, e todo número que entra na conta mostra de onde veio e quando foi conferido.",
      ],
    },
    {
      titulo: "Qual calculadora usar",
      paragrafos: [
        "Vai emitir uma passagem e quer saber se vale usar os pontos? Use Valor do ponto. Viu uma promoção de compra de pontos ou bônus de transferência? Use Compra de pontos. Está em dúvida se assina o clube Livelo, Smiles, LATAM Pass ou TudoAzul? Use Clube de pontos.",
        "Quer comparar o resgate com o preço-alvo de compra do programa? Use Resgate e emissão. Está avaliando se a anuidade do cartão se paga com pontos ou cashback? Use Cartão de crédito. E se a sua estratégia empilha vários passos — compra no clube, transfere com bônus, gasta em parceiro bonificado — o Cenário completo calcula o CPM combinado de tudo.",
      ],
    },
    {
      titulo: "Só técnicas legítimas",
      paragrafos: [
        "Nenhuma calculadora aqui depende de brecha, múltiplos CPFs ou burla de regra de programa. As contas usam apenas o que os programas oferecem abertamente: compra de pontos, clubes de assinatura, bônus de transferência e acúmulo por gasto. Se uma técnica não passa nessa régua, ela não entra.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Quanto vale 1 ponto ou 1 milha em reais?",
      resposta:
        "Não existe um valor fixo. O ponto vale o que o resgate devolve: divida o preço da passagem em dinheiro (menos taxas) pela quantidade de pontos usados. A calculadora Valor do ponto faz isso e compara com o quanto o ponto custou para você.",
    },
    {
      pergunta: "O que é CPM (custo por milheiro)?",
      resposta:
        "CPM é quanto você pagou, em reais, por cada mil pontos ou milhas. É a unidade em que o mercado fala de preço e o número que permite comparar uma compra de pontos, um clube e um bônus de transferência entre si.",
    },
    {
      pergunta: "Vale a pena comprar milhas?",
      resposta:
        "Só se o CPM efetivo da compra (já contando bônus) ficar dentro da régua do programa e abaixo do que o seu resgate devolve por milheiro. A calculadora Compra de pontos faz essa comparação com a fonte e a data de cada régua.",
    },
    {
      pergunta: "Clube de pontos vale a pena?",
      resposta:
        "Depende do CPM efetivo da assinatura contra o valor por mil que você consegue no resgate. O guia usa uma regra de corte com margem de 20% para desvalorização e mudança de regra. A calculadora Clube de pontos aplica essa regra ao plano que você escolher.",
    },
    {
      pergunta: "As calculadoras são gratuitas? Precisa de cadastro?",
      resposta:
        "Sim, todas são gratuitas e não pedem cadastro. Os valores que você digita ficam só no seu navegador. Também é possível usar as calculadoras dentro de um assistente de IA via MCP.",
    },
    {
      pergunta: "Os valores dos programas estão atualizados?",
      resposta:
        "Cada número mostra a fonte e a data em que foi conferido. Preço de clube, régua de CPM e bônus mudam com frequência — confira sempre no site oficial do programa antes de decidir.",
    },
  ],
  relacionadas: [],
  fonte: "01-comece-por-aqui.md, 04-acumulo-pontos.md, 05-usar-maximizar.md, 06-clubes-calculadora.md",
  consultadoEm: "2026-09-18",
};
