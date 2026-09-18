/**
 * Endpoint MCP remoto (Streamable HTTP, stateless).
 * URL pública: https://cashback-miles-calculator.vercel.app/api/mcp
 */
import { createMcpHandler } from "mcp-handler";
import { criaServidorMcp, INSTRUCOES, SERVER_INFO } from "@/mcp/server";

// Env opcional: MCP_ELICITATION=1 liga o formulário nativo (spec 2026-07-28); sem isso, gates usam só `precisa_info`.
export const maxDuration = 60;

const handler = createMcpHandler(criaServidorMcp, {
  serverInfo: SERVER_INFO,
  instructions: INSTRUCOES,
  verboseLogs: process.env.NODE_ENV !== "production",
});

export { handler as GET, handler as POST, handler as DELETE };
