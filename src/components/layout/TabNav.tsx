"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

const ROTAS = [
  { href: "/", label: "Início" },
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
    <nav className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex gap-1 overflow-x-auto px-3 py-2">
        {ROTAS.map((rota) => {
          const ativo = pathname === rota.href;
          return (
            <Link
              key={rota.href}
              href={rota.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                ativo
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {rota.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
