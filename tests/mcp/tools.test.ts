import { describe, expect, it } from "vitest";
import { cpm, cpmEfetivo, classificaCPM } from "@/lib/calc/cpm";
import { cpmComAdesao } from "@/lib/calc/clube";
import { valorPorMil, razaoRetorno, valorPorPonto } from "@/lib/calc/resgate";
import { cpmBlended } from "@/lib/calc/cenario";
import { ganhoFloat } from "@/lib/calc/credito";
import { retornoAnualCartao } from "@/lib/calc/cashback";
import { indicadores } from "@/data/indicadores";
import { programas } from "@/data/programas";
import {
  TOOLS,
  cartaoTool,
  cenarioTool,
  clubeTool,
  compraDePontosTool,
  listarProgramasTool,
  resgateTool,
  valorDoPontoTool,
} from "@/mcp/tools";
import { passoQueEstraga } from "@/mcp/tools/cenario";
import { SEM_GATE } from "@/mcp/tools/tipos";

type Structured = Record<string, unknown> & {
  status: string;
  veredito?: string;
  resultado?: Record<string, unknown>;
  perguntas?: { campo: string }[];
  contexto?: { fonte: string; consultadoEm: string; interpretacao: unknown[]; referencias: unknown[]; perfil?: unknown };
};

function sc(r: unknown): Structured {
  return (r as { structuredContent: Structured }).structuredContent;
}

const livelo = programas.find((p) => p.id === "livelo")!;
const smiles = programas.find((p) => p.id === "smiles")!;

describe("todas as tools", () => {
  it("têm nome snake_case único, título e descrição", () => {
    const nomes = TOOLS.map((t) => t.nome);
    expect(new Set(nomes).size).toBe(nomes.length);
    for (const t of TOOLS) {
      expect(t.nome).toMatch(/^[a-z_]+$/);
      expect(t.titulo.length).toBeGreaterThan(3);
      expect(t.descricao.length).toBeGreaterThan(20);
    }
  });

  it("toda calculadora sem args devolve precisa_info (não erro)", () => {
    const calcs = TOOLS.filter((t) => t.nome.startsWith("calcular_"));
    for (const t of calcs) {
      const r = sc(t.handler({}, SEM_GATE));
      expect(r.status, t.nome).toBe("precisa_info");
      expect(r.perguntas!.length, t.nome).toBeGreaterThan(0);
    }
  });

  it("todo resultado ok traz contexto com fonte, data, interpretação e aviso", () => {
    const r = sc(valorDoPontoTool.handler({ precoPassagemBRL: 1700, taxasBRL: 90, pontos: 15000, cpmPagoBRL: 26 }, SEM_GATE));
    expect(r.status).toBe("ok");
    expect(r.contexto!.fonte).toBeTruthy();
    expect(r.contexto!.consultadoEm).toMatch(/^\d{4}-\d{2}/);
    expect(r.contexto!.interpretacao.length).toBeGreaterThan(0);
    expect(r.aviso).toContain("não é promessa");
    expect(r.vereditoRotulo).toBeTruthy();
    expect(Array.isArray(r.formula)).toBe(true);
  });
});

describe("calcular_valor_do_ponto", () => {
  it("exemplo GRU→SCL do guia: razão ≈ 4,1× e compensa", () => {
    const r = sc(valorDoPontoTool.handler({ precoPassagemBRL: 1700, taxasBRL: 90, pontos: 15000, cpmPagoBRL: 26 }, SEM_GATE));
    const esperado = razaoRetorno(valorPorPonto(1700, 90, 15000), 26);
    expect(r.resultado!.razaoRetorno).toBeCloseTo(esperado, 6);
    expect(r.resultado!.razaoRetorno).toBeCloseTo(4.13, 1);
    expect(r.veredito).toBe("ok");
    expect(r.resultado!.faixa).toBe("sweet-spot");
  });

  it("pede exatamente os campos que faltam", () => {
    const r = sc(valorDoPontoTool.handler({ precoPassagemBRL: 1700, pontos: 15000 }, SEM_GATE));
    expect(r.perguntas!.map((p) => p.campo)).toEqual(["taxasBRL", "cpmPagoBRL"]);
    expect(r.entradasRecebidas).toEqual({ precoPassagemBRL: 1700, pontos: 15000 });
  });
});

