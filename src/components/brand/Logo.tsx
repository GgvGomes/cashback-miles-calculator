import { cn } from "cn";
import {
  MARK_PATH,
  MARK_STROKE,
  MARK_TILE_RADIUS,
  MARK_VIEWBOX,
} from "@/components/brand/mark";

/** Símbolo: tile violeta com "?" cuja haste vira check. Decorativo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className={cn("size-7 shrink-0", className)}
    >
      <rect
        width="32"
        height="32"
        rx={MARK_TILE_RADIUS}
        className="fill-brand"
      />
      <path
        d={MARK_PATH}
        fill="none"
        className="stroke-brand-foreground"
        strokeWidth={MARK_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Símbolo + wordmark "Compensa?". O nome acessível fica no link que o envolve. */
export function Logo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span className="font-heading text-[1.05rem] font-semibold tracking-tight text-foreground">
        Compensa<span className="text-brand">?</span>
      </span>
    </span>
  );
}
