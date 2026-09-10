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
import { valorPorMil, valorPorPonto, razaoRetorno, vereditoResgate } from "@/lib/calc/resgate";
import { formatBRL, formatPts } from "@/lib/calc/format";
import { usePersistedState } from "@/hooks/usePersistedState";

interface Inputs {
  passagemBRL: number;
  taxas: number;
  pontos: number;
  cpmPago: number;
}

const DEFAULT: Inputs = {
  passagemBRL: 1700,
  taxas: 90,
  pontos: 15000,
  cpmPago: 26,
};

export default function ValorDoPontoPage() {
  const [inputs, setInputs] = usePersistedState<Inputs>("valor-do-ponto-inputs", DEFAULT);

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const resultado = useMemo(() => {
    const vpm = valorPorMil(inputs.passagemBRL, inputs.taxas, inputs.pontos);
    const vpp = valorPorPonto(inputs.passagemBRL, inputs.taxas, inputs.pontos);
    const razao = razaoRetorno(vpp, inputs.cpmPago);
    return { vpm, vpp, razao, veredito: vereditoResgate(razao) };
  }, [inputs]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Quanto vale o seu ponto nesse resgate?</h1>
            <p className="text-muted-foreground">
              Compare o que o resgate devolve com o que você pagou pelo ponto —
              é essa razão que decide se emitir vale a pena.
            </p>
          </div>
          <ComoUtilizar conteudo={comoUtilizar.valorDoPonto} />
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
              helpText="Mesma data, mesmo trecho, mesma cabine."
            />
            <CampoMoeda
              label="Taxas pagas mesmo com pontos"
              value={inputs.taxas}
              onChange={(v) => set("taxas", v)}
            />
            <CampoPontos
              label="Pontos/milhas usados"
              value={inputs.pontos}
              onChange={(v) => set("pontos", v)}
            />
            <CampoMoeda
              label="CPM (custo por mil pontos) que você pagou/pagaria"
              value={inputs.cpmPago}
              onChange={(v) => set("cpmPago", v)}
              helpText="Preço-alvo de compra do programa, ou o que você realmente pagou."
            />
          </CardContent>
        </Card>

        <FormulaBlock
          titulo="A conta, com os seus números"
          linhas={[
            `valor por ponto = (${formatBRL(inputs.passagemBRL)} − ${formatBRL(inputs.taxas)}) ÷ ${formatPts(inputs.pontos)} = ${resultado.vpp.toFixed(4)}`,
            `custo por ponto = ${formatBRL(inputs.cpmPago)} ÷ 1000 = ${(inputs.cpmPago / 1000).toFixed(4)}`,
            `razão = ${resultado.vpp.toFixed(4)} ÷ ${(inputs.cpmPago / 1000).toFixed(4)} = ${resultado.razao.toFixed(2)}×`,
          ]}
        />

        <FonteNota
          fonte="05-usar-maximizar.md (fórmula do valor por ponto e régua de decisão)"
          consultadoEm="2026-08-18"
        />
      </div>

      <ResultadoCard
        titulo="Razão de retorno"
        valorFormatado={`${resultado.razao.toFixed(2)}×`}
        veredito={resultado.veredito}
        porque={
          resultado.razao > 4
            ? "Sweet spot: acima de 4×, emita e não fique procurando melhor."
            : resultado.razao > 2
              ? "Bom resgate: acima de 2× justifica todo o trabalho de acumular."
              : resultado.razao >= 1.3
                ? "Aceitável: emita se a viagem já estava decidida."
                : "Abaixo de 1,3×: você entregaria o ponto quase de graça. Guarde o saldo."
        }
      />
    </div>
  );
}
