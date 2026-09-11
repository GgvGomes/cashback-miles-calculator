import { TabNav } from "@/components/layout/TabNav";

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
        <p className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground">
          Cada resultado mostra a fonte e a data em que o número foi
          conferido. Confira sempre no site oficial do programa antes de
          decidir.
        </p>
      </footer>
    </div>
  );
}
