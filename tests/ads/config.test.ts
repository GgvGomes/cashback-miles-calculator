import { describe, expect, it } from "vitest";
import { adsAtivos, linhaAdsTxt, publisherIdAdsTxt, slotDe } from "@/data/ads";

const vazio = { conteudo: "", sidebar: "", rodape: "" };
const cheio = { conteudo: "111", sidebar: "", rodape: "333" };

describe("config de anúncios", () => {
  it("sem env nada fica ativo", () => {
    expect(adsAtivos("", vazio)).toBe(false);
    expect(adsAtivos("ca-pub-1", vazio)).toBe(false);
    expect(adsAtivos("", cheio)).toBe(false);
    expect(slotDe("conteudo", "", cheio)).toBeNull();
    expect(linhaAdsTxt("")).toBeNull();
  });

  it("com publisher + slot fica ativo e devolve só slots preenchidos", () => {
    expect(adsAtivos("ca-pub-1", cheio)).toBe(true);
    expect(slotDe("conteudo", "ca-pub-1", cheio)).toBe("111");
    expect(slotDe("sidebar", "ca-pub-1", cheio)).toBeNull();
    expect(slotDe("rodape", "ca-pub-1", cheio)).toBe("333");
  });

  it("ads.txt usa o id sem prefixo ca- e o TAG id do Google", () => {
    expect(publisherIdAdsTxt("ca-pub-1234567890123456")).toBe("pub-1234567890123456");
    expect(linhaAdsTxt("ca-pub-1234567890123456")).toBe("google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0");
  });
});

describe("rota /ads.txt", () => {
  it("responde text/plain com a linha do publisher padrão", async () => {
    const { GET } = await import("@/app/ads.txt/route");
    const res = GET();
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/plain");
    expect(await res.text()).toBe("google.com, pub-4366681109860919, DIRECT, f08c47fec0942fa0\n");
  });
});
