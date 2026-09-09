import { describe, expect, it } from "vitest";
import { empilhaCashback, retornoAnualCartao } from "@/lib/calc/cashback";

describe("empilhaCashback — 03:216-233", () => {
  it("compra de R$1.000, cupom 10% + 4 camadas de cashback -> custo efetivo R$802,25, desconto real 19,8%", () => {
    const precoEtiqueta = 1000;
    const descontoCupom = 0.1;
    const camadas = [72.0, 13.5, 11.25, 1.0]; // cashback plataforma, cartão, fidelidade, nota fiscal
    const r = empilhaCashback(precoEtiqueta, descontoCupom, camadas);
    expect(r.baseAposCupom).toBeCloseTo(900, 2);
    expect(r.totalRetorno).toBeCloseTo(97.75, 2);
    expect(r.custoEfetivo).toBeCloseTo(802.25, 2);
    expect(r.descontoReal).toBeCloseTo(0.198, 3);
  });
});

describe("retornoAnualCartao — 03:291-300", () => {
  it("Ultravioleta 1%, gasto R$4.000/mês, anuidade R$1.068 -> R$480/ano, NÃO compensa", () => {
    const retorno = retornoAnualCartao(4000, 0.01);
    expect(retorno).toBeCloseTo(480, 2);
    expect(retorno).toBeLessThan(1068);
  });
});
