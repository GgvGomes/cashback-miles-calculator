import { TabNav } from "@/components/layout/TabNav";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TabNav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:py-12">
        {children}
      </main>
      <footer className="border-t border-border/80">
        <p className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground">
          Números conferidos em 2026-08. Confira na fonte oficial antes de agir.
        </p>
      </footer>
    </div>
  );
}
