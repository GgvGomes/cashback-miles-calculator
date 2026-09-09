import { describe, expect, it } from "vitest";
import {
  cpm,
  pontosComBonus,
  cpmEfetivo,
  cpmSobrepreco,
  classificaCPM,
} from "@/lib/calc/cpm";

describe("cpm", () => {
  it("compra direta de pontos — 04:322 (R$ 588 por 20.000 pts = R$ 29,40/mil)", () => {
    expect(cpm(588, 20000)).toBeCloseTo(29.4, 2);
  });

  it("clube sem bônus — 04:329 (R$ 44,90/mês por 1.000 pts = R$ 44,90/mil)", () => {
    expect(cpm(44.9, 1000)).toBeCloseTo(44.9, 2);
  });
});

describe("pontosComBonus", () => {
  it("aplica bônus percentual — 04:358-375", () => {
    expect(pontosComBonus(20000, 1.0)).toBeCloseTo(40000, 2);
  });
});

describe("cpmEfetivo", () => {
  it("Livelo Classic, CPM R$ 44,90, bônus 80% -> R$ 24,94 — 06:257", () => {
    expect(cpmEfetivo(44.9, 0.8)).toBeCloseTo(24.94, 2);
  });

  it("Livelo Classic com adesão, CPM R$ 14,56, bônus 80% -> R$ 8,09 — 06:262-268", () => {
    expect(cpmEfetivo(14.56, 0.8)).toBeCloseTo(8.09, 2);
  });

  it("matriz de bônus sobre CPM R$ 30/mil — 04:361-367", () => {
    expect(cpmEfetivo(30, 0.4)).toBeCloseTo(21.43, 2);
    expect(cpmEfetivo(30, 0.8)).toBeCloseTo(16.67, 2);
    expect(cpmEfetivo(30, 0.9)).toBeCloseTo(15.79, 2);
    expect(cpmEfetivo(30, 1.0)).toBeCloseTo(15.0, 2);
    expect(cpmEfetivo(30, 1.2)).toBeCloseTo(13.64, 2);
  });

  it("matriz de bônus do CPM base do clube Livelo Classic — 06:402-408", () => {
    expect(cpmEfetivo(44.9, 0)).toBeCloseTo(44.9, 2);
    expect(cpmEfetivo(44.9, 0.5)).toBeCloseTo(29.93, 2);
    expect(cpmEfetivo(44.9, 0.8)).toBeCloseTo(24.94, 2);
    expect(cpmEfetivo(44.9, 1.0)).toBeCloseTo(22.45, 2);
  });

  it("CPM promocional Livelo R$ 14,56 pela mesma matriz — 06:402-408", () => {
    expect(cpmEfetivo(14.56, 0)).toBeCloseTo(14.56, 2);
    expect(cpmEfetivo(14.56, 0.5)).toBeCloseTo(9.71, 2);
    expect(cpmEfetivo(14.56, 0.8)).toBeCloseTo(8.09, 2);
    expect(cpmEfetivo(14.56, 1.0)).toBeCloseTo(7.28, 2);
  });

  it("Livelo 29,50/mil com 100% de bônus -> R$ 14,75 (Smiles) — 04:370-372", () => {
    expect(cpmEfetivo(29.5, 1.0)).toBeCloseTo(14.75, 2);
  });
});

describe("cpmSobrepreco", () => {
  it("shopping de pontos — 04:325 (sobrepreço R$ 300 por 12.495 pts = R$ 24/mil)", () => {
    expect(cpmSobrepreco(300, 0, 12495)).toBeCloseTo(24.01, 1);
  });
});

describe("classificaCPM", () => {
  it("classifica Livelo pela régua — 04:376-384", () => {
    expect(classificaCPM("livelo", 18)).toBe("excepcional");
    expect(classificaCPM("livelo", 25)).toBe("bom");
    expect(classificaCPM("livelo", 32)).toBe("aceitavel");
    expect(classificaCPM("livelo", 40)).toBe("ruim");
  });

  it("classifica Smiles pela régua — 04:376-384", () => {
    expect(classificaCPM("smiles", 10)).toBe("excepcional");
    expect(classificaCPM("smiles", 14)).toBe("bom");
    expect(classificaCPM("smiles", 18)).toBe("aceitavel");
    expect(classificaCPM("smiles", 25)).toBe("ruim");
  });
});
