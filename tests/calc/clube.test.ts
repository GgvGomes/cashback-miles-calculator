import { describe, expect, it } from "vitest";
import {
  cpmClube,
  cpmComAdesao,
  cpmComCarencia,
  custoOportunidade,
  vereditoClube,
} from "@/lib/calc/clube";

describe("cpmClube", () => {
  it("Livelo Classic sem adesão — 04:329 (R$ 44,90/mês por 1.000 pts)", () => {
    expect(cpmClube(44.9, 1000)).toBeCloseTo(44.9, 2);
  });
});

describe("cpmComAdesao", () => {
  it("Livelo Classic com bônus de adesão — 06:360-383 (H = R$ 20,10)", () => {
    expect(cpmComAdesao(44.9, 12, 1000, 14800)).toBeCloseTo(20.1, 1);
  });

  it("Clube Azul plano 20.000, oferta 250% em 5 meses — 04:334-336 (R$ 10,53/mil)", () => {
    // R$ 3.685,50 pagos, 350.000 pontos recebidos ao todo.
    // mensalidade implícita = 3685.50/5 = 737.10; pontosMes = 20000; bonus = 350000 - 20000*5
    expect(cpmComAdesao(737.1, 5, 20000, 350000 - 20000 * 5)).toBeCloseTo(
      10.53,
      2
    );
  });
});

describe("cpmComCarencia", () => {
  it("Clube Smiles 1.000/mês a R$44, carência 6, cancela no 3º mês — 06:287-291", () => {
    // Total obrigatório R$ 264 (6 mensalidades), pontos recebidos 3.000 (3 meses).
    expect(cpmComCarencia(264, 3000)).toBeCloseTo(88.0, 2);
  });
});

describe("custoOportunidade", () => {
  it("Plano anual R$ 538,80 à vista, i=0,872% a.m., 12 meses — 06:298-305", () => {
    expect(custoOportunidade(538.8, 0.00872, 12)).toBeCloseTo(28.19, 1);
  });
});

describe("vereditoClube — Livelo Classic — 06:360-383", () => {
  it("com bônus de adesão: J=11,17 <= 0,8×27,00=21,60 -> SIM", () => {
    expect(vereditoClube(11.17, 27.0)).toBe("ok");
  });

  it("sem bônus de adesão: J=24,94 > 21,60 -> NÃO", () => {
    expect(vereditoClube(24.94, 27.0)).toBe("nao");
  });
});
