"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CampoMoeda } from "@/components/calc/CampoMoeda";
import { CampoPontos } from "@/components/calc/CampoPontos";
import { SeletorPrograma } from "@/components/calc/SeletorPrograma";
import { ResultadoCard } from "@/components/calc/ResultadoCard";
import { FormulaBlock } from "@/components/calc/FormulaBlock";
import { FonteNota } from "@/components/calc/FonteNota";
import { ComoUtilizar } from "@/components/calc/ComoUtilizar";
import { AdSlot } from "@/components/ads/AdSlot";
import { comoUtilizar } from "@/data/como-utilizar";
import { ConteudoSeo } from "@/components/calc/ConteudoSeo";
import { seoConteudo } from "@/data/seo";
import { cpmComAdesao, custoOportunidade, vereditoClube } from "@/lib/calc/clube";
import { cpmEfetivo } from "@/lib/calc/cpm";
import { formatBRL, formatPts } from "@/lib/calc/format";
import { programas } from "@/data/programas";
import { indicadores } from "@/data/indicadores";
import { usePersistedState } from "@/hooks/usePersistedState";

interface Inputs {
  programaId: string;
  mensalidade: number;
  meses: number;
  pontosMes: number;
  bonusAdesao: number;
  bonusTransferencia: number; // 0 a 1, só coalizão
  passagemBRL: number;
  taxas: number;
  milhasNecessarias: number;
  pagoAVista: boolean;
}

const DEFAULT: Inputs = {
  programaId: "livelo",
  mensalidade: 44.9,
  meses: 12,
  pontosMes: 1000,
  bonusAdesao: 14800,
  bonusTransferencia: 0.8,
  passagemBRL: 1200,
  taxas: 120,
  milhasNecessarias: 40000,
  pagoAVista: false,
};

export default function ClubePage() {
  const [inputs, setInputs] = usePersistedState<Inputs>("clube-inputs", DEFAULT);

  const programa = programas.find((p) => p.id === inputs.programaId) ?? programas[0];
  const ehCoalizao = programa.tipo === "coalizao";

  const resultado = useMemo(() => {
    const cpm = cpmComAdesao(
      inputs.mensalidade,
      inputs.meses,
      inputs.pontosMes,
      inputs.bonusAdesao
    );
    const bonus = ehCoalizao ? inputs.bonusTransferencia : 0;
    const cpmEf = cpmEfetivo(cpm, bonus);
    const valorPorMilResgate =
      inputs.milhasNecessarias > 0
        ? (inputs.passagemBRL - inputs.taxas) / (inputs.milhasNecessarias / 1000)
        : 0;
    const totalPago = inputs.mensalidade * inputs.meses;
    const oportunidade = inputs.pagoAVista
      ? custoOportunidade(
          totalPago,
          indicadores.taxaMensalLiquida.valor,
          inputs.meses
        )
      : 0;
    const veredito = vereditoClube(cpmEf, valorPorMilResgate);
    return { cpm, cpmEf, valorPorMilResgate, totalPago, oportunidade, veredito };
  }, [inputs, ehCoalizao]);

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">Vale assinar o clube?</h1>
            <p className="text-muted-foreground">
              Assine só se o CPM efetivo (custo por mil pontos, depois do
              bônus de transferência) ficar no máximo em 80% do que o seu
              resgate devolve.
            </p>
          </div>
          <ComoUtilizar conteudo={comoUtilizar.clube} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Programa e plano</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <SeletorPrograma
              value={inputs.programaId}
              onChange={(id) => set("programaId", id)}
            />
            <CampoMoeda
              label="Mensalidade"
              value={inputs.mensalidade}
              onChange={(v) => set("mensalidade", v)}
            />
            <CampoPontos
              label="Pontos por mês"
              value={inputs.pontosMes}
              onChange={(v) => set("pontosMes", v)}
            />
            <CampoPontos
              label="Meses de permanência"
              value={inputs.meses}
              onChange={(v) => set("meses", v)}
              unidade="meses"
            />
            <CampoPontos
              label="Bônus de adesão"
              value={inputs.bonusAdesao}
              onChange={(v) => set("bonusAdesao", v)}
              helpText="Pontos extras da campanha de adesão, se houver."
            />
            {ehCoalizao ? (
              <CampoPontos
                label="Bônus de transferência esperado"
                value={inputs.bonusTransferencia * 100}
                onChange={(v) => set("bonusTransferencia", v / 100)}
                unidade="%"
                helpText="Só vale para clube de coalizão (Livelo/Esfera), que transfere pontos para parceiros aéreos."
              />
            ) : (
              <div className="rounded-md border border-veredito-limite/30 bg-veredito-limite-bg p-3 text-sm text-veredito-limite sm:col-span-1">
                ⚠️ {programa.nome} é clube aéreo: a milha já nasce lá dentro, não
                passa por transferência bonificada.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seu resgate pretendido</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <CampoMoeda
              label="Preço da passagem (mesma data/cabine)"
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
              value={inputs.milhasNecessarias}
              onChange={(v) => set("milhasNecessarias", v)}
              unidade="milhas"
            />
          </CardContent>
        </Card>

        <FormulaBlock
          titulo="A conta, com os seus números"
          linhas={[
            `CPM com adesão = (${formatBRL(inputs.mensalidade)} × ${inputs.meses}) ÷ ((${formatPts(inputs.pontosMes)} × ${inputs.meses} + ${formatPts(inputs.bonusAdesao)}) ÷ 1000)`,
            `                = ${formatBRL(resultado.cpm)} por mil`,
            ehCoalizao
              ? `CPM efetivo = ${formatBRL(resultado.cpm)} ÷ (1 + ${(inputs.bonusTransferencia * 100).toFixed(0)}%) = ${formatBRL(resultado.cpmEf)} por mil`
              : `CPM efetivo = CPM (clube aéreo não passa por transferência) = ${formatBRL(resultado.cpmEf)} por mil`,
            `Valor por mil no resgate = (${formatBRL(inputs.passagemBRL)} − ${formatBRL(inputs.taxas)}) ÷ (${formatPts(inputs.milhasNecessarias)} ÷ 1000) = ${formatBRL(resultado.valorPorMilResgate)}`,
            `Regra: CPM efetivo ≤ 0,8 × valor por mil → ${formatBRL(resultado.cpmEf)} ${resultado.cpmEf <= 0.8 * resultado.valorPorMilResgate ? "≤" : ">"} ${formatBRL(0.8 * resultado.valorPorMilResgate)}`,
          ]}
        />

        <FonteNota
          fonte="Tabela oficial do programa + regra de corte do guia (06-clubes-calculadora.md)"
          consultadoEm="2026-08-18"
        />

        <ConteudoSeo conteudo={seoConteudo.clube} />

        <AdSlot posicao="conteudo" />
      </div>

      <div className="contents md:sticky md:top-20 md:block md:self-start md:space-y-6">
        <ResultadoCard
          titulo="CPM efetivo"
          valorFormatado={formatBRL(resultado.cpmEf)}
          veredito={resultado.veredito}
          porque={
            resultado.veredito === "ok"
              ? `Está dentro do teto de ${formatBRL(0.8 * resultado.valorPorMilResgate)} (80% do valor do seu resgate).`
              : `Passa do teto de ${formatBRL(0.8 * resultado.valorPorMilResgate)} (80% do valor do seu resgate).`
          }
          acao={<Button className="w-full">Adicionar ao cenário</Button>}
        />

        <AdSlot posicao="sidebar" className="hidden md:block" />
      </div>
    </div>
  );
}
