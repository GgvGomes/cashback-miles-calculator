"use client";

import { useEffect, useRef } from "react";
import { cn } from "cn";
import { ADSENSE_CLIENT, ADS_PLACEHOLDER, slotDe, type PosicaoAd } from "@/data/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Altura mínima reservada por posição — o anúncio responsivo escolhe a altura
 * final, mas o espaço já existe no layout, então nada "pula" (CLS zero).
 */
const ALTURA: Record<PosicaoAd, string> = {
  conteudo: "min-h-[280px] md:min-h-[250px]",
  sidebar: "min-h-[250px]",
  rodape: "min-h-[100px] md:min-h-[90px]",
};

export function AdSlot({ posicao, className }: { posicao: PosicaoAd; className?: string }) {
  const slot = slotDe(posicao);
  const enviado = useRef(false);

  useEffect(() => {
    if (!slot || enviado.current) return;
    enviado.current = true;
    try {
      (window.adsbygoogle ||= []).push({});
    } catch {
      // bloqueador de anúncios ou script ainda não carregado: espaço fica vazio, sem quebrar a página
    }
  }, [slot]);

  if (!slot && !ADS_PLACEHOLDER) return null;

  return (
    <aside aria-label="Publicidade" className={cn("w-full max-w-full overflow-hidden", className)}>
      <p className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">Publicidade</p>
      {slot ? (
        <ins
          className={cn("adsbygoogle block w-full", ALTURA[posicao])}
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className={cn(
            "flex w-full items-center justify-center rounded-md border border-dashed border-border text-xs text-muted-foreground",
            ALTURA[posicao]
          )}
        >
          anúncio · {posicao}
        </div>
      )}
    </aside>
  );
}
