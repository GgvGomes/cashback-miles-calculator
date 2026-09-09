import { describe, expect, it } from "vitest";
import { totalCusto, totalPontos, cpmBlended, vereditoCenario } from "@/lib/calc/cenario";
import type { Step } from "@/lib/calc/types";

describe("cenário — compra Livelo + transferência 80% p/ Smiles", () => {
  // Compra de R$ 588 por 20.000 pontos Livelo (04:322, R$29,40/mil), depois
  // transferência com 80% de bônus para Smiles.
  const steps: Step[] = [
    { tipo: "compra", label: "Compra Livelo", custoBRL: 588, pontosGerados: 20000 },
    {
      tipo: "transferencia",
      label: "Transferência 80% -> Smiles",
      custoBRL: 0,
      pontosGerados: 20000 * 0.8, // pontos extras ganhos pelo bônus
      programaDestino: "smiles",
    },
  ];

  it("totalCusto soma só os custos em R$ (transferência não custa)", () => {
    expect(totalCusto(steps)).toBeCloseTo(588, 2);
  });

  it("totalPontos soma pontos + bônus da transferência", () => {
    expect(totalPontos(steps)).toBeCloseTo(36000, 2);
  });

  it("cpmBlended ≈ R$16,33/mil", () => {
    expect(cpmBlended(steps)).toBeCloseTo(16.33, 1);
  });

  it("veredito COMPENSA contra valor de uso Smiles ~R$21/mil", () => {
    expect(vereditoCenario(cpmBlended(steps), 21)).toBe("ok");
  });
});
