import { describe, expect, it } from "vitest";
import {
  valorPorMil,
  valorPorPonto,
  razaoRetorno,
  classificaRazao,
  vereditoResgate,
} from "@/lib/calc/resgate";

describe("valorPorMil", () => {
  it("Livelo Classic: passagem R$1.200, taxas R$120, 40.000 milhas — 06:379 (N=R$27,00)", () => {
    expect(valorPorMil(1200, 120, 40000)).toBeCloseTo(27.0, 2);
  });
});

describe("valorPorPonto + razaoRetorno — exemplos 05:144-185", () => {
  it("Exemplo 1 — GRU/SCL, R$1.700, taxas R$90, 15.000 milhas, CPM alvo 26 -> razão 4,1× (emita)", () => {
    const vpp = valorPorPonto(1700, 90, 15000);
    expect(vpp).toBeCloseTo(0.107, 3);
    expect(razaoRetorno(vpp, 26)).toBeCloseTo(4.1, 1);
  });

  it("Exemplo 2A — fatura, 50.000 pts a R$15/mil, CPM alvo 26 -> razão 0,58× (não faça)", () => {
    const vpp = valorPorPonto(750, 0, 50000);
    expect(vpp).toBeCloseTo(0.015, 3);
    expect(razaoRetorno(vpp, 26)).toBeCloseTo(0.58, 2);
  });

  it("Exemplo 2B — trecho doméstico R$250, taxas R$60, 12.000 milhas, CPM alvo Smiles 16 -> razão 0,99× (não faça)", () => {
    const vpp = valorPorPonto(250, 60, 12000);
    expect(vpp).toBeCloseTo(0.0158, 3);
    expect(razaoRetorno(vpp, 16)).toBeCloseTo(0.99, 2);
  });
});

describe("classificaRazao — faixas 05:132-135", () => {
  it("abaixo de 1,3× -> não emita", () => {
    expect(classificaRazao(0.58)).toBe("nao-emita");
    expect(classificaRazao(0.99)).toBe("nao-emita");
  });
  it("entre 1,3× e 2× -> aceitável", () => {
    expect(classificaRazao(1.5)).toBe("aceitavel");
  });
  it("acima de 2× -> bom", () => {
    expect(classificaRazao(2.5)).toBe("bom");
  });
  it("acima de 4× -> sweet spot", () => {
    expect(classificaRazao(4.1)).toBe("sweet-spot");
  });
});

describe("vereditoResgate", () => {
  it("razão 4,1× -> ok", () => {
    expect(vereditoResgate(4.1)).toBe("ok");
  });
  it("razão 1,5× -> limite", () => {
    expect(vereditoResgate(1.5)).toBe("limite");
  });
  it("razão 0,58× -> nao", () => {
    expect(vereditoResgate(0.58)).toBe("nao");
  });
});
