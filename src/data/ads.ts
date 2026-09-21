/**
 * Configuração dos anúncios (Google AdSense). Tudo vem de env `NEXT_PUBLIC_*`
 * para o mesmo build servir dev/preview (sem anúncio) e produção (com).
 *
 * - `NEXT_PUBLIC_ADSENSE_CLIENT`         "ca-pub-XXXXXXXXXXXXXXXX" (id do publisher)
 * - `NEXT_PUBLIC_ADSENSE_SLOT_CONTEUDO`  unidade display abaixo da conta (calculadoras)
 * - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`   unidade display na coluna direita (desktop)
 * - `NEXT_PUBLIC_ADSENSE_SLOT_RODAPE`    unidade display no fim da página (home, /mcp)
 * - `NEXT_PUBLIC_ADS_PLACEHOLDER=1`      desenha caixa tracejada no lugar do anúncio (validar layout)
 *
 * Auto ads ficam desligados no painel: só slots manuais, com altura reservada
 * (sem CLS) e longe dos inputs (política de cliques acidentais).
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export const SLOTS = {
  conteudo: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTEUDO ?? "",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR ?? "",
  rodape: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RODAPE ?? "",
} as const;

export type PosicaoAd = keyof typeof SLOTS;

export const ADS_PLACEHOLDER = process.env.NEXT_PUBLIC_ADS_PLACEHOLDER === "1";

export const ADSENSE_SCRIPT_URL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

/** Id do publisher no formato do ads.txt (sem o prefixo "ca-"). */
export function publisherIdAdsTxt(client: string = ADSENSE_CLIENT): string {
  return client.replace(/^ca-/, "");
}

export function adsAtivos(client: string = ADSENSE_CLIENT, slots: Record<PosicaoAd, string> = SLOTS): boolean {
  return client.length > 0 && Object.values(slots).some((s) => s.length > 0);
}

export function slotDe(posicao: PosicaoAd, client: string = ADSENSE_CLIENT, slots: Record<PosicaoAd, string> = SLOTS): string | null {
  if (!client) return null;
  const slot = slots[posicao];
  return slot ? slot : null;
}

/** Linha do ads.txt exigida pelo AdSense; null se não há publisher configurado. */
export function linhaAdsTxt(client: string = ADSENSE_CLIENT): string | null {
  if (!client) return null;
  return `google.com, ${publisherIdAdsTxt(client)}, DIRECT, f08c47fec0942fa0`;
}
