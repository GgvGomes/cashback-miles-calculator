/**
 * Textos das páginas institucionais (/sobre, /privacidade, /termos, /contato).
 * Fonte da verdade do conteúdo; as páginas só renderizam. Exigidas pela
 * revisão do Google AdSense e pela LGPD (Lei 13.709/2018).
 */
export const RESPONSAVEL = "Gabriel Gomes Vieira";
export const EMAIL_CONTATO = "ggvgabriel05@gmail.com";
export const NOME_SITE = "Compensa?";

export interface SecaoLegal {
  titulo: string;
  paragrafos: string[];
  lista?: string[];
}

export interface PaginaLegal {
  rota: "/sobre" | "/privacidade" | "/termos" | "/contato";
  titulo: string;
  descricao: string;
  resumo: string;
  secoes: SecaoLegal[];
  atualizadoEm: string; // AAAA-MM-DD
}

export const sobre: PaginaLegal = {
  rota: "/sobre",
  titulo: "Sobre o Compensa?",
  descricao:
    "Quem faz o Compensa?, de onde vêm as fórmulas das calculadoras de pontos e milhas e como o site se mantém.",
  resumo:
    "Calculadoras gratuitas para responder uma pergunta simples: esse ponto, essa milha, esse clube ou esse cartão compensam para você?",
  secoes: [
    {
      titulo: "O que é",
      paragrafos: [
        "O Compensa? reúne seis calculadoras de pontos, milhas e cashback. Cada uma executa uma fórmula do guia \"Plano cashback, pontos e milhas\" e mostra a conta passo a passo, o veredito (compensa, limítrofe ou não compensa) e a fonte e a data de cada número de referência usado.",
        "Não há cadastro, login nem cobrança. Os valores que você digita ficam só no seu navegador (localStorage) para você não precisar redigitar na próxima visita.",
      ],
    },
    {
      titulo: "Metodologia",
      paragrafos: [
        "As regras de corte (por exemplo, o piso de 1,3× na razão de retorno, ou o teto de 80% do valor de uso para o CPM blended) vêm do guia e são explicadas em cada calculadora na seção \"Como usar e interpretar\". Você vê o porquê, não só o número.",
        "Os números de referência — preço-alvo de compra por programa, valor de uso, CDI, dólar — são conferidos manualmente em fontes públicas (Melhores Destinos, sites oficiais dos programas, Banco Central) e carregam a data da conferência. Eles mudam; confira sempre no site oficial antes de decidir.",
      ],
    },
    {
      titulo: "Independência e anúncios",
      paragrafos: [
        "O site é mantido de forma independente e não tem vínculo com programas de fidelidade, bancos ou emissores de cartão. Nenhuma calculadora favorece produto de parceiro.",
        "Para cobrir os custos de hospedagem e manutenção, o site exibe anúncios do Google AdSense. Anúncios são identificados com o rótulo \"Publicidade\" e não influenciam os resultados das contas. Se algum link de indicação existir, ele é declarado no lugar em que aparece.",
      ],
    },
    {
      titulo: "Só técnicas legítimas",
      paragrafos: [
        "O conteúdo descreve mecanismos, não promete retorno financeiro. Nada aqui viola termos de programa: sem multi-CPF, sem brecha, sem burla de regra. Decisão é sua, com a conta aberta na frente.",
      ],
    },
    {
      titulo: "Quem mantém",
      paragrafos: [
        `O Compensa? é feito e mantido por ${RESPONSAVEL}. Também está disponível como servidor MCP, para usar as calculadoras direto no seu assistente de IA. Dúvidas, correções de número ou sugestões: veja a página de contato.`,
      ],
    },
  ],
  atualizadoEm: "2026-09-20",
};

