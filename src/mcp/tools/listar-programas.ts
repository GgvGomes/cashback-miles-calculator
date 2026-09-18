import { programas } from "@/data/programas";
import { indicadores } from "@/data/indicadores";
import { clubes } from "@/data/clubes";
import { infoResult } from "../resultado";
import { Vazio } from "../schemas";
import { definirFerramenta } from "./tipos";

const NOME = "listar_programas";

export const listarProgramasTool = definirFerramenta({
  nome: NOME,
  titulo: "Listar programas e referências",
  descricao:
    "Lista os programas suportados (id, preço-alvo de compra, valor de uso, régua de CPM), planos de clube conhecidos e indicadores (CDI, dólar) — todos com fonte e data. Use para preencher defaults ou explicar de onde vem cada número.",
  inputSchema: Vazio,
  handler() {
    const structured = {
      status: "ok" as const,
      programas: programas.map((p) => ({
        id: p.id,
        nome: p.nome,
        tipo: p.tipo,
        precoAlvoCompraBRL: p.precoAlvoCompra,
        valorDeUsoBRL: p.valorDeUso,
        regua: p.regua,
        minimoTransferencia: p.minimoTransferencia,
        volatilidade: p.volatilidade,
        fonte: p.fonte,
        consultadoEm: p.consultadoEm,
      })),
      clubes: clubes.map((c) => ({
        programaId: c.programaId,
        nome: c.nome,
        planos: c.planos.map((pl) => ({
          id: pl.id,
          nome: pl.nome,
          precoMesBRL: pl.precoMes,
          pontosMes: pl.pontosMes,
          cpmTabelaBRL: pl.cpmTabela,
          carenciaMeses: pl.carenciaMeses,
          confirmado: pl.confirmado,
          fonte: pl.fonte,
          consultadoEm: pl.consultadoEm,
        })),
      })),
      indicadores: Object.fromEntries(
        Object.entries(indicadores).map(([k, v]) => [k, { valor: v.valor, fonte: v.fonte, consultadoEm: v.consultadoEm }])
      ),
      aviso: "Números voláteis: confira a data em `consultadoEm` antes de usar como verdade absoluta.",
    };
    const linhas = programas.map(
      (p) => `- ${p.id} (${p.nome}): alvo compra R$ ${p.precoAlvoCompra}/mil, valor de uso ${p.valorDeUso === null ? "n/d" : `R$ ${p.valorDeUso}/mil`} — ${p.fonte}, ${p.consultadoEm}`
    );
    return infoResult(structured, `Programas suportados:\n${linhas.join("\n")}`);
  },
});
