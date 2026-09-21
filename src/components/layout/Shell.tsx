import Link from "next/link";
import { TabNav } from "@/components/layout/TabNav";

const LINKS_RODAPE = [
  { href: "/sobre", label: "Sobre" },
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos de uso" },
  { href: "/contato", label: "Contato" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <TabNav />
      <main
        id="conteudo"
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 pb-28 md:py-12"
      >
        {children}
      </main>
      <footer className="border-t border-border/80">
        <div className="mx-auto max-w-5xl space-y-3 px-4 py-6 text-xs text-muted-foreground">
          <nav aria-label="Institucional" className="flex flex-wrap gap-x-4 gap-y-2">
            {LINKS_RODAPE.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-1 font-medium text-foreground/80 underline-offset-4 hover:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p>
            Cada resultado mostra a fonte e a data em que o número foi
            conferido. Confira sempre no site oficial do programa antes de
            decidir. Conteúdo educativo, não é aconselhamento financeiro.
          </p>
          <p>
            Este site exibe anúncios do Google AdSense, que usa cookies. Veja a{" "}
            <Link href="/privacidade" className="underline underline-offset-4">
              política de privacidade
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
