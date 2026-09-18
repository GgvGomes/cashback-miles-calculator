import { valorDoPonto } from "./valor-do-ponto";
import { compraDePontos } from "./compra-de-pontos";
import { clube } from "./clube";
import { resgate } from "./resgate";
import { cartao } from "./cartao";
import { cenario } from "./cenario";
import type { ConteudoSeo } from "./tipos";

export type { ConteudoSeo } from "./tipos";

export const seoConteudo: Record<
  "valorDoPonto" | "compraDePontos" | "clube" | "resgate" | "cartao" | "cenario",
  ConteudoSeo
> = { valorDoPonto, compraDePontos, clube, resgate, cartao, cenario };