describe("calcular_compra_de_pontos", () => {
  it("bate com lib: CPM base, bônus em coalizão e classificação", () => {
    const r = sc(compraDePontosTool.handler({ programa: "livelo", precoPagoBRL: 588, pontosRecebidos: 20000, bonusTransferencia: 0.8 }, SEM_GATE));
    const base = cpm(588, 20000);
    const final = cpmEfetivo(base, 0.8);
    expect(r.resultado!.cpmBaseBRL).toBeCloseTo(base, 6);
    expect(r.resultado!.cpmFinalBRL).toBeCloseTo(final, 6);
    expect(r.resultado!.classificacao).toBe(classificaCPM("livelo", final));
    expect(r.resultado!.bonusAplicado).toBe(true);
    expect(r.contexto!.referencias).toHaveLength(1);
  });

  it("ignora bônus de transferência em programa aéreo", () => {
    const r = sc(compraDePontosTool.handler({ programa: "smiles", precoPagoBRL: 400, pontosRecebidos: 10000, bonusTransferencia: 0.8 }, SEM_GATE));
    expect(r.resultado!.bonusAplicado).toBe(false);
    expect(r.resultado!.cpmFinalBRL).toBeCloseTo(cpm(400, 10000), 6);
  });

  it("usa programa do perfil quando não informado", () => {
    const r = sc(compraDePontosTool.handler({ perfil: { programaPrincipal: "livelo" }, precoPagoBRL: 588, pontosRecebidos: 20000 }, SEM_GATE));
    expect(r.status).toBe("ok");
    expect((r.entradas as { programa: string }).programa).toBe("livelo");
    expect(r.contexto!.perfil).toEqual({ programaPrincipal: "livelo" });
  });

  it("classificação ruim → não compensa", () => {
    const r = sc(compraDePontosTool.handler({ programa: "smiles", precoPagoBRL: 1000, pontosRecebidos: 10000 }, SEM_GATE));
    expect(r.resultado!.classificacao).toBe("ruim");
    expect(r.veredito).toBe("nao");
  });
});

describe("calcular_clube", () => {
  it("bate com lib e usa valor de uso do programa quando não há resgate informado", () => {
    const r = sc(clubeTool.handler({ programa: "livelo", mensalidadeBRL: 44.9, pontosMes: 1000, meses: 12, bonusAdesao: 14800, bonusTransferencia: 0.8 }, SEM_GATE));
    expect(r.status).toBe("ok");
    const cpmC = cpmComAdesao(44.9, 12, 1000, 14800);
    expect(r.resultado!.cpmClubeBRL).toBeCloseTo(cpmC, 6);
    expect(r.resultado!.cpmEfetivoBRL).toBeCloseTo(cpmEfetivo(cpmC, 0.8), 6);
    expect(r.resultado!.valorPorMilResgateBRL).toBe(livelo.valorDeUso);
    expect(r.resultado!.origemResgate).toContain("valor de uso");
  });

  it("calcula valor por mil da passagem quando informada", () => {
    const r = sc(clubeTool.handler({ programa: "smiles", mensalidadeBRL: 50, pontosMes: 1000, precoPassagemBRL: 1200, taxasBRL: 120, milhasNecessarias: 40000 }, SEM_GATE));
    expect(r.resultado!.valorPorMilResgateBRL).toBeCloseTo((1200 - 120) / 40, 6);
  });

  it("pede valorPorMilResgateBRL quando programa não tem valor de uso e nada foi informado", () => {
    const semValor = programas.find((p) => p.valorDeUso === null)!;
    const r = sc(clubeTool.handler({ programa: semValor.id, mensalidadeBRL: 50, pontosMes: 1000 }, SEM_GATE));
    expect(r.status).toBe("precisa_info");
    expect(r.perguntas!.map((p) => p.campo)).toEqual(["valorPorMilResgateBRL"]);
  });

  it("custo de oportunidade só quando pago à vista", () => {
    const base = { programa: "livelo", mensalidadeBRL: 44.9, pontosMes: 1000, meses: 12 };
    expect(sc(clubeTool.handler(base, SEM_GATE)).resultado!.custoOportunidadeBRL).toBe(0);
    expect(sc(clubeTool.handler({ ...base, pagoAVista: true }, SEM_GATE)).resultado!.custoOportunidadeBRL as number).toBeGreaterThan(0);
  });
});

describe("calcular_resgate", () => {
  it("usa preço-alvo do programa e aplica regra 100%/80%", () => {
    const r = sc(resgateTool.handler({ programa: "smiles", precoPassagemBRL: 1200, taxasBRL: 120, milhas: 40000 }, SEM_GATE));
    const vpm = valorPorMil(1200, 120, 40000);
    expect(r.resultado!.valorPorMilBRL).toBeCloseTo(vpm, 6);
    expect(r.resultado!.precoAlvoBRL).toBe(smiles.precoAlvoCompra);
    expect(r.veredito).toBe(vpm >= smiles.precoAlvoCompra ? "ok" : vpm >= smiles.precoAlvoCompra * 0.8 ? "limite" : "nao");
  });

  it("pede alvo quando não há programa nem precoAlvoBRL", () => {
    const r = sc(resgateTool.handler({ precoPassagemBRL: 1200, taxasBRL: 120, milhas: 40000 }, SEM_GATE));
    expect(r.status).toBe("precisa_info");
    expect(r.perguntas!.map((p) => p.campo)).toEqual(["precoAlvoBRL"]);
  });

  it("veredito limítrofe entre 80% e 100% do alvo", () => {
    const r = sc(resgateTool.handler({ precoPassagemBRL: 1000, taxasBRL: 100, milhas: 40000, precoAlvoBRL: 25 }, SEM_GATE));
    // (1000-100)/40 = 22,5 → 90% de 25
    expect(r.veredito).toBe("limite");
  });
});

