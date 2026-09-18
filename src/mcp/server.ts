/**
 * Registra tools, prompts e resources num `McpServer`. Sem HTTP aqui —
 * o transporte fica em `src/app/api/mcp/route.ts`.
 */
import { acceptedContent, type McpServer, type ServerContext } from "@modelcontextprotocol/server";
import { CHAVE_FORM, podeElicitar } from "./gates";
import { registrarPrompts } from "./prompts";
import { registrarResources } from "./resources";
import { TOOLS } from "./tools";

export const SERVER_INFO = { name: "compensa-calculadoras", version: "1.0.0" };

export const INSTRUCOES = `Calculadoras de pontos, milhas e cashback (PT-BR). Comece por \`investigar_perfil\`; repasse o \`perfil\` devolvido às outras ferramentas. Toda ferramenta devolve \`status: "ok"\` com resultado + veredito + contexto (regras de interpretação, fonte, data) ou \`status: "precisa_info"\` com perguntas a fazer ao usuário. Escreva o feedback com base em \`contexto.interpretacao\`, cite fonte e data, e nunca prometa retorno financeiro.`;

export function criaServidorMcp(server: McpServer) {
  for (const tool of TOOLS) {
    server.registerTool(
      tool.nome,
      {
        title: tool.titulo,
        description: tool.descricao,
        inputSchema: tool.inputSchema,
        annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
      },
      async (args: Record<string, unknown>, ctx: ServerContext) => {
        // Segunda volta do multi-round-trip: respostas do formulário entram nos args.
        const respostas = acceptedContent(ctx.mcpReq.inputResponses, CHAVE_FORM);
        const completos = respostas ? { ...args, ...respostas } : args;
        return tool.handler(completos, { podeElicitar: podeElicitar(server, ctx) });
      }
    );
  }
  registrarPrompts(server);
  registrarResources(server);
}
