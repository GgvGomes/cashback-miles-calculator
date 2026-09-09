import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Veredito } from "@/components/calc/Veredito";
import type { Veredito as VeredictoTipo } from "@/lib/calc/types";
import { cn } from "cn";

/**
 * Resultado sticky no rodapé mobile / coluna direita no desktop: número
 * grande + veredito + botão de ação (ex.: "Adicionar ao cenário").
 */
export function ResultadoCard({
  titulo,
  valorFormatado,
  veredito,
  porque,
  acao,
  className,
}: {
  titulo: string;
  valorFormatado: string;
  veredito: VeredictoTipo;
  porque?: string;
  acao?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "sticky bottom-0 md:top-20 md:bottom-auto",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
          {titulo}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-3xl font-bold tabular-nums">{valorFormatado}</p>
        <Veredito veredito={veredito} porque={porque} />
        {acao}
      </CardContent>
    </Card>
  );
}