describe("calcular_cartao", () => {
  it("bate com lib (recompensa + float) e compara com anuidade", () => {
    const r = sc(cartaoTool.handler({ gastoMensalBRL: 4000, percEfetivo: 1, anuidadeBRL: 1068, floatDias: 25 }, SEM_GATE));
    const float = ganhoFloat(4000, 25, indicadores.cdiAnual.valor);
    const rec = retornoAnualCartao(4000, 0.01);
    expect(r.resultado!.retornoRecompensaAnoBRL).toBeCloseTo(rec, 6);
    expect(r.resultado!.ganhoFloatAnoBRL).toBeCloseTo(float.ganhoLiquidoAno, 6);
    expect(r.resultado!.retornoTotalAnoBRL).toBeCloseTo(rec + float.ganhoLiquidoAno, 6);
    expect(r.resultado!.parcelamento).toBeUndefined();
  });

  it("inclui parcelamento quando total e parcelas vêm", () => {
    const r = sc(cartaoTool.handler({ gastoMensalBRL: 4000, percEfetivo: 1, anuidadeBRL: 0, totalParceladoBRL: 1000, nParcelas: 12 }, SEM_GATE));
    const p = r.resultado!.parcelamento as { descontoQueEmpataPct: number };
    expect(p.descontoQueEmpataPct).toBeGreaterThan(0);
    expect(p.descontoQueEmpataPct).toBeLessThan(15);
    expect(r.veredito).toBe("ok");
  });

  it("gasto mensal vem do perfil", () => {
    const r = sc(cartaoTool.handler({ perfil: { gastoMensalBRL: 3000 }, percEfetivo: 1.5, anuidadeBRL: 500 }, SEM_GATE));
    expect(r.status).toBe("ok");
  });
});

describe("calcular_cenario", () => {
  const steps = [
    { tipo: "compra" as const, label: "Compra 20k", custoBRL: 588, pontosGerados: 20000 },
    { tipo: "transferencia" as const, label: "Transferência 80%", custoBRL: 0, pontosGerados: 16000 },
    { tipo: "custo-extra" as const, label: "Taxa", custoBRL: 200, pontosGerados: 0 },
  ];

  it("bate com lib e aponta passo que estoura o teto", () => {
    const r = sc(cenarioTool.handler({ steps, valorDeUsoBRL: 20 }, SEM_GATE));
    expect(r.resultado!.cpmBlendedBRL).toBeCloseTo(cpmBlended(steps), 6);
    expect(r.resultado!.tetoBRL).toBeCloseTo(16, 6);
    const acum = r.resultado!.acumulados as { passo: number; cpmAcumuladoBRL: number }[];
    expect(acum).toHaveLength(3);
    expect(acum[0].cpmAcumuladoBRL).toBeCloseTo(29.4, 1);
    // 29,4 → 16,33 (cabe no teto 16? não: 16,33 > 16) → 21,9: fecha acima; culpado é o passo 1
    expect(r.resultado!.passoQueEstoura).toBe(1);
  });

  it("passo que estraga é o seguinte ao último que ainda cabia; null se fecha dentro do teto", () => {
    expect(passoQueEstraga([29.4, 16.33, 21.9], 18.4)).toBe(3);
    expect(passoQueEstraga([29.4, 16.33], 18.4)).toBeNull();
    expect(passoQueEstraga([29.4, 30], 18.4)).toBe(1);
    expect(passoQueEstraga([], 18.4)).toBeNull();
  });

  it("usa valor de uso do programa e pede steps quando faltam", () => {
    const r = sc(cenarioTool.handler({ programa: "livelo" }, SEM_GATE));
    expect(r.status).toBe("precisa_info");
    expect(r.perguntas!.map((p) => p.campo)).toEqual(["steps"]);
  });

  it("pede steps e valor de uso quando nada vem", () => {
    const r = sc(cenarioTool.handler({}, SEM_GATE));
    expect(r.perguntas!.map((p) => p.campo)).toEqual(["steps", "valorDeUsoBRL"]);
  });
});

describe("listar_programas", () => {
  it("devolve programas, clubes e indicadores com fonte + data", () => {
    const r = sc(listarProgramasTool.handler({}, SEM_GATE));
    const progs = r.programas as { id: string; fonte: string; consultadoEm: string }[];
    expect(progs.map((p) => p.id)).toEqual(programas.map((p) => p.id));
    for (const p of progs) {
      expect(p.fonte).toBeTruthy();
      expect(p.consultadoEm).toBeTruthy();
    }
    expect(r.indicadores).toHaveProperty("cdiAnual.fonte");
  });
});
