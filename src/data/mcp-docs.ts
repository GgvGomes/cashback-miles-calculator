/**
 * Conteúdo da página /mcp — como conectar as calculadoras ao seu assistente
 * de IA. Fonte da verdade do texto; a página só renderiza.
 */
import { TOOLS } from "@/mcp/tools";

export const MCP_URL = "https://cashback-miles-calculator.vercel.app/api/mcp";
export const MCP_NOME = "compensa";

export interface ClienteMcp {
  id: string;
  nome: string;
  resumo: string;
  passos: string[];
  snippet?: { titulo: string; codigo: string };
  observacao?: string;
}

export interface DocsMcp {
  titulo: string;
  subtitulo: string;
  oQueE: string[];
  comoFunciona: { titulo: string; texto: string }[];
  clientes: ClienteMcp[];
  ferramentas: { nome: string; titulo: string; descricao: string }[];
  prompts: { nome: string; descricao: string }[];
  exemploConversa: { quem: "você" | "assistente"; texto: string }[];
  limites: string[];
  fonte: string;
  consultadoEm: string;
}

export const mcpDocs: DocsMcp = {
  titulo: "Conectar ao seu assistente de IA (MCP)",
  subtitulo:
    "Use as seis calculadoras direto de dentro do Claude, ChatGPT ou Cursor. O assistente pergunta o que falta, roda a conta aqui e escreve um feedback personalizado para o seu cenário.",

  oQueE: [
    "MCP (Model Context Protocol) é um padrão aberto que deixa um assistente de IA usar ferramentas externas. Este site expõe as calculadoras como ferramentas MCP num endereço público.",
    "Você conecta uma vez, e depois é só conversar: \"vale resgatar 40 mil milhas Smiles numa passagem de R$ 1.200?\". O assistente chama a calculadora certa, pede os dados que faltam e explica o veredito com as regras e fontes do guia.",
    "O servidor não guarda nada: cada chamada é independente, sem cadastro, sem dado pessoal, sem custo.",
  ],

  comoFunciona: [
    {
      titulo: "1. Investigação (perfil)",
      texto:
        "A ferramenta `investigar_perfil` colhe programa, estratégia (acumular, resgatar já, comparar clube, cartão), objetivo e números básicos. Devolve um perfil que o assistente repassa às outras ferramentas e um roteiro de quais calculadoras rodar e o que perguntar em seguida.",
    },
    {
      titulo: "2. Gates: pede o que falta",
      texto:
        "Toda calculadora tem entradas obrigatórias. Se faltar algo, em vez de erro ela devolve `status: \"precisa_info\"` com a lista de perguntas (campo, unidade, dica). O assistente pergunta a você e chama de novo. Em clientes que suportam formulários MCP (elicitation), o pedido pode aparecer como um formulário nativo.",
    },
    {
      titulo: "3. Cálculo com contexto",
      texto:
        "Com tudo em mãos, a ferramenta roda exatamente a mesma fórmula da página web e devolve resultado, veredito (compensa / limítrofe / não compensa), a conta passo a passo e um `contexto`: faixas de interpretação, o porquê da regra, fonte e data de cada número de referência.",
    },
    {
      titulo: "4. Feedback personalizado (pela IA)",
      texto:
        "Quem escreve o feedback é o assistente que você já usa — o servidor não chama nenhum modelo. Ele recebe o contexto e a instrução de explicar com \"você\", citar fonte e data, mostrar a conta e terminar com um próximo passo. Sem promessa de retorno financeiro.",
    },
  ],

  clientes: [
    {
      id: "claude-code",
      nome: "Claude Code",
      resumo: "Terminal ou IDE. Um comando.",
      passos: [
        "Abra o terminal no projeto (ou em qualquer pasta).",
        "Rode o comando abaixo. Para usar em todos os projetos, adicione `--scope user`.",
        "Digite `/mcp` dentro do Claude Code para confirmar que \"compensa\" está conectado.",
        "Pergunte algo como: \"usa o compensa e me diz se vale assinar o Clube Livelo de R$ 44,90\".",
      ],
      snippet: {
        titulo: "Terminal",
        codigo: `claude mcp add --transport http ${MCP_NOME} ${MCP_URL}`,
      },
      observacao:
        "Alternativa: crie um arquivo `.mcp.json` na raiz do projeto com `{ \"mcpServers\": { \"compensa\": { \"type\": \"http\", \"url\": \"" + MCP_URL + "\" } } }`.",
    },
    {
      id: "claude-desktop",
      nome: "Claude (app e claude.ai)",
      resumo: "Conector personalizado, sem editar arquivo.",
      passos: [
        "Abra Configurações → Conectores (Settings → Connectors).",
        "Clique em \"Adicionar conector personalizado\" (Add custom connector).",
        "Nome: compensa. URL: cole o endereço do servidor abaixo. Não precisa de autenticação.",
        "Salve. Numa conversa nova, ative o conector no menu de ferramentas e pergunte.",
      ],
      snippet: { titulo: "URL do servidor", codigo: MCP_URL },
      observacao:
        "Conectores personalizados podem estar limitados por plano (o plano gratuito costuma permitir poucos). A conexão sai dos servidores da Anthropic, por isso o endereço precisa ser público — e é.",
    },
    {
      id: "chatgpt",
      nome: "ChatGPT",
      resumo: "Modo desenvolvedor (planos pagos).",
      passos: [
        "Abra Configurações → Apps e conectores → Configurações avançadas e ative o \"Modo desenvolvedor\".",
        "Volte em Apps e conectores → \"Criar\" (ou \"Adicionar conector\").",
        "Nome: compensa. URL do servidor MCP: cole o endereço abaixo. Autenticação: nenhuma.",
        "Numa conversa nova, escolha o conector em \"Mais\" / ferramentas e pergunte.",
      ],
      snippet: { titulo: "URL do servidor MCP", codigo: MCP_URL },
      observacao:
        "O modo desenvolvedor está disponível em planos pagos (Plus, Pro, Business, Enterprise, Edu). Os nomes dos menus mudam com frequência; procure por \"MCP\" ou \"conector\" nas configurações.",
    },
    {
      id: "cursor",
      nome: "Cursor",
      resumo: "Arquivo `mcp.json` no projeto ou global.",
      passos: [
        "Crie (ou edite) `.cursor/mcp.json` na raiz do projeto — ou `~/.cursor/mcp.json` para valer em todos.",
        "Cole o conteúdo abaixo e salve.",
        "Em Cursor Settings → MCP, confira se \"compensa\" aparece com as ferramentas listadas.",
        "No chat (modo agente), peça a análise.",
      ],
      snippet: {
        titulo: ".cursor/mcp.json",
        codigo: `{
  "mcpServers": {
    "${MCP_NOME}": {
      "url": "${MCP_URL}"
    }
  }
}`,
      },
    },
    {
      id: "outros",
      nome: "Outros clientes / teste",
      resumo: "Qualquer cliente MCP com transporte Streamable HTTP.",
      passos: [
        "Use o endereço abaixo como servidor MCP remoto (Streamable HTTP, sem autenticação).",
        "Para inspecionar sem instalar nada: rode o MCP Inspector e cole a URL.",
      ],
      snippet: {
        titulo: "MCP Inspector (terminal)",
        codigo: `npx @modelcontextprotocol/inspector
# no navegador: Transport = Streamable HTTP, URL = ${MCP_URL}`,
      },
    },
  ],

  ferramentas: TOOLS.map((t) => ({ nome: t.nome, titulo: t.titulo, descricao: t.descricao })),

  prompts: [
    { nome: "analisar_cenario", descricao: "Roteiro completo: investigar perfil → rodar calculadoras → feedback personalizado." },
    { nome: "comparar_opcoes", descricao: "Comprar pontos, assinar clube ou esperar promoção — para um mesmo resgate." },
    { nome: "revisar_resgate", descricao: "Avaliação rápida de uma emissão com milhas contra o preço em dinheiro." },
  ],

  exemploConversa: [
    { quem: "você", texto: "Vale resgatar 40 mil milhas Smiles numa passagem que custa R$ 1.200? As taxas são R$ 120." },
    {
      quem: "assistente",
      texto:
        "Rodei a calculadora de resgate. Valor por mil: (1.200 − 120) ÷ 40 = R$ 27,00/mil. O preço-alvo de compra da Smiles é R$ 16,00/mil (Melhores Destinos, consultado em 2026-08-18), então o resgate devolve 1,69× o que custaria comprar as milhas. Veredito: compensa. Se quiser, me diga quanto você pagou pelas milhas e eu calculo a razão de retorno real.",
    },
    { quem: "você", texto: "Paguei R$ 22 por mil. E se eu usar o Clube Smiles pra juntar o resto?" },
    {
      quem: "assistente",
      texto:
        "Com CPM pago de R$ 22/mil, a razão fica 1,23× — aceitável, mas abaixo do sweet-spot de 2×. Para o clube preciso de duas coisas: qual plano (mensalidade e pontos por mês) e por quantos meses você ficaria?",
    },
  ],

  limites: [
    "Cálculo educativo: descreve o mecanismo, não promete ganho. Decisão é sua.",
    "Os números de referência (preço-alvo, valor de uso, CDI, dólar) vêm com fonte e data (`consultadoEm`) — confira antes de decidir; eles mudam.",
    "Só técnicas legítimas. Nada que viole termos de programa, nem multi-CPF, nem brecha.",
    "Servidor público e sem estado: não guarda conversa, perfil ou dado pessoal. O perfil vive só na sua conversa com o assistente.",
    "Formulário nativo (elicitation) depende do cliente suportar a versão 2026 do protocolo; caso contrário o assistente pergunta em texto — o resultado é o mesmo.",
    "O feedback é escrito pelo assistente que você usa; a qualidade depende dele. As contas, não: são as mesmas da página web.",
  ],

  fonte: "Documentação do Model Context Protocol (modelcontextprotocol.io) e docs oficiais de Claude Code, Claude, ChatGPT e Cursor",
  consultadoEm: "2026-09-17",
};
