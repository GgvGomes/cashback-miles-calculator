import { describe, expect, it } from "vitest";
import { elicitar, faltantes, gate, precisaInfo, semUndefined, type Pergunta } from "@/mcp/gates";

const CAMPOS: readonly Pergunta[] = [
  { campo: "a", pergunta: "A?", tipo: "number", unidade: "R$" },
  { campo: "b", pergunta: "B?", tipo: "enum", opcoes: ["x", "y"] },
  { campo: "c", pergunta: "C?", tipo: "boolean" },
];

describe("faltantes", () => {
  it("lista só os campos ausentes (undefined, null, NaN)", () => {
    const f = faltantes({ a: 1, b: null, c: Number.NaN }, CAMPOS);
    expect(f.map((p) => p.campo)).toEqual(["b", "c"]);
  });

  it("zero e false contam como preenchidos", () => {
    expect(faltantes({ a: 0, b: "x", c: false }, CAMPOS)).toEqual([]);
  });
});

describe("precisaInfo", () => {
  it("devolve status precisa_info com perguntas e entradas recebidas sem undefined", () => {
    const r = precisaInfo("calc", [CAMPOS[0]], { a: undefined, b: "x" });
    expect(r.structuredContent.status).toBe("precisa_info");
    expect(r.structuredContent.calculadora).toBe("calc");
    expect(r.structuredContent.perguntas).toHaveLength(1);
    expect(r.structuredContent.entradasRecebidas).toEqual({ b: "x" });
    expect(r.content[0]).toMatchObject({ type: "text" });
    expect((r.content[0] as { text: string }).text).toContain("a (R$): A?");
  });
});

describe("elicitar", () => {
  it("monta requestedSchema plano com todos os campos obrigatórios", () => {
    const r = elicitar("calc", [...CAMPOS]);
    expect(r.resultType).toBe("input_required");
    const req = (r.inputRequests as Record<string, { params: { requestedSchema: { properties: Record<string, unknown>; required: string[] } } }>).form;
    expect(req.params.requestedSchema.required).toEqual(["a", "b", "c"]);
    expect(req.params.requestedSchema.properties.a).toMatchObject({ type: "number" });
    expect(req.params.requestedSchema.properties.b).toMatchObject({ type: "string", enum: ["x", "y"] });
    expect(req.params.requestedSchema.properties.c).toMatchObject({ type: "boolean" });
  });
});

describe("gate", () => {
  it("null quando nada falta", () => {
    expect(gate("calc", { a: 1, b: "x", c: true }, CAMPOS, { podeElicitar: false })).toBeNull();
  });

  it("precisa_info quando não pode elicitar", () => {
    const r = gate("calc", { a: 1 }, CAMPOS, { podeElicitar: false });
    expect(r && "structuredContent" in r && r.structuredContent).toMatchObject({ status: "precisa_info" });
  });

  it("input_required quando pode elicitar", () => {
    const r = gate("calc", { a: 1 }, CAMPOS, { podeElicitar: true });
    expect(r && "resultType" in r && r.resultType).toBe("input_required");
  });
});

describe("semUndefined", () => {
  it("remove chaves undefined e mantém null/0", () => {
    expect(semUndefined({ a: undefined, b: null, c: 0 })).toEqual({ b: null, c: 0 });
  });
});
