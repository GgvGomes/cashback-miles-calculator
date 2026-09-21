import Link from "next/link";
import type { PaginaLegal as PaginaLegalTipo } from "@/data/legal";
import { EMAIL_CONTATO } from "@/data/legal";

function dataPtBr(iso: string) {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/** Página institucional: título, resumo, seções e data de atualização. Sem anúncio (política do AdSense). */
export function PaginaLegal({ pagina }: { pagina: PaginaLegalTipo }) {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{pagina.titulo}</h1>
        <p className="text-muted-foreground">{pagina.resumo}</p>
      </header>

      {pagina.secoes.map((s) => (
        <section key={s.titulo} className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">{s.titulo}</h2>
          {s.paragrafos.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {p}
            </p>
          ))}
          {s.lista ? (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
              {s.lista.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {pagina.rota === "/contato" ? (
        <p className="text-sm">
          <a href={`mailto:${EMAIL_CONTATO}`} className="font-medium underline underline-offset-4">
            {EMAIL_CONTATO}
          </a>
        </p>
      ) : null}

      <footer className="border-t border-border/80 pt-4 text-xs text-muted-foreground">
        Última atualização: {dataPtBr(pagina.atualizadoEm)}.{" "}
        {pagina.rota !== "/privacidade" ? (
          <>
            Veja também a{" "}
            <Link href="/privacidade" className="underline underline-offset-4">
              política de privacidade
            </Link>
            .
          </>
        ) : (
          <>
            Veja também os{" "}
            <Link href="/termos" className="underline underline-offset-4">
              termos de uso
            </Link>
            .
          </>
        )}
      </footer>
    </article>
  );
}
