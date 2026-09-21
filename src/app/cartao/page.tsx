"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CampoMoeda } from "@/components/calc/CampoMoeda";
import { CampoPontos } from "@/components/calc/CampoPontos";
import { ResultadoCard } from "@/components/calc/ResultadoCard";
import { FormulaBlock } from "@/components/calc/FormulaBlock";
import { FonteNota } from "@/components/calc/FonteNota";
import { ComoUtilizar } from "@/components/calc/ComoUtilizar";
import { AdSlot } from "@/components/ads/AdSlot";
import { comoUtilizar } from "@/data/como-utilizar";
import { ConteudoSeo } from "@/components/calc/ConteudoSeo";
import { seoConteudo } from "@/data/seo";
import { ganhoFloat, valorPresenteParcelas } from "@/lib/calc/credito";
import { retornoAnualCartao } from "@/lib/calc/cashback";
import { formatBRL } from "@/lib/calc/format";
import { indicadores } from "@/data/indicadores";
import { usePersistedState } from "@/hooks/usePersistedState";
import type { Veredito as VeredictoTipo } from "@/lib/calc/types";

interface Inputs {
  gastoMensal: number;
  floatDias: number;
  percEfetivo: number;
  anuidade: number;
  totalParcelado: number;
  nParcelas: number;
}

const DEFAULT: Inputs = {
  gastoMensal: 4000,
  floatDias: 25,
  percEfetivo: 1,
  anuidade: 1068,
  totalParcelado: 1000,
  nParcelas: 12,
};

export default function CartaoPage() {
  const [inputs, setInputs] = usePersistedState<Inputs>("cartao-inputs", DEFAULT);

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const resultado = useMemo(() => {
    const float = ganhoFloat(inputs.gastoMensal, inputs.floatDias, indicadores.cdiAnual.valor);
    const retornoRecompensa = retornoAnualCartao(inputs.gastoMensal, inputs.percEfetivo / 100);
    const retornoTotal = retornoRecompensa + float.ganhoLiquidoAno;
    const vp = valorPresenteParcelas(
      inputs.totalParcelado,
      inputs.nParcelas,
      indicadores.taxaMensalLiquida.valor
    );
    const descontoQueEmpata = (1 - vp / inputs.totalParcelado) * 100;

    let veredito: VeredictoTipo = "nao";
    if (retornoTotal >= inputs.anuidade) veredito = "ok";
    else if (retornoTotal >= inputs.anuidade * 0.8) veredito = "limite";

    return { float, retornoRecompensa, retornoTotal, vp, descontoQueEmpata, veredito };
  }, [inputs]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">O cartão compensa a anuidade?</h1>
            <p className="text-muted-foreground">
              Some recompensa + float e compare com a anuidade. Além disso, veja
              se vale parcelar sem juros ou pagar à vista com desconto.
            </p>
          </div>
          <ComoUtilizar conteudo={comoUtilizar.cartao} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Retorno do cartão</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <CampoMoeda
              label="Gasto mensal no cartão"
              value={inputs.gastoMensal}
              onChange={(v) => set("gastoMensal", v)}
            />
            <CampoPontos
              label="Float (dias entre compra e vencimento)"
              value={inputs.floatDias}
              onChange={(v) => set("floatDias", v)}
              unidade="dias"
            />
            <CampoPontos
              label="Percentual efetivo de retorno"
              value={inputs.percEfetivo}
              onChange={(v) => set("percEfetivo", v)}
              unidade="%"
              helpText="Cashback ou pontos convertidos em %."
            />
            <CampoMoeda
              label="Anuidade"
              value={inputs.anuidade}
              onChange={(v) => set("anuidade", v)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Parcelado sem juros × PIX com desconto</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <CampoMoeda
              label="Valor da compra"
              value={inputs.totalParcelado}
              onChange={(v) => set("totalParcelado", v)}
            />
            <CampoPontos
              label="Número de parcelas sem juros"
              value={inputs.nParcelas}
              onChange={(v) => set("nParcelas", v)}
              unidade="parcelas"
            />
          </CardContent>
        </Card>

        <FormulaBlock
          titulo="A conta, com os seus números"
          linhas={[
            `Float: saldo médio = ${formatBRL(inputs.gastoMensal)} × (${inputs.floatDias}÷30) = ${formatBRL(resultado.float.saldoMedio)}`,
            `Ganho líquido/ano = ${formatBRL(resultado.float.ganhoLiquidoAno)}`,
            `Retorno da recompensa/ano = ${formatBRL(inputs.gastoMensal)} × 12 × ${inputs.percEfetivo}% = ${formatBRL(resultado.retornoRecompensa)}`,
            `Retorno total/ano = ${formatBRL(resultado.retornoTotal)} vs. anuidade ${formatBRL(inputs.anuidade)}`,
            `Desconto no PIX que empata em ${inputs.nParcelas}x: ${resultado.descontoQueEmpata.toFixed(1)}%`,
          ]}
        />

        <FonteNota
          fonte="02-credito.md (float, retorno de recompensa, parcelado × PIX)"
          consultadoEm="2026-08-18"
        />

        <ConteudoSeo conteudo={seoConteudo.cartao} />

        <AdSlot posicao="conteudo" />
      </div>

      <div className="contents md:sticky md:top-20 md:block md:self-start md:space-y-6">
        <ResultadoCard
          titulo="Retorno anual total"
          valorFormatado={formatBRL(resultado.retornoTotal)}
          veredito={resultado.veredito}
          porque={
            resultado.veredito === "ok"
              ? `Cobre a anuidade de ${formatBRL(inputs.anuidade)}.`
              : `Não cobre a anuidade de ${formatBRL(inputs.anuidade)} — confira se você cumpre alguma isenção.`
          }
        />

        <AdSlot posicao="sidebar" className="hidden md:block" />
      </div>
    </div>
  );
}
