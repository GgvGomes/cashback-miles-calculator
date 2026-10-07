/**
 * Geometria única do símbolo "Compensa?" (ADR-019): um ponto de interrogação
 * cuja haste termina num check — a pergunta que vira resposta. Usada pelo
 * componente <Logo>, pelos ícones gerados e pela imagem Open Graph.
 * viewBox 32×32, traço branco sobre tile violeta.
 */
export const MARK_VIEWBOX = "0 0 32 32";
export const MARK_PATH = "M10.6 12.2a5.6 5.6 0 1 1 9 4.5L15.2 24.8 10.6 20.6";
export const MARK_STROKE = 3.2;
export const MARK_TILE_RADIUS = 8;

/** Cores fixas para assets estáticos (ícones, OG), onde não há CSS vars. */
export const BRAND_HEX = {
  violeta: "#5b4bff",
  tinta: "#12131f",
  papel: "#f6f5fb",
} as const;

