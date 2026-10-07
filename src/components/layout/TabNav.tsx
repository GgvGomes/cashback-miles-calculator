"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/brand/Logo";

const ROTAS = [
  { href: "/valor-do-ponto", label: "Valor do ponto" },
  { href: "/compra-de-pontos", label: "Compra de pontos" },
  { href: "/clube", label: "Clube" },
  { href: "/resgate", label: "Resgate" },
  { href: "/cartao", label: "Cartão" },
  { href: "/cenario", label: "Cenário" },
  { href: "/mcp", label: "IA (MCP)" },
];

function itemClasses(ativo: boolean, extra?: string) {
  return cn(
    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    ativo
      ? "bg-brand/10 text-brand ring-1 ring-inset ring-brand/20"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
    extra
  );
}

export function TabNav() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border/80 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
        <Link
          href="/"
          aria-label="Compensa? — início"
          className="-ml-1 shrink-0 rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Logo />
        </Link>

        <div className="relative hidden min-w-0 flex-1 md:block">
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
                  className={itemClasses(ativo, "shrink-0")}
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

        <div className="flex-1 md:hidden" />

        <PopoverPrimitive.Root open={aberto} onOpenChange={setAberto}>
          <PopoverPrimitive.Trigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="end"
              sideOffset={8}
              className="z-20 w-56 rounded-xl border border-border bg-background p-1.5 shadow-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 md:hidden"
            >
              <nav aria-label="Calculadoras" className="flex flex-col gap-1">
                {ROTAS.map((rota) => {
                  const ativo = pathname === rota.href;
                  return (
                    <Link
                      key={rota.href}
                      href={rota.href}
                      aria-current={ativo ? "page" : undefined}
                      onClick={() => setAberto(false)}
                      className={itemClasses(ativo)}
                    >
                      {rota.label}
                    </Link>
                  );
                })}
              </nav>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        <ThemeToggle />
      </div>
    </header>
  );
}
