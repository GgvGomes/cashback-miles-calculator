import { ImageResponse } from "next/og";
import { SITE_URL } from "@/data/site";

export const alt = "Compensa? — Calculadora de pontos e milhas grátis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #0f1420 0%, #1b2436 100%)",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9fb0cc" }}>
          {SITE_URL.replace(/^https?:\/\//, "")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Calculadora de pontos e milhas
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#c8d3e6", lineHeight: 1.3 }}>
            Quanto vale o seu ponto? Comprar milhas, assinar clube ou pagar
            anuidade compensa? Conta aberta, fonte e data em cada número.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#3b82f6",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Compensa?
          </div>
          <div style={{ display: "flex", color: "#9fb0cc" }}>grátis · sem cadastro</div>
        </div>
      </div>
    ),
    size,
  );
}
