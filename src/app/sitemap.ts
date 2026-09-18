import type { MetadataRoute } from "next";

const SITE_URL = "https://cashback-miles-calculator.vercel.app";

const ROTAS = [
  "",
  "/valor-do-ponto",
  "/compra-de-pontos",
  "/clube",
  "/resgate",
  "/cartao",
  "/cenario",
  "/mcp",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROTAS.map((rota) => ({
    url: `${SITE_URL}${rota}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: rota === "" ? 1 : 0.8,
  }));
}