export const privacidade: PaginaLegal = {
  rota: "/privacidade",
  titulo: "Política de privacidade",
  descricao:
    "Quais dados o Compensa? trata, como os anúncios do Google AdSense usam cookies e quais são os seus direitos pela LGPD.",
  resumo:
    "Resumo curto: não pedimos cadastro nem dado pessoal. O que digita fica no seu navegador. Os anúncios do Google usam cookies, e você pode desativar a personalização.",
  secoes: [
    {
      titulo: "Quem é o controlador",
      paragrafos: [
        `O responsável pelo tratamento de dados neste site é ${RESPONSAVEL}, que pode ser contatado pelo e-mail ${EMAIL_CONTATO}.`,
      ],
    },
    {
      titulo: "Dados que o site trata",
      paragrafos: [
        "O Compensa? não tem cadastro, formulário de login nem coleta de nome, CPF, e-mail ou telefone.",
      ],
      lista: [
        "Valores digitados nas calculadoras: ficam gravados apenas no armazenamento local do seu navegador (localStorage), para você não precisar redigitar. Não são enviados ao nosso servidor. Você apaga limpando os dados do site no navegador.",
        "Preferência de tema (claro/escuro): também só no seu navegador.",
        "Registros técnicos de acesso (endereço IP, data e hora, página acessada, navegador): gerados pela hospedagem (Vercel) para operação e segurança do serviço, com retenção limitada, sem uso para identificar você.",
        "Servidor MCP (/api/mcp): cada chamada é independente; não guardamos conversa, perfil ou os dados enviados pelo seu assistente de IA.",
      ],
    },
    {
      titulo: "Cookies e anúncios (Google AdSense)",
      paragrafos: [
        "Este site exibe anúncios fornecidos pelo Google AdSense. O Google, como fornecedor terceiro, usa cookies para veicular anúncios com base nas suas visitas a este e a outros sites. O uso do cookie de publicidade do Google (por exemplo, o cookie DoubleClick) permite que o Google e seus parceiros exibam anúncios com base no seu histórico de navegação.",
        "Você pode desativar a personalização de anúncios nas Configurações de anúncios do Google (adssettings.google.com) e saber mais sobre como o Google usa dados em policies.google.com/technologies/ads. Fornecedores terceiros e redes de anúncios podem usar cookies para os mesmos fins; a lista de fornecedores e as opções de desativação também estão nas páginas do Google.",
        "Para visitantes do Espaço Econômico Europeu, Reino Unido e Suíça, o site exibe uma solicitação de consentimento (plataforma de gerenciamento de consentimento do Google) antes de carregar anúncios personalizados. Você pode alterar sua escolha a qualquer momento pelo link \"Configurações de privacidade\" no rodapé, quando disponível.",
      ],
    },
    {
      titulo: "Base legal e finalidade (LGPD)",
      paragrafos: [
        "Os registros técnicos de acesso são tratados com base no legítimo interesse (art. 7º, IX da Lei 13.709/2018), para manter o site funcionando e seguro. Os cookies de publicidade são tratados com base no consentimento, quando exigido, ou no legítimo interesse de manter o serviço gratuito por meio de anúncios.",
        "Não vendemos dados pessoais e não os usamos para outra finalidade além das descritas aqui.",
      ],
    },
    {
      titulo: "Seus direitos",
      paragrafos: [
        "Pela LGPD você pode pedir confirmação de tratamento, acesso, correção, anonimização, eliminação e informação sobre compartilhamento dos seus dados, além de revogar consentimento. Como o site não guarda dado que identifique você, na prática a maior parte disso se resolve limpando os dados do navegador e ajustando as configurações de anúncios do Google.",
        `Para exercer qualquer direito ou tirar dúvida, escreva para ${EMAIL_CONTATO}.`,
      ],
    },
    {
      titulo: "Alterações",
      paragrafos: [
        "Esta política pode mudar quando o site mudar (por exemplo, se um novo serviço de terceiro for adicionado). A data da última atualização aparece no fim da página.",
      ],
    },
  ],
  atualizadoEm: "2026-09-20",
};

