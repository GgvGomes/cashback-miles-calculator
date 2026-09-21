import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/site";

const ULTIMA_ATUALIZACAO = new Date("2026-09-18");

const ROTAS = [
  "",
  "/valor-do-ponto",
  "/compra-de-pontos",
  "/clube",
  "/resgate",
  "/cartao",
  "/cenario",
  "/mcp",
  "/sobre",
  "/privacidade",
  "/termos",
  "/contato",
];

const INSTITUCIONAIS = new Set(["/sobre", "/privacidade", "/termos", "/contato"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return ROTAS.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: ULTIMA_ATUALIZACAO,
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : INSTITUCIONAIS.has(rota) ? 0.3 : 0.8,
  }));
}
