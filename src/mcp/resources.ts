/**
 * Resources: regras do guia como leitura opcional para a IA cliente.
 * Mantém as respostas das tools curtas; quem quiser o detalhe lê aqui.
 */
import type { McpServer } from "@modelcontextprotocol/server";
import { comoUtilizar } from "@/data/como-utilizar";
import { programas } from "@/data/programas";
import { indicadores } from "@/data/indicadores";
import { AVISO } from "./resultado";
import { ROTA_WEB, SITE_URL, type ChaveCalculadora } from "./contexto";

function json(uri: string, dados: unknown) {
  return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(dados, null, 2) }] };
}

export function registrarResources(server: McpServer) {
  for (const chave of Object.keys(comoUtilizar) as ChaveCalculadora[]) {
    const c = comoUtilizar[chave];
    const uri = `guia://regras/${chave}`;
    server.registerResource(
      `regras-${chave}`,
      uri,
      { title: c.titulo, description: `Como usar, cenários de exemplo e faixas de interpretação — ${c.fonte}, ${c.consultadoEm}.`, mimeType: "application/json" },
      async () => json(uri, { ...c, paginaWeb: `${SITE_URL}${ROTA_WEB[chave]}` })
    );
  }

  server.registerResource(
    "programas",
    "guia://programas",
    { title: "Programas de pontos e milhas", description: "Preço-alvo de compra, valor de uso e régua de CPM por programa, com fonte e data.", mimeType: "application/json" },
    async () => json("guia://programas", programas)
  );

  server.registerResource(
    "indicadores",
    "guia://indicadores",
    { title: "Indicadores econômicos usados", description: "CDI, Selic, dólar, taxas de cartão e premissas do guia, com fonte e data.", mimeType: "application/json" },
    async () => json("guia://indicadores", indicadores)
  );

  server.registerResource(
    "disclaimer",
    "guia://disclaimer",
    { title: "Aviso e limites", description: "O que estas calculadoras são e não são.", mimeType: "text/plain" },
    async () => ({
      contents: [
        {
          uri: "guia://disclaimer",
          mimeType: "text/plain",
          text: `${AVISO}\n\nAs fórmulas seguem o guia "Cashback, pontos e milhas". Os números de referência (preço-alvo, valor de uso, CDI, dólar) mudam com frequência: confira sempre a data em consultadoEm. Só técnicas legítimas — nada que viole termos de programa. Nenhum dado pessoal é armazenado: o servidor é stateless.`,
        },
      ],
    })
  );
}
