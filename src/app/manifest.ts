import type { MetadataRoute } from "next";
import { BRAND_HEX } from "@/components/brand/mark";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Compensa? — Calculadora de pontos e milhas",
    short_name: "Compensa?",
    description:
      "Calculadoras grátis para saber se pontos, milhas, clubes e cartões compensam.",
    start_url: "/",
    display: "standalone",
    lang: "pt-BR",
    background_color: BRAND_HEX.papel,
    theme_color: BRAND_HEX.violeta,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
