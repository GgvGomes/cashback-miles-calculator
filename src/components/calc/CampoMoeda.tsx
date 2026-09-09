"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseNumeroPtBR } from "@/lib/calc/format";

/**
 * Campo de valor em R$, com máscara pt-BR (aceita "1.234,56", "1234,56" ou "1234.56").
 * Emite o número já convertido em `onChange`.
 */
export function CampoMoeda({
  label,
  value,
  onChange,
  placeholder,
  helpText,
}: {
  label: string;
  value: number;
  onChange: (valor: number) => void;
  placeholder?: string;
  helpText?: string;
}) {
  const id = useId();
  const [texto, setTexto] = useState(value ? String(value).replace(".", ",") : "");

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          R$
        </span>
        <Input
          id={id}
          inputMode="decimal"
          className="pl-8"
          placeholder={placeholder ?? "0,00"}
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            onChange(parseNumeroPtBR(e.target.value));
          }}
        />
      </div>
      {helpText ? (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      ) : null}
    </div>
  );
}
