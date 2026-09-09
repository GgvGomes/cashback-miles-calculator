"use client";

import { useEffect, useState } from "react";

/**
 * Estado persistido em localStorage, seguro para SSR: no primeiro render usa
 * `initialValue`, e só lê o localStorage depois do mount — evita hydration
 * mismatch entre servidor e cliente. O setState único no efeito de hidratação
 * é intencional (só dispara uma vez, no mount) — por isso a regra de
 * cascading-render é desligada aqui, não usada como escape geral.
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratação única no mount, não é sync contínuo com sistema externo
        setState(JSON.parse(raw) as T);
      }
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue com o valor inicial.
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // localStorage indisponível — ignora, o estado continua em memória.
    }
  }, [key, state, hydrated]);

  return [state, setState];
}
