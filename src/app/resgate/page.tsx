"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampoMoeda } from "@/components/calc/CampoMoeda";
import { CampoPontos } from "@/components/calc/CampoPontos";
import { ResultadoCard } from "@/components/calc/ResultadoCard";
import { FormulaBlock } from "@/components/calc/FormulaBlock";
import { FonteNota } from "@/components/calc/FonteNota";
import { ComoUtilizar } from "@/components/calc/ComoUtilizar";
import { comoUtilizar } from "@/data/como-utilizar";
import { ConteudoSeo } from "@/components/calc/ConteudoSeo";
import { seoConteudo } from "@/data/seo";
import { valorPorMil } from "@/lib/calc/resgate";
import { formatBRL, formatPts } from "@/lib/calc/format";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Veredito as VeredictoTipo } from "@/lib/calc/types";

interface Inputs {
  passagemBRL: number;
  taxas: number;
  milhas: number;
  precoAlvoReferencia: number;
}

const DEFAULT: Inputs = {
  passagemBRL: 1200,
  taxas: 120,
  milhas: 40000,
  precoAlvoReferencia: 30,
};

export default function ResgatePage() {
  const [inputs, setInputs] = usePersistedState<Inputs>("resgate-inputs", DEFAULT);

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const resultado = useMemo(() => {
    const vpm = valorPorMil(inputs.passagemBRL, inputs.taxas, inputs.milhas);
    let veredito: VeredictoTipo = "nao";
    if (vpm >= inputs.precoAlvoReferencia) veredito = "ok";
    else if (vpm >= inputs.precoAlvoReferencia * 0.8) veredito = "limite";
    return { vpm, veredito };
  }, [inputs]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">Quanto esse resgate devolve por milheiro?</h1>
            <p className="text-muted-foreground">
              O valor por mil no resgate é o teto do que faz sentido pagar por
              aquele ponto — compare com o preço-alvo de compra do programa.
            </p>
          </div>
          <ComoUtilizar conteudo={comoUtilizar.resgate} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>O resgate</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <CampoMoeda
              label="Preço da mesma passagem em dinheiro"
              value={inputs.passagemBRL}
              onChange={(v) => set("passagemBRL", v)}
            />
            <CampoMoeda
              label="Taxas pagas mesmo com milhas"
              value={inputs.taxas}
              onChange={(v) => set("taxas", v)}
            />
            <CampoPontos
              label="Milhas necessárias"
              value={inputs.milhas}
              onChange={(v) => set("milhas", v)}
              unidade="milhas"
            />
            <CampoMoeda
              label="Preço-alvo de compra do programa"
              value={inputs.precoAlvoReferencia}
              onChange={(v) => set("precoAlvoReferencia", v)}
              helpText="O teto que valeria pagar por mil pontos hoje."
            />
          </CardContent>
        </Card>

        <FormulaBlock
          titulo="A conta, com os seus números"
          linhas={[
            `valor por mil = (${formatBRL(inputs.passagemBRL)} − ${formatBRL(inputs.taxas)}) ÷ (${formatPts(inputs.milhas)} ÷ 1000) = ${formatBRL(resultado.vpm)}`,
          ]}
        />

        <FonteNota
          fonte="06-clubes-calculadora.md / 05-usar-maximizar.md (valor por mil no resgate)"
          consultadoEm="2026-08-18"
        />

        <ConteudoSeo conteudo={seoConteudo.resgate} />
      </div>

      <ResultadoCard
        titulo="Valor por mil no resgate"
        valorFormatado={formatBRL(resultado.vpm)}
        veredito={resultado.veredito}
        porque={`Preço-alvo de referência: ${formatBRL(inputs.precoAlvoReferencia)}/mil.`}
      />
    </div>
  );
}
