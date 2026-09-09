"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseNumeroPtBR } from "@/lib/calc/format";

/** Campo de pontos/milhas, com máscara pt-BR e unidade visível. */
export function CampoPontos({
  label,
  value,
  onChange,
  unidade = "pontos",
  helpText,
}: {
  label: string;
  value: number;
  onChange: (valor: number) => void;
  unidade?: string;
  helpText?: string;
}) {
  const id = useId();
  const [texto, setTexto] = useState(value ? String(value) : "");

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          inputMode="decimal"
          className="pr-20"
          placeholder="0"
          value={texto}
          onChange={(e) => {
            setTexto(e.target.value);
            onChange(parseNumeroPtBR(e.target.value));
          }}
        />
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {unidade}
        </span>
      </div>
      {helpText ? (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      ) : null}
    </div>
  );
}