export const termos: PaginaLegal = {
  rota: "/termos",
  titulo: "Termos de uso",
  descricao:
    "Condições de uso das calculadoras do Compensa?: conteúdo educativo, sem aconselhamento financeiro e sem promessa de retorno.",
  resumo:
    "Ao usar o site você concorda com estas condições. São curtas porque o site é simples: calculadoras gratuitas, de uso educativo, com decisão sempre sua.",
  secoes: [
    {
      titulo: "Natureza do conteúdo",
      paragrafos: [
        "As calculadoras e os textos do Compensa? têm finalidade educativa e informativa. Eles descrevem mecanismos de pontos, milhas, cashback, clubes e cartões e aplicam regras de decisão públicas. Não constituem consultoria financeira, recomendação de investimento, oferta de produto ou aconselhamento personalizado.",
        "Nenhum resultado promete ganho, economia ou retorno. O veredito \"compensa\" é o resultado de uma fórmula aplicada aos números que você informou, não uma garantia.",
      ],
    },
    {
      titulo: "Números de referência",
      paragrafos: [
        "Preços de pontos, valores de uso, taxas e indicadores mudam com frequência. Cada número de referência mostra fonte e data de conferência; ainda assim, confira sempre no site oficial do programa, do banco ou do emissor antes de decidir. O Compensa? não se responsabiliza por decisões tomadas com base em número desatualizado.",
      ],
    },
    {
      titulo: "Uso permitido",
      paragrafos: [
        "Você pode usar as calculadoras livremente para uso pessoal, inclusive por meio do servidor MCP. Não é permitido usar o site para violar termos de programas de fidelidade, praticar fraude, multi-CPF ou qualquer técnica de zona cinza, nem sobrecarregar o serviço com automação abusiva.",
      ],
    },
    {
      titulo: "Anúncios e terceiros",
      paragrafos: [
        "O site exibe anúncios do Google AdSense, identificados como \"Publicidade\". O conteúdo dos anúncios é de responsabilidade dos anunciantes e do Google; o Compensa? não endossa produtos anunciados. Links para sites de terceiros levam a conteúdo que não controlamos.",
      ],
    },
    {
      titulo: "Propriedade intelectual",
      paragrafos: [
        `Textos, fórmulas explicadas, layout e código do site pertencem a ${RESPONSAVEL}, salvo indicação em contrário. Você pode citar trechos com link para a página de origem.`,
      ],
    },
    {
      titulo: "Limitação de responsabilidade",
      paragrafos: [
        "O site é fornecido \"como está\", sem garantia de disponibilidade ininterrupta ou de ausência de erro. Na extensão permitida pela lei, o Compensa? não responde por perdas decorrentes do uso ou da impossibilidade de uso das calculadoras.",
      ],
    },
    {
      titulo: "Lei aplicável",
      paragrafos: [
        "Estes termos são regidos pelas leis da República Federativa do Brasil. Estes termos podem ser atualizados; a data da última atualização aparece no fim da página.",
      ],
    },
  ],
  atualizadoEm: "2026-09-20",
};

export const contato: PaginaLegal = {
  rota: "/contato",
  titulo: "Contato",
  descricao: "Fale com quem mantém o Compensa?: correção de número, sugestão de calculadora, dúvida sobre privacidade ou anúncios.",
  resumo: "Um e-mail resolve. Não há formulário para não coletar dado a mais do que o necessário.",
  secoes: [
    {
      titulo: "Como falar",
      paragrafos: [
        `Escreva para ${EMAIL_CONTATO}. Resposta em até 5 dias úteis. Para correção de número, mande o link da página, o valor que você acredita estar errado e a fonte que consultou — assim a correção entra com fonte e data, como todo número do site.`,
      ],
    },
    {
      titulo: "Assuntos comuns",
      paragrafos: [],
      lista: [
        "Número desatualizado (preço-alvo, valor de uso, mensalidade de clube, CDI, dólar).",
        "Sugestão de nova calculadora ou de regra de decisão.",
        "Dúvida sobre privacidade, cookies ou anúncios (veja também a política de privacidade).",
        "Problema técnico no site ou no servidor MCP.",
      ],
    },
  ],
  atualizadoEm: "2026-09-20",
};

export const paginasLegais = [sobre, privacidade, termos, contato] as const;
