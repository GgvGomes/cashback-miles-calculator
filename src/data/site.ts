/**
 * URL pública do site. Centralizada aqui para a troca de domínio (vercel.app →
 * domínio próprio) ser só uma env na Vercel, sem caçar strings pelo código.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cashback-miles-calculator.vercel.app"
).replace(/\/$/, "");
