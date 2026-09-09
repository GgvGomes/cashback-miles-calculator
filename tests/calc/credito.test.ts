import { describe, expect, it } from "vitest";
import {
  ganhoFloat,
  retornoPercentualCartao,
  valorPresenteParcelas,
} from "@/lib/calc/credito";

describe("ganhoFloat — 02:52-62", () => {
  it("gasto R$5.000/mês, float 25 dias, CDI 13,90% a.a., IR 20% -> ~R$463/ano", () => {
    const r = ganhoFloat(5000, 25, 0.139);
    expect(r.saldoMedio).toBeCloseTo(4166.67, 1);
    expect(r.ganhoLiquidoAno).toBeCloseTo(463, 0);
  });

  it("gasto R$2.000/mês, float 25 dias -> R$185/ano — tabela 02:44-49", () => {
    expect(ganhoFloat(2000, 25, 0.139).ganhoLiquidoAno).toBeCloseTo(185, 0);
  });

  it("gasto R$10.000/mês, float 40 dias -> R$1.483/ano — tabela 02:44-49", () => {
    expect(ganhoFloat(10000, 40, 0.139).ganhoLiquidoAno).toBeCloseTo(1483, 0);
  });
});

describe("retornoPercentualCartao — 02:130-138", () => {
  it("2,5 pts/US$, dólar R$5,2213, milheiro R$20 -> 0,96%", () => {
    expect(retornoPercentualCartao(2.5, 5.2213, 20)).toBeCloseTo(0.0096, 3);
  });
});

describe("valorPresenteParcelas — 02:215-226", () => {
  it("R$1.000 em 12x sem juros, i=0,872% a.m. -> VP ~R$945,60 — tabela 02:220", () => {
    expect(valorPresenteParcelas(1000, 12, 0.00872)).toBeCloseTo(945.6, 0);
  });

  it("R$1.000 em 6x sem juros -> VP ~R$970,20", () => {
    expect(valorPresenteParcelas(1000, 6, 0.00872)).toBeCloseTo(970.2, 0);
  });

  it("R$1.000 em 3x sem juros -> VP ~R$982,80", () => {
    expect(valorPresenteParcelas(1000, 3, 0.00872)).toBeCloseTo(982.8, 0);
  });
});
