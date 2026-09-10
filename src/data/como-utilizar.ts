/**
 * Conteúdo do "Como utilizar" de cada calculadora — paraphraseado do guia
 * (notions/cashback-pontos-milhas/content/), mantido em sincronia manual
 * (mesmo padrão do app em si, ADR-012).
 */
export interface CenarioExemplo {
  titulo: string;
  descricao: string;
}

export interface FaixaInterpretacao {
  rotulo: string;
  texto: string;
}

export interface ConteudoComoUtilizar {
  titulo: string;
  comoUsar: string[];
  cenarios: CenarioExemplo[];
  interpretacao: FaixaInterpretacao[];
  porque: string;
  fonte: string;
  consultadoEm: string;
}

export const comoUtilizar: Record<
  | "valorDoPonto"
  | "compraDePontos"
  | "clube"
  | "resgate"
  | "cartao"
  | "cenario",
  ConteudoComoUtilizar
> = {
  valorDoPonto: {
    titulo: "Como usar: valor do ponto",
    comoUsar: [
      "Informe o preço da mesma passagem em dinheiro — mesma data, mesmo trecho, mesma cabine.",
      "Informe as taxas que você paga mesmo emitindo com pontos.",
      "Informe quantos pontos ou milhas o resgate exige.",
      "Informe o CPM (custo por milheiro, ou seja, por mil pontos) que você pagou ou pagaria pelo ponto.",
    ],
    cenarios: [
      {
        titulo: "Resgate GRU → SCL",
        descricao:
          "Passagem custaria R$1.700 em dinheiro; o resgate saiu por 15.000 milhas + R$90 de taxas, com CPM pago de R$26/mil. Razão de retorno: 4,1×.",
      },
    ],
    interpretacao: [
      { rotulo: "Abaixo de 1,3×", texto: "Não emita: você entregaria o ponto quase de graça." },
      { rotulo: "1,3× a 2×", texto: "Aceitável: emita se a viagem já estava decidida." },
      { rotulo: "2× a 4×", texto: "Bom resgate: justifica todo o trabalho de acumular." },
      { rotulo: "Acima de 4×", texto: "Sweet spot: emita e não fique procurando melhor." },
    ],
    porque:
      "O piso de 1,3× existe porque, abaixo dele, você faria o mesmo negócio comprando a passagem em dinheiro e ainda acumularia pontos na compra. Emitir, nesse caso, não traria vantagem real.",
    fonte: "05-usar-maximizar.md",
    consultadoEm: "2026-08-18",
  },
  compraDePontos: {
    titulo: "Como usar: compra de pontos",
    comoUsar: [
      "Escolha o programa de origem.",
      "Informe o preço pago pelos pontos.",
      "Informe quantos pontos você recebeu.",
      "Se o programa for de coalizão (Livelo, Esfera, iupp), informe o bônus de transferência esperado para a aérea.",
    ],
    cenarios: [
      {
        titulo: "Compra + transferência bonificada",
        descricao:
          "Livelo comprado a R$29,50/mil, transferido para a Smiles com 100% de bônus, vira R$14,75/mil — abaixo do preço-alvo da Smiles (R$16/mil). Compra boa.",
      },
    ],
    interpretacao: [
      { rotulo: "Excepcional ou bom", texto: "CPM final dentro (ou abaixo) da régua de referência do programa." },
      { rotulo: "Aceitável", texto: "No limite da régua — ok se o resgate já está definido." },
      { rotulo: "Ruim", texto: "Acima da régua do programa — melhor não comprar." },
    ],
    porque:
      "Só compre pontos com um resgate já em mente: ponto comprado sem destino é dinheiro imobilizado num ativo que desvaloriza quando o programa muda a tabela. Antes de comprar, aplique o teste: você faria essa compra se não houvesse ponto nenhum?",
    fonte: "04-acumulo-pontos.md",
    consultadoEm: "2026-08-18",
  },
  clube: {
    titulo: "Como usar: clube de assinatura",
    comoUsar: [
      "Informe a mensalidade do clube e quantos pontos ele credita por mês.",
      "Informe por quantos meses pretende ficar assinado e o bônus de adesão, se houver.",
      "Se o programa for de coalizão, informe o bônus de transferência esperado.",
      "Informe os dados do resgate que pretende fazer com esses pontos: preço da passagem, taxas e milhas necessárias.",
    ],
    cenarios: [
      {
        titulo: "Clube Livelo Classic",
        descricao:
          "R$44,90/mês por 1.000 pontos (CPM R$44,90) contra um resgate que devolve R$27,00/mil: não assine a preço de tabela. Com bônus de adesão que reduz o CPM efetivo, a conta pode virar 'assine'.",
      },
    ],
    interpretacao: [
      { rotulo: "Assine", texto: "CPM efetivo (já com bônus) fica em até 80% do valor por mil que o resgate devolve." },
      { rotulo: "Não assine", texto: "CPM efetivo passa dos 80% — o clube custa mais do que o resgate devolve." },
    ],
    porque:
      "A margem de 20% é o colchão contra desvalorização do programa e mudança de regra no meio do caminho. Assine só se também tiver destino definido em até 12 meses, ficar além da carência, e o clube resolver algo que a compra avulsa não resolve.",
    fonte: "06-clubes-calculadora.md",
    consultadoEm: "2026-08-18",
  },
  resgate: {
    titulo: "Como usar: resgate / emissão",
    comoUsar: [
      "Informe o preço da mesma passagem em dinheiro.",
      "Informe as taxas pagas mesmo resgatando com milhas.",
      "Informe quantas milhas o resgate exige.",
      "Informe o preço-alvo de compra do programa — o teto que valeria pagar por mil pontos hoje.",
    ],
    cenarios: [
      {
        titulo: "Comparar contra o preço-alvo",
        descricao:
          "Um resgate que devolve R$21/mil, contra um preço-alvo de R$21/mil, fica no limite (limítrofe). Acima do preço-alvo, compensa mais comprar pontos e emitir depois do que resgatar direto.",
      },
    ],
    interpretacao: [
      { rotulo: "Compensa", texto: "Valor por mil devolvido é maior ou igual ao preço-alvo do programa." },
      { rotulo: "Limítrofe", texto: "Fica em pelo menos 80% do preço-alvo." },
      { rotulo: "Não compensa", texto: "Fica abaixo de 80% do preço-alvo." },
    ],
    porque:
      "O valor por mil no resgate é o teto do que faz sentido pagar por aquele ponto — é a mesma régua do CPM, só que virada do avesso: mede quanto você recebeu de volta, não quanto pagou.",
    fonte: "06-clubes-calculadora.md / 05-usar-maximizar.md",
    consultadoEm: "2026-08-18",
  },
  cartao: {
    titulo: "Como usar: cartão de crédito",
    comoUsar: [
      "Informe seu gasto mensal no cartão, o float em dias (intervalo entre a compra e o vencimento da fatura) e o percentual efetivo de retorno (cashback ou pontos convertidos em %).",
      "Informe a anuidade do cartão.",
      "Para parcelamento: informe o valor da compra e o número de parcelas sem juros.",
    ],
    cenarios: [
      {
        titulo: "Parcelar vs. PIX com desconto",
        descricao:
          "Em 12 parcelas sem juros, a linha de empate fica perto de 5,4% de desconto à vista: desconto menor que isso, parcele sem juros; desconto maior, pague à vista com desconto.",
      },
    ],
    interpretacao: [
      { rotulo: "Cobre a anuidade", texto: "Retorno anual (recompensa + float) é maior ou igual à anuidade." },
      { rotulo: "Limítrofe", texto: "Cobre pelo menos 80% da anuidade." },
      { rotulo: "Não compensa", texto: "Cobre menos de 80% da anuidade — confira se você tem alguma isenção." },
    ],
    porque:
      "O float é real, mas costuma ser o menor dos benefícios — a recompensa geralmente vale mais. Nunca aumente o gasto só para bater meta de isenção de anuidade, e nunca deixe a fatura ir para o rotativo ou o parcelamento: os juros comem qualquer benefício em semanas.",
    fonte: "02-credito.md",
    consultadoEm: "2026-08-18",
  },
  cenario: {
    titulo: "Como usar: cenário completo",
    comoUsar: [
      "Adicione um passo para cada camada do cenário: compra de pontos, clube, transferência bonificada, gasto que gera cashback/pontos, ou um custo extra.",
      "Informe o custo e os pontos gerados em cada passo (a transferência não tem custo próprio, só ajusta os pontos).",
      "Informe o valor de uso do programa de destino — quanto o resgate ali costuma devolver por mil pontos.",
    ],
    cenarios: [
      {
        titulo: "Empilhamento de camadas",
        descricao:
          "Numa compra de R$1.000 com cupom, cashback, cartão e fidelidade combinados, o desconto real pode chegar a 19,8%. O caso comum, sem promoção agressiva, fica perto de 8,8%.",
      },
    ],
    interpretacao: [
      { rotulo: "Compensa", texto: "CPM combinado de todos os passos fica em até 80% do valor de uso do destino." },
      { rotulo: "Não compensa", texto: "CPM combinado passa do teto — algum passo está estragando a conta." },
    ],
    porque:
      "O cartão costuma ser a menor camada do desconto total: trocar de cartão não muda o resultado tanto quanto seguir a ordem certa de empilhamento e não perder camadas que não se acumulam (dois cashbacks ao mesmo tempo, por exemplo, não somam).",
    fonte: "03-cashback.md / 06-clubes-calculadora.md / 12-conclusao.md",
    consultadoEm: "2026-08-18",
  },
};
