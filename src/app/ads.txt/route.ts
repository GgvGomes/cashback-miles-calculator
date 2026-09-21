import { linhaAdsTxt } from "@/data/ads";

/** /ads.txt — exigido pelo AdSense na raiz do domínio. 404 enquanto não houver publisher. */
export function GET() {
  const linha = linhaAdsTxt();
  if (!linha) return new Response("Not found", { status: 404 });
  return new Response(`${linha}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
