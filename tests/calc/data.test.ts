import { describe, expect, it } from "vitest";
import { indicadores } from "@/data/indicadores";
import { programas } from "@/data/programas";
import { clubes } from "@/data/clubes";
import { plataformasCashback, cartoesCashback } from "@/data/cashback";
import { campanhasBonus } from "@/data/bonus-historico";
import { mcpDocs } from "@/data/mcp-docs";

/**
 * Todo registro exibido no app carrega fonte + data (regra de ouro do CLAUDE.md
 * do repo: "número tem data e fonte"). Este teste falha se qualquer registro
 * escapar dessa regra.
 */
function verificaFonteEData(registros: unknown[], nomeArquivo: string) {
  for (const r of registros) {
    const obj = r as Record<string, unknown>;
    expect(obj.fonte, `${nomeArquivo}: registro sem 'fonte' -> ${JSON.stringify(obj)}`).toBeTruthy();
    expect(
      obj.consultadoEm,
      `${nomeArquivo}: registro sem 'consultadoEm' -> ${JSON.stringify(obj)}`
    ).toBeTruthy();
  }
}

describe("todo registro de src/data tem fonte + consultadoEm", () => {
  it("indicadores", () => {
    verificaFonteEData(Object.values(indicadores), "indicadores.ts");
  });

  it("programas", () => {
    verificaFonteEData(programas, "programas.ts");
  });

  it("clubes (planos, não os grupos)", () => {
    const planos = clubes.flatMap((c) => c.planos);
    verificaFonteEData(planos, "clubes.ts");
  });

  it("plataformas de cashback", () => {
    verificaFonteEData(plataformasCashback, "cashback.ts (plataformas)");
  });

  it("cartões com cashback", () => {
    verificaFonteEData(cartoesCashback, "cashback.ts (cartões)");
  });

  it("campanhas de bônus histórico", () => {
    verificaFonteEData(campanhasBonus, "bonus-historico.ts");
  });

  it("documentação do MCP", () => {
    verificaFonteEData([mcpDocs], "mcp-docs.ts");
  });
});
