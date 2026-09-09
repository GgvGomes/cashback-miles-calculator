import { TabNav } from "@/components/layout/TabNav";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TabNav />
      <main className="mx-auto max-w-5xl px-4 py-6 md:py-10">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground">
        Números conferidos em 2026-08. Confira na fonte oficial antes de agir.
      </footer>
    </div>
  );
}
