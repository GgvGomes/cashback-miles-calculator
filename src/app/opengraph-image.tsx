import { ImageResponse } from "next/og";
import { SITE_URL } from "@/data/site";
import {
  BRAND_HEX,
  MARK_PATH,
  MARK_STROKE,
  MARK_TILE_RADIUS,
  MARK_VIEWBOX,
} from "@/components/brand/mark";

export const alt = "Compensa? — Calculadora de pontos e milhas grátis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Fonte = { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" };

/**
 * Bricolage Grotesque 400/700 (fonte de títulos da marca) para a OG image. Se o
 * Google Fonts falhar no build, cai na sans padrão em vez de quebrar a rota.
 */
async function carregarBricolage(): Promise<Fonte[]> {
  try {
    const css = await (
      await fetch(
        "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700",
      )
    ).text();
    const faces = [
      ...css.matchAll(
        /font-weight: (\d+);[\s\S]*?src: url\((.+?)\) format\('(?:opentype|truetype)'\)/g,
      ),
    ];
    return await Promise.all(
      faces.map(async ([, peso, url]) => ({
        name: "Bricolage",
        data: await (await fetch(url)).arrayBuffer(),
        weight: Number(peso) as 400 | 700,
        style: "normal" as const,
      })),
    );
  } catch {
    return [];
  }
}

export default async function OpenGraphImage() {
  const fontes = await carregarBricolage();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `radial-gradient(circle at 0% 0%, #2a2470 0%, ${BRAND_HEX.tinta} 55%)`,
          color: "#f4f3fb",
          fontFamily: fontes.length ? "Bricolage" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox={MARK_VIEWBOX}>
            <rect width="32" height="32" rx={MARK_TILE_RADIUS} fill={BRAND_HEX.violeta} />
            <path
              d={MARK_PATH}
              fill="none"
              stroke="#fff"
              strokeWidth={MARK_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
            Compensa<span style={{ color: "#a99dff" }}>?</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Calculadora de pontos e milhas
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 400, color: "#c9c5e6", lineHeight: 1.35 }}>
            Quanto vale o seu ponto? Comprar milhas, assinar clube ou pagar
            anuidade compensa? Conta aberta, fonte e data em cada número.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, fontWeight: 400 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              borderRadius: 999,
              background: BRAND_HEX.violeta,
              color: "#fff",
              fontWeight: 600,
            }}
          >
            grátis · sem cadastro · conta aberta
          </div>
          <div style={{ display: "flex", color: "#8f8ab0" }}>
            {SITE_URL.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontes.length ? fontes : undefined,
    },
  );
}
