/**
 * Configuração dos anúncios (Google AdSense). O script global entra sempre
 * (revisão do site); as unidades vêm de env `NEXT_PUBLIC_*`, então dev/preview
 * sem env não mostram anúncio.
 *
 * - `NEXT_PUBLIC_ADSENSE_CLIENT`         sobrescreve o id do publisher (padrão abaixo)
 * - `NEXT_PUBLIC_ADSENSE_SLOT_CONTEUDO`  unidade display abaixo da conta (calculadoras)
 * - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`   unidade display na coluna direita (desktop)
 * - `NEXT_PUBLIC_ADSENSE_SLOT_RODAPE`    unidade display no fim da página (home, /mcp)
 * - `NEXT_PUBLIC_ADS_PLACEHOLDER=1`      desenha caixa tracejada no lugar do anúncio (validar layout)
 *
 * Auto ads ficam desligados no painel: só slots manuais, com altura reservada
 * (sem CLS) e longe dos inputs (política de cliques acidentais).
 */
/** Publisher id. Fixo no código (o AdSense exige a tag em todas as páginas
 *  para revisar o site); env só sobrescreve. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-4366681109860919";

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
