import { cn } from "cn";
import type { Veredito as VeredictoTipo } from "@/lib/calc/types";

const CONFIG: Record<
  VeredictoTipo,
  { label: string; className: string }
> = {
  ok: {
    label: "COMPENSA",
    className: "bg-veredito-ok-bg text-veredito-ok border-veredito-ok/30",
  },
  limite: {
    label: "LIMÍTROFE",
    className:
      "bg-veredito-limite-bg text-veredito-limite border-veredito-limite/30",
  },
  nao: {
    label: "NÃO COMPENSA",
    className: "bg-veredito-nao-bg text-veredito-nao border-veredito-nao/30",
  },
};

export function Veredito({
  veredito,
  porque,
  className,
}: {
  veredito: VeredictoTipo;
  porque?: string;
  className?: string;
}) {
  const cfg = CONFIG[veredito];
  return (
    <div className={cn("space-y-1", className)}>
      <span
        className={cn(
          "inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-semibold",
          cfg.className
        )}
      >
        {cfg.label}
      </span>
      {porque ? (
        <p className="text-sm text-muted-foreground">{porque}</p>
      ) : null}
    </div>
  );
}
