export function FonteNota({
  fonte,
  consultadoEm,
  confirmado = true,
}: {
  fonte: string;
  consultadoEm: string;
  confirmado?: boolean;
}) {
  return (
    <p className="text-xs text-muted-foreground">
      {!confirmado ? (
        <span className="font-medium text-veredito-limite">
          ⚠️ não confirmado —{" "}
        </span>
      ) : null}
      Fonte: {fonte} · consultado em {consultadoEm}
    </p>
  );
}
