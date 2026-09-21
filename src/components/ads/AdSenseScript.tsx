import { ADSENSE_CLIENT, ADSENSE_SCRIPT_URL, adsAtivos } from "@/data/ads";

/**
 * Tag global do AdSense, como o painel fornece: <script async src>. Fica no
 * body e o React iça para o <head> (evita o `data-nscript` do `next/script`,
 * que o AdSense avisa não suportar). Só entra quando há publisher + slot.
 * A CMP do Google (Privacy & messaging) é servida por este mesmo script,
 * conforme configurado no painel — nada extra aqui.
 */
export function AdSenseScript() {
  if (!adsAtivos()) return null;
  return <script async src={`${ADSENSE_SCRIPT_URL}?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />;
}
