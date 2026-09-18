"use client";

import { useId, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampoMoeda } from "@/components/calc/CampoMoeda";
import { CampoPontos } from "@/components/calc/CampoPontos";
import { ResultadoCard } from "@/components/calc/ResultadoCard";
import { FonteNota } from "@/components/calc/FonteNota";
import { ComoUtilizar } from "@/components/calc/ComoUtilizar";
import { comoUtilizar } from "@/data/como-utilizar";
import { ConteudoSeo } from "@/components/calc/ConteudoSeo";
import { seoConteudo } from "@/data/seo";
import {
  totalCusto,
  totalPontos,
  cpmBlended,
  cpmAcumulado,
  vereditoCenario,
} from "@/lib/calc/cenario";
import { formatBRL, formatPts } from "@/lib/calc/format";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Step, TipoStep } from "@/lib/calc/types";

const TIPOS: { value: TipoStep; label: string }[] = [
  { value: "compra", label: "Compra de pontos" },
  { value: "clube", label: "Clube (mensalidade × meses)" },
  { value: "transferencia", label: "Transferência com bônus" },
  { value: "gasto-bonificado", label: "Gasto bonificado" },
  { value: "custo-extra", label: "Custo extra" },
];

export default function CenarioPage() {
  const tipoId = useId();
  const descricaoId = useId();
  const [steps, setSteps] = usePersistedState<Step[]>("cenario-steps", []);
  const [valorDeUso, setValorDeUso] = usePersistedState<number>(
    "cenario-valor-de-uso",
    21
  );
  const [novoTipo, setNovoTipo] = useState<TipoStep>("compra");
  const [novoLabel, setNovoLabel] = useState("");
  const [novoCusto, setNovoCusto] = useState(0);
  const [novoPontos, setNovoPontos] = useState(0);

  const resultado = useMemo(() => {
    const custo = totalCusto(steps);
    const pontos = totalPontos(steps);
    const cpm = cpmBlended(steps);
    const veredito = vereditoCenario(cpm, valorDeUso);
    const acumulados = steps.map((_, i) => cpmAcumulado(steps, i));
    return { custo, pontos, cpm, veredito, acumulados };
  }, [steps, valorDeUso]);

  function adicionarStep() {
    if (!novoLabel.trim()) return;
    setSteps((prev) => [
      ...prev,
      {
        tipo: novoTipo,
        label: novoLabel.trim(),
        custoBRL: novoTipo === "transferencia" ? 0 : novoCusto,
        pontosGerados: novoPontos,
      },
    ]);
    setNovoLabel("");
    setNovoCusto(0);
    setNovoPontos(0);
  }

  function removerStep(i: number) {
    setSteps((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">Somando tudo, o cenário compensa?</h1>
            <p className="text-muted-foreground">
              Empilhe compra, clube, transferência e gasto bonificado num CPM
              (custo por mil pontos) único — e veja qual passo estraga a
              conta.
            </p>
          </div>
          <ComoUtilizar conteudo={comoUtilizar.cenario} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Adicionar passo</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor={tipoId} className="text-sm font-medium">Tipo</label>
              <Select value={novoTipo} onValueChange={(v) => setNovoTipo(v as TipoStep)}>
                <SelectTrigger id={tipoId} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor={descricaoId} className="text-sm font-medium">Descrição</label>
              <Input
                id={descricaoId}
                value={novoLabel}
                onChange={(e) => setNovoLabel(e.target.value)}
                placeholder="Ex.: Compra Livelo em promoção"
              />
            </div>
            {novoTipo !== "transferencia" ? (
              <CampoMoeda label="Custo (R$)" value={novoCusto} onChange={setNovoCusto} />
            ) : null}
            <CampoPontos
              label={
                novoTipo === "transferencia" ? "Pontos extras do bônus" : "Pontos gerados"
              }
              value={novoPontos}
              onChange={setNovoPontos}
            />
            <Button onClick={adicionarStep} className="sm:col-span-2">
              Adicionar passo
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passos do cenário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {steps.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhum passo ainda. Adicione um acima.
              </p>
            ) : (
              steps.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium break-words">{s.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBRL(s.custoBRL)} · {formatPts(s.pontosGerados)} pts
                      · CPM acumulado até aqui: {formatBRL(resultado.acumulados[i] ?? 0)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="secondary">{s.tipo}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => removerStep(i)}>
                      Remover
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor de uso de referência</CardTitle>
          </CardHeader>
          <CardContent>
            <CampoMoeda
              label="Valor de uso do programa de destino (R$/mil)"
              value={valorDeUso}
              onChange={setValorDeUso}
              helpText="Ex.: Smiles ~R$21, Livelo ~R$23 (MilhasBot, jul-ago/2026)."
            />
          </CardContent>
        </Card>

        <FonteNota
          fonte="Regra de corte do clube (06-clubes-calculadora.md), aplicada ao CPM combinado do cenário"
          consultadoEm="2026-08-18"
        />

        <ConteudoSeo conteudo={seoConteudo.cenario} />
      </div>

      <ResultadoCard
        titulo={`CPM combinado (${formatPts(resultado.pontos)} pts, ${formatBRL(resultado.custo)})`}
        valorFormatado={formatBRL(resultado.cpm)}
        veredito={resultado.veredito}
        porque={`Comparado contra ${formatBRL(valorDeUso)}/mil × 80% = ${formatBRL(valorDeUso * 0.8)}/mil.`}
      />
    </div>
  );
}
