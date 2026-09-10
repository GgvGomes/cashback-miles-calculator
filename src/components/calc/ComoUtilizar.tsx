"use client";

import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FonteNota } from "@/components/calc/FonteNota";
import type { ConteudoComoUtilizar } from "@/data/como-utilizar";

export function ComoUtilizar({ conteudo }: { conteudo: ConteudoComoUtilizar }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          <CircleHelp className="size-4" />
          Como utilizar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{conteudo.titulo}</DialogTitle>
          <DialogDescription>
            Como usar, cenários de exemplo, como interpretar o resultado e o
            porquê da régua.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm">
          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Como usar</h3>
            <ol className="list-decimal space-y-1 pl-4 text-muted-foreground">
              {conteudo.comoUsar.map((passo) => (
                <li key={passo}>{passo}</li>
              ))}
            </ol>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Cenários</h3>
            <div className="space-y-2">
              {conteudo.cenarios.map((cenario) => (
                <div key={cenario.titulo} className="rounded-lg border bg-muted/40 p-3">
                  <p className="text-xs font-medium">{cenario.titulo}</p>
                  <p className="mt-1 text-muted-foreground">{cenario.descricao}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Como interpretar</h3>
            <ul className="space-y-1.5">
              {conteudo.interpretacao.map((faixa) => (
                <li key={faixa.rotulo}>
                  <span className="font-medium">{faixa.rotulo}:</span>{" "}
                  <span className="text-muted-foreground">{faixa.texto}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Por quê</h3>
            <p className="text-muted-foreground">{conteudo.porque}</p>
          </section>

          <FonteNota fonte={conteudo.fonte} consultadoEm={conteudo.consultadoEm} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
