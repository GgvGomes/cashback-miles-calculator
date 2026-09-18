/**
 * Conteúdo explicativo visível abaixo de cada calculadora (indexável pelo
 * Google) — paraphraseado do guia (notions/cashback-pontos-milhas/content/),
 * mantido em sincronia manual (ADR-012). O modal "Como utilizar" continua
 * sendo o passo a passo; aqui é o "o que é / como calcular / FAQ".
 */
export interface SecaoSeo {
  titulo: string;
  paragrafos: string[];
}

export interface PerguntaFrequente {
  pergunta: string;
  resposta: string;
}

export interface ConteudoSeo {
  /** Título da seção (H2) — deve conter a keyword principal da página. */
  titulo: string;
  /** Resumo em 1–2 frases, aparece logo abaixo do H2. */
  resumo: string;
  secoes: SecaoSeo[];
  faq: PerguntaFrequente[];
  /** Calculadoras relacionadas, para linkagem interna. */
  relacionadas: { href: string; titulo: string; porque: string }[];
  fonte: string;
  consultadoEm: string;
}
