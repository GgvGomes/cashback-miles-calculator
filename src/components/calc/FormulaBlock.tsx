/**
 * Mostra a conta com os números do usuário substituídos.
 * Bloco de código simples — nunca LaTeX (style-guide.md).
 */
export function FormulaBlock({
  titulo,
  linhas,
}: {
  titulo?: string;
  linhas: string[];
}) {
  return (
    <div className="rounded-lg border bg-muted/40 p-3">
      {titulo ? (
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          {titulo}
        </p>
      ) : null}
      <pre
        tabIndex={0}
        role="region"
        aria-label="Fórmula com rolagem horizontal"
        className="overflow-x-auto text-xs leading-relaxed whitespace-pre focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {linhas.join("\n")}
      </pre>
    </div>
  );
}
