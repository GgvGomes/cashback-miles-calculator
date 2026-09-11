"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const ROTAS = [
  { href: "/valor-do-ponto", label: "Valor do ponto" },
  { href: "/compra-de-pontos", label: "Compra de pontos" },
  { href: "/clube", label: "Clube" },
  { href: "/resgate", label: "Resgate" },
  { href: "/cartao", label: "Cartão" },
  { href: "/cenario", label: "Cenário" },
];

export function TabNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4">
        <Link
          href="/"
          className="shrink-0 text-[0.95rem] font-semibold tracking-tight text-foreground"
        >
          Compensa<span className="text-primary">?</span>
        </Link>

        <div className="relative min-w-0 flex-1">
          <nav
            aria-label="Calculadoras"
            className="flex gap-1 overflow-x-auto"
          >
            {ROTAS.map((rota) => {
              const ativo = pathname === rota.href;
              return (
                <Link
                  key={rota.href}
                  href={rota.href}
                  aria-current={ativo ? "page" : undefined}
                  className={cn(
                    "shrink-0 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    ativo
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {rota.label}
                </Link>
              );
            })}
          </nav>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent"
          />
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
