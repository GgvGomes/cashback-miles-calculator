import Link from "next/link";
import { FonteNota } from "@/components/calc/FonteNota";
import type { ConteudoSeo as ConteudoSeoTipo } from "@/data/seo/tipos";

/**
 * Texto explicativo + FAQ abaixo da calculadora. Sem hooks, sem modal:
 * tudo fica no HTML servido, para o Google conseguir ler. O FAQ usa
 * <details> nativo (conteúdo permanece no DOM mesmo fechado) e emite
 * schema.org/FAQPage.
 */
export function ConteudoSeo({ conteudo }: { conteudo: ConteudoSeoTipo }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: conteudo.faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };

  return (
    <article className="mt-12 space-y-10 border-t border-border/80 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight">{conteudo.titulo}</h2>
        <p className="max-w-2xl text-muted-foreground">{conteudo.resumo}</p>
      </header>

      {conteudo.secoes.map((secao) => (
        <section key={secao.titulo} className="space-y-3">
          <h3 className="text-base font-semibold">{secao.titulo}</h3>
          {secao.paragrafos.map((p, i) => (
            <p key={i} className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </section>
      ))}

      <section className="space-y-3">
        <h3 className="text-base font-semibold">Perguntas frequentes</h3>
        <div className="divide-y divide-border/80 rounded-lg border border-border/80">
          {conteudo.faq.map((item) => (
            <details key={item.pergunta} className="group px-4 py-3">
              <summary className="cursor-pointer list-none text-sm font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="mr-2 inline-block transition-transform group-open:rotate-90">
                  ›
                </span>
                {item.pergunta}
              </summary>
              <p className="mt-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </section>

      {conteudo.relacionadas.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-semibold">Calculadoras relacionadas</h3>
          <ul className="space-y-2 text-sm">
            {conteudo.relacionadas.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="font-medium underline-offset-4 hover:underline">
                  {r.titulo}
                </Link>
                <span className="text-muted-foreground"> — {r.porque}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <FonteNota fonte={conteudo.fonte} consultadoEm={conteudo.consultadoEm} />
    </article>
  );
}
