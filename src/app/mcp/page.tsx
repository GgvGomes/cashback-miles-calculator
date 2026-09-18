import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FormulaBlock } from "@/components/calc/FormulaBlock";
import { FonteNota } from "@/components/calc/FonteNota";
import { MCP_URL, mcpDocs } from "@/data/mcp-docs";

function Secao({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="space-y-4">
      <h2 id={`${id}-titulo`} className="text-xl font-semibold tracking-tight">
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default function McpPage() {
  const d = mcpDocs;
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{d.titulo}</h1>
        <p className="max-w-2xl text-muted-foreground">{d.subtitulo}</p>
        <FormulaBlock titulo="Endereço do servidor MCP" linhas={[MCP_URL]} />
      </div>

      <Secao id="o-que-e" titulo="O que é">
        <div className="max-w-2xl space-y-3 text-sm leading-relaxed">
          {d.oQueE.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Secao>

      <Secao id="como-funciona" titulo="Como funciona">
        <div className="grid gap-4 sm:grid-cols-2">
          {d.comoFunciona.map((c) => (
            <Card key={c.titulo} className="border-border/80">
              <CardHeader>
                <CardTitle className="text-base">{c.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{c.texto}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Secao>

      <Secao id="configurar" titulo="Como configurar">
        <Tabs defaultValue={d.clientes[0].id}>
          <TabsList className="h-auto flex-wrap">
            {d.clientes.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                {c.nome}
              </TabsTrigger>
            ))}
          </TabsList>
          {d.clientes.map((c) => (
            <TabsContent key={c.id} value={c.id} className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">{c.resumo}</p>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                {c.passos.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              {c.snippet ? <FormulaBlock titulo={c.snippet.titulo} linhas={c.snippet.codigo.split("\n")} /> : null}
              {c.observacao ? (
                <div className="rounded-md border border-veredito-limite/30 bg-veredito-limite-bg p-3 text-sm text-veredito-limite">
                  {c.observacao}
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>
      </Secao>

      <Secao id="ferramentas" titulo="Ferramentas disponíveis">
        <Accordion type="multiple" className="w-full">
          {d.ferramentas.map((f) => (
            <AccordionItem key={f.nome} value={f.nome}>
              <AccordionTrigger className="text-left">
                <span className="flex flex-wrap items-center gap-2">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{f.nome}</code>
                  <span className="font-medium">{f.titulo}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">{f.descricao}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Prompts prontos</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {d.prompts.map((p) => (
              <li key={p.nome}>
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">{p.nome}</code> — {p.descricao}
              </li>
            ))}
          </ul>
        </div>
      </Secao>

      <Secao id="exemplo" titulo="Exemplo de conversa">
        <div className="max-w-2xl space-y-3">
          {d.exemploConversa.map((m, i) => (
            <div
              key={i}
              className={
                m.quem === "você"
                  ? "ml-auto max-w-[90%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "mr-auto max-w-[90%] rounded-lg border bg-muted/40 px-3 py-2 text-sm"
              }
            >
              <span className="mb-1 block text-xs font-medium opacity-70">{m.quem}</span>
              {m.texto}
            </div>
          ))}
        </div>
      </Secao>

      <Secao id="limites" titulo="Limites e avisos">
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm">
          {d.limites.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <FonteNota fonte={d.fonte} consultadoEm={d.consultadoEm} />
      </Secao>
    </div>
  );
}
