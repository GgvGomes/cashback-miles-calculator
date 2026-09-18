import { describe, expect, it } from "vitest";
import { McpServer } from "@modelcontextprotocol/server";
import { perfilTool } from "@/mcp/tools";
import { SEM_GATE } from "@/mcp/tools/tipos";
import { contextoDe, type ChaveCalculadora } from "@/mcp/contexto";
import { comoUtilizar } from "@/data/como-utilizar";
import { criaServidorMcp, SERVER_INFO } from "@/mcp/server";

type S = Record<string, unknown> & { status: string; perguntas?: { campo: string }[] };
const sc = (r: unknown) => (r as { structuredContent: S }).structuredContent;

describe("investigar_perfil", () => {
  it("pede programa, estratégia e objetivo quando vazio", () => {
    const r = sc(perfilTool.handler({}, SEM_GATE));
    expect(r.status).toBe("precisa_info");
    expect(r.perguntas!.map((p) => p.campo)).toEqual(["programaPrincipal", "estrategia", "objetivo"]);
  });

  it("devolve perfil, roteiro por estratégia e campos opcionais faltando", () => {
    const r = sc(perfilTool.handler({ programaPrincipal: "smiles", estrategia: "resgatar_ja", objetivo: "GRU→SCL em dezembro" }, SEM_GATE));
    expect(r.status).toBe("ok");
    expect(r.perfil).toEqual({ programaPrincipal: "smiles", estrategia: "resgatar_ja", objetivo: "GRU→SCL em dezembro" });
    expect(r.proximasFerramentas).toEqual(["calcular_resgate", "calcular_valor_do_ponto"]);
    expect((r.perguntasSugeridas as string[]).length).toBeGreaterThan(0);
    expect(r.camposOpcionaisFaltando).toEqual(["gastoMensalBRL", "saldoPontos", "temClube", "horizonteMeses"]);
    expect(r.programa).toMatchObject({ id: "smiles", fonte: expect.any(String), consultadoEm: expect.any(String) });
  });

  it("estratégia cartao aponta calcular_cartao", () => {
    const r = sc(perfilTool.handler({ programaPrincipal: "livelo", estrategia: "cartao", objetivo: "zerar anuidade", gastoMensalBRL: 4000 }, SEM_GATE));
    expect(r.proximasFerramentas).toEqual(["calcular_cartao"]);
    expect(r.camposOpcionaisFaltando).not.toContain("gastoMensalBRL");
  });
});

describe("contextoDe", () => {
  it("toda calculadora tem interpretação, porquê, fonte, data e página web", () => {
    for (const chave of Object.keys(comoUtilizar) as ChaveCalculadora[]) {
      const c = contextoDe(chave);
      expect(c.interpretacao.length, chave).toBeGreaterThan(0);
      expect(c.porque, chave).toBeTruthy();
      expect(c.fonte, chave).toBeTruthy();
      expect(c.consultadoEm, chave).toMatch(/^\d{4}-\d{2}/);
      expect(c.paginaWeb, chave).toMatch(/^https:\/\/.+\/[a-z-]+$/);
      expect(c.perfil).toBeUndefined();
    }
  });
});

describe("criaServidorMcp", () => {
  it("registra tools, prompts e resources sem erro", () => {
    const server = new McpServer(SERVER_INFO);
    expect(() => criaServidorMcp(server)).not.toThrow();
  });
});
