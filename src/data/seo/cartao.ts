import type { ConteudoSeo } from "./tipos";

export const cartao: ConteudoSeo = {
  titulo: "Calculadora de cartão de crédito: anuidade vale a pena, pontos ou cashback",
  resumo:
    "Esta calculadora soma o que o seu cartão devolve por ano (recompensa em pontos ou cashback mais o float, o dinheiro rendendo até o vencimento) e compara com a anuidade. Ela também diz qual desconto à vista empata com o parcelado sem juros. Tudo isso só vale com a fatura paga integral.",
  secoes: [
    {
      titulo: "Como saber se a anuidade do cartão vale a pena",
      paragrafos: [
        "O retorno de um cartão tem duas partes. A maior é a recompensa: gasto mensal × 12 × percentual efetivo. Se o cartão pontua, o percentual sai de (pontos por dólar ÷ cotação do dólar) × valor do milheiro ÷ 1.000, e o guia avalia o milheiro (mil pontos) a R$ 20, premissa conservadora de propósito. A menor é o float: o dinheiro rendendo entre a compra e o vencimento. Saldo médio parado = gasto mensal × (float em dias ÷ 30); ganho bruto = saldo médio × CDI anual; líquido = bruto × 0,80, já descontado o imposto de renda de 20%.",
        "Exemplo do guia: R$ 5.000 por mês, float de 25 dias (a média realista, não os 40 do melhor dia de compra) e CDI de 13,90% ao ano (2026-08-13). Float líquido: 5.000 × (25 ÷ 30) = 4.167 → × 0,139 = 579 → × 0,80 = R$ 463 por ano. Um cartão com 1% de cashback devolve R$ 600 sobre o mesmo gasto. Total: R$ 1.063 contra uma anuidade de R$ 1.068 (Nubank Ultravioleta, 2026-08-18): no limite, e sem isenção o cartão não se paga.",
        "A calculadora classifica: retorno maior ou igual à anuidade cobre; entre 80% e 100%, limítrofe; abaixo de 80%, não compensa. O CDI muda, e a calculadora mostra a fonte e a data do valor usado. O float só existe se o dinheiro rende (conta remunerada, CDB de liquidez diária, Tesouro Selic); parado em conta-corrente, vale zero.",
      ],
    },
    {
      titulo: "Parcelar sem juros ou pagar à vista com desconto",
      paragrafos: [
        "A pergunta certa é: o desconto à vista supera o rendimento de manter o dinheiro investido enquanto as parcelas saem? A calculadora traz cada parcela a valor presente (parcela ÷ (1 + i)^n, com i igual ao CDI mensal líquido) e devolve o desconto que empata: 100% menos o valor presente das parcelas, mais a recompensa do cartão.",
        "Com o CDI do guia, R$ 1.000 em 12x sem juros valem R$ 945,60 hoje: empate em 5,4% à vista, ou cerca de 6,4% se o cartão devolve 1%. Desconto no PIX abaixo da linha, parcele; acima, pague à vista. Regra prática: 10% ou mais no PIX ganha quase sempre; abaixo de 3%, parcele. Só vale se o dinheiro estiver mesmo investido e as parcelas couberem nos próximos meses. Parcelar o que você não pagaria à vista hoje é dívida com outro nome.",
      ],
    },
    {
      titulo: "Cashback ou pontos, e a condição que vale para os dois",
      paragrafos: [
        "Cashback é dinheiro: 1% devolve R$ 1 a cada R$ 100, sem depender de resgate. Pontos valem o que o seu resgate devolver por milheiro. A R$ 20 o milheiro, um cartão de 2,5 pontos por dólar rende 0,96%, parecido com 1% de cashback. Com resgates bons (passagem bem escolhida, transferência bonificada) o cartão de pontos passa na frente; quem não vai atrás de resgate costuma sair melhor com cashback.",
        "Nada disso vale sem a regra inegociável: fatura paga integral, no vencimento, todo mês. O rotativo custa 15,13% ao mês (Banco Central, junho de 2026, divulgado em 2026-07-30): um único mês com R$ 3.000 no rotativo custa R$ 454, quase um ano do float de quem gasta R$ 5.000 por mês. Deixe o débito automático da fatura total ligado e nunca aumente o gasto só para bater meta de isenção.",
      ],
    },
  ],
  faq: [
    {
      pergunta: "Vale a pena pagar anuidade de cartão?",
      resposta:
        "Só se o retorno anual (recompensa mais float) for maior que a anuidade, ou se você cumprir a regra de isenção sem mudar seus hábitos. Some gasto mensal × 12 × percentual efetivo ao ganho líquido do float e compare. Se não cobre, o cartão certo é um sem anuidade. E antes de pagar, ligue na central: emissores negociam de 25% a 100% de desconto.",
    },
    {
      pergunta: "Cartão de pontos ou cashback, qual é melhor?",
      resposta:
        "Depende de quanto você consegue tirar de cada milheiro. Cashback é valor fixo e imediato. Pontos avaliados a R$ 20 por milheiro rendem parecido com 1% de cashback num cartão de 2,5 pontos por dólar; com resgates acima disso, pontos ganham. Quem não vai atrás de resgate costuma sair melhor com cashback.",
    },
    {
      pergunta: "Quantos pontos por dólar preciso para pagar a anuidade?",
      resposta:
        "Converta pontos por dólar em percentual: (pontos por dólar ÷ cotação do dólar) × valor do milheiro ÷ 1.000. Depois divida a anuidade por esse percentual para achar o gasto anual de empate. No guia, 2,5 pontos por dólar a R$ 20 o milheiro dão 0,96%, e um cartão de R$ 1.176 por ano só se paga a partir de cerca de R$ 10.230 por mês de gasto (dólar a R$ 5,2213, 2026-08-14).",
    },
    {
      pergunta: "Parcelar sem juros ou pagar à vista com desconto?",
      resposta:
        "Compare o desconto oferecido com o desconto que empata para aquele número de parcelas. Com o CDI do guia, 12x sem juros empata com 5,4% à vista (6,4% se o cartão devolve 1%). Desconto menor, parcele; maior, pague à vista. Vale só se o dinheiro ficar investido e as parcelas couberem no orçamento.",
    },
    {
      pergunta: "O que é float do cartão?",
      resposta:
        "É o intervalo entre a compra e o vencimento da fatura, em que o dinheiro segue na sua conta rendendo. Quem espalha os gastos pelo mês vive com cerca de 25 dias; 40 dias é só o melhor dia de compra. Ele só vale alguma coisa se o dinheiro estiver rendendo e some no primeiro mês de rotativo.",
    },
  ],
  relacionadas: [
    {
      href: "/valor-do-ponto",
      titulo: "Valor do ponto",
      porque: "descobre quanto o seu resgate devolve por milheiro, o número que decide entre pontos e cashback.",
    },
    {
      href: "/resgate",
      titulo: "Resgate e emissão",
      porque: "testa se os pontos acumulados no cartão viram uma passagem que vale mais que R$ 20 por milheiro.",
    },
    {
      href: "/cenario",
      titulo: "Cenário completo",
      porque: "empilha cartão, clube e transferência num único custo por milheiro.",
    },
  ],
  fonte:
    "02-credito.md (float, retorno de recompensa, 4 regras inegociáveis, breakeven de anuidade, parcelado × PIX) e 03-cashback.md (fórmula da anuidade, cashback × pontos)",
  consultadoEm: "2026-09-18",
};
