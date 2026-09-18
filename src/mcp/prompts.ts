/**
 * Prompts: roteiros prontos para a IA cliente conduzir a conversa.
 * O texto instrui *como* investigar, calcular e escrever o feedback —
 * a IA cliente é quem escreve; o servidor não chama LLM.
 */
import * as z from "zod";
import type { McpServer } from "@modelcontextprotocol/server";

const REGRAS_FEEDBACK = `Regras para o feedback final:
- Fale com "você", em PT-BR simples; defina termo técnico (CPM = custo por milheiro, ou seja, por mil pontos) na primeira vez.
- Use o campo \`contexto.interpretacao\` do resultado para explicar o veredito; não invente faixas.
- Cite fonte e data (\`contexto.fonte\`, \`contexto.consultadoEm\`, \`contexto.referencias\`) de todo número de referência.
- Mostre a conta (\`formula\`) em 2–3 linhas.
- Termine com um próximo passo concreto (o que fazer, o que checar, ou qual outra calculadora rodar).
- Nunca prometa retorno financeiro nem diga "vai ganhar X". Descreva o mecanismo.
- Se o resultado vier com \`status: "precisa_info"\`, pergunte ao usuário os itens listados (um por vez se forem muitos) e chame a ferramenta de novo com tudo.`;

export function registrarPrompts(server: McpServer) {
  server.registerPrompt(
    "analisar_cenario",
    {
      title: "Analisar meu cenário de pontos",
      description:
        "Roteiro completo: investigar o perfil, rodar as calculadoras certas e escrever um feedback personalizado.",
      argsSchema: z.object({
        objetivo: z.string().describe("O que a pessoa quer decidir, em uma frase.").optional(),
      }),
    },
    ({ objetivo }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Quero uma análise personalizada sobre pontos, milhas e cashback.${objetivo ? ` Meu objetivo: ${objetivo}.` : ""}

Siga este roteiro:
1. Chame \`investigar_perfil\` (pergunte o que faltar).
2. Use \`proximasFerramentas\` e \`perguntasSugeridas\` do resultado para colher os números e chamar as calculadoras, repassando o \`perfil\`.
3. Se precisar de referência (preço-alvo, valor de uso, CDI), chame \`listar_programas\` ou leia o recurso \`guia://programas\`.
4. Escreva o feedback.

${REGRAS_FEEDBACK}`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    "comparar_opcoes",
    {
      title: "Comparar: comprar pontos, assinar clube ou esperar",
      description: "Compara compra avulsa, clube e esperar promoção para um mesmo objetivo de resgate.",
      argsSchema: z.object({
        programa: z.string().describe("id do programa (veja listar_programas)").optional(),
      }),
    },
    ({ programa }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Quero comparar formas de juntar pontos${programa ? ` na ${programa}` : ""} para um resgate específico.

Roteiro:
1. \`investigar_perfil\` com estrategia "acumular".
2. Descubra o resgate-alvo (passagem, taxas, milhas) e rode \`calcular_resgate\` para obter o valor por mil de uso.
3. Rode \`calcular_compra_de_pontos\` (com e sem bônus de transferência, se for coalizão) e \`calcular_clube\` com o mesmo valor por mil de resgate.
4. Se a pessoa for combinar fontes, monte os passos e rode \`calcular_cenario\`.
5. Apresente uma tabela: opção | CPM efetivo | veredito | observação. Depois recomende com base nos vereditos, sem prometer ganho.

${REGRAS_FEEDBACK}`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    "revisar_resgate",
    {
      title: "Esse resgate vale a pena?",
      description: "Avalia rapidamente uma emissão com milhas contra o preço em dinheiro.",
      argsSchema: z.object({}),
    },
    () => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Quero saber se um resgate específico vale a pena.

Roteiro:
1. Pergunte: programa, preço da passagem em dinheiro (mesma data/trecho/cabine), taxas na emissão, milhas exigidas e, se souber, quanto pagou por mil pontos.
2. Rode \`calcular_resgate\` (e \`calcular_valor_do_ponto\` se tiver o CPM pago).
3. Explique o veredito com \`contexto.interpretacao\` e diga o que mudaria a conclusão (ex.: taxas menores, outra data).

${REGRAS_FEEDBACK}`,
          },
        },
      ],
    })
  );
}
