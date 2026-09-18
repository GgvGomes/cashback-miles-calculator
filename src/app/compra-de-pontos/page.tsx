"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampoMoeda } from "@/components/calc/CampoMoeda";
import { CampoPontos } from "@/components/calc/CampoPontos";
import { SeletorPrograma } from "@/components/calc/SeletorPrograma";
import { ResultadoCard } from "@/components/calc/ResultadoCard";
import { FormulaBlock } from "@/components/calc/FormulaBlock";
import { FonteNota } from "@/components/calc/FonteNota";
import { ComoUtilizar } from "@/components/calc/ComoUtilizar";
import { comoUtilizar } from "@/data/como-utilizar";
import { ConteudoSeo } from "@/components/calc/ConteudoSeo";
import { seoConteudo } from "@/data/seo";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cpm, cpmEfetivo, classificaCPM } from "@/lib/calc/cpm";
import { formatBRL, formatPts } from "@/lib/calc/format";
import { programas } from "@/data/programas";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Veredito as VeredictoTipo } from "@/lib/calc/types";

interface Inputs {
  programaId: string;
  precoPago: number;
  pontosRecebidos: number;
  comTransferencia: boolean;
  bonusTransferencia: number;
}

const DEFAULT: Inputs = {
  programaId: "livelo",
  precoPago: 588,
  pontosRecebidos: 20000,
  comTransferencia: false,
  bonusTransferencia: 0.8,
};

function classificacaoParaVeredito(c: ReturnType<typeof classificaCPM>): VeredictoTipo {
  if (c === "excepcional" || c === "bom") return "ok";
  if (c === "aceitavel") return "limite";
  return "nao";
}

export default function CompraDePontosPage() {
  const [inputs, setInputs] = usePersistedState<Inputs>("compra-de-pontos-inputs", DEFAULT);
  const programa = programas.find((p) => p.id === inputs.programaId) ?? programas[0];
  const ehCoalizao = programa.tipo === "coalizao";

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const resultado = useMemo(() => {
    const cpmBase = cpm(inputs.precoPago, inputs.pontosRecebidos);
    const aplicaBonus = ehCoalizao && inputs.comTransferencia;
    const cpmFinal = aplicaBonus
      ? cpmEfetivo(cpmBase, inputs.bonusTransferencia)
      : cpmBase;
    const classe = classificaCPM(programa.id, cpmFinal);
    return { cpmBase, cpmFinal, classe };
  }, [inputs, ehCoalizao, programa.id]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">Essa compra de pontos vale o preço?</h1>
            <p className="text-muted-foreground">
              Todo CPM (custo por mil pontos) na mesma régua — compra avulsa,
              bonificada, ou já transferida para a aérea com bônus.
            </p>
          </div>
          <ComoUtilizar conteudo={comoUtilizar.compraDePontos} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>A compra</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <SeletorPrograma
              value={inputs.programaId}
              onChange={(id) => set("programaId", id)}
              label="Programa de origem"
            />
            <CampoMoeda
              label="Preço pago"
              value={inputs.precoPago}
              onChange={(v) => set("precoPago", v)}
            />
            <CampoPontos
              label="Pontos recebidos"
              value={inputs.pontosRecebidos}
              onChange={(v) => set("pontosRecebidos", v)}
            />
          </CardContent>
        </Card>

        {ehCoalizao ? (
          <Card>
            <CardHeader>
              <CardTitle>Transferência com bônus (opcional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="com-transferencia"
                  checked={inputs.comTransferencia}
                  onCheckedChange={(v) => set("comTransferencia", v)}
                />
                <Label htmlFor="com-transferencia">
                  Vou transferir para uma aérea com bônus
                </Label>
              </div>
              {inputs.comTransferencia ? (
                <CampoPontos
                  label="Bônus de transferência"
                  value={inputs.bonusTransferencia * 100}
                  onChange={(v) => set("bonusTransferencia", v / 100)}
                  unidade="%"
                />
              ) : null}
            </CardContent>
          </Card>
        ) : (
          <div className="rounded-md border border-veredito-limite/30 bg-veredito-limite-bg p-3 text-sm text-veredito-limite">
            ⚠️ {programa.nome} é clube/programa aéreo: o ponto já nasce lá, não
            passa por transferência bonificada.
          </div>
        )}

        <FormulaBlock
          titulo="A conta, com os seus números"
          linhas={[
            `CPM = ${formatBRL(inputs.precoPago)} ÷ (${formatPts(inputs.pontosRecebidos)} ÷ 1000) = ${formatBRL(resultado.cpmBase)} por mil`,
            ...(ehCoalizao && inputs.comTransferencia
              ? [
                  `CPM efetivo = ${formatBRL(resultado.cpmBase)} ÷ (1 + ${(inputs.bonusTransferencia * 100).toFixed(0)}%) = ${formatBRL(resultado.cpmFinal)} por mil`,
                ]
              : []),
          ]}
        />

        <FonteNota
          fonte="04-acumulo-pontos.md (fórmula do CPM e régua por programa)"
          consultadoEm="2026-08-18"
        />

        <ConteudoSeo conteudo={seoConteudo.compraDePontos} />
      </div>

      <ResultadoCard
        titulo="CPM final"
        valorFormatado={formatBRL(resultado.cpmFinal)}
        veredito={classificacaoParaVeredito(resultado.classe)}
        porque={`Classificação: ${resultado.classe} para ${programa.nome} (régua 04:376-384).`}
      />
    </div>
  );
}
