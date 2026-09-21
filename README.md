# Compensa? — Calculadora de pontos e milhas

**🔗 https://cashback-miles-calculator.vercel.app**

Calculadora de pontos, milhas e cashback, grátis e sem cadastro. Seis contas que
respondem "compensa?" com a fórmula, a fonte e a data de cada número à mostra:

| Calculadora | Pergunta que responde |
|---|---|
| [Valor do ponto](https://cashback-miles-calculator.vercel.app/valor-do-ponto) | Quanto a milha valeu nesse resgate, comparada ao CPM pago? |
| [Compra de pontos](https://cashback-miles-calculator.vercel.app/compra-de-pontos) | Comprar milhas (avulso, bonificado, com bônus de transferência) vale o preço? |
| [Clube de pontos](https://cashback-miles-calculator.vercel.app/clube) | Assinar clube Livelo, Smiles, LATAM Pass ou TudoAzul compensa? |
| [Resgate e emissão](https://cashback-miles-calculator.vercel.app/resgate) | Esse resgate devolve quanto por milheiro? Milhas ou dinheiro? |
| [Cartão de crédito](https://cashback-miles-calculator.vercel.app/cartao) | A anuidade se paga com float + pontos/cashback? Parcelar ou à vista? |
| [Cenário completo](https://cashback-miles-calculator.vercel.app/cenario) | Empilhando compra, clube e transferência, qual é o CPM combinado? |

Também disponível como [servidor MCP](https://cashback-miles-calculator.vercel.app/mcp)
para usar as calculadoras direto no Claude, ChatGPT ou Cursor.

As fórmulas vêm do guia *Plano cashback, pontos e milhas* (Notion). Só técnicas
legítimas — nada de brecha, multi-CPF ou burla de regra de programa.

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # vitest (fórmulas em src/lib/calc)
npm run build
```

Next.js App Router + Tailwind + shadcn/ui. Deploy na Vercel.

### Variáveis de ambiente

| Nome | Uso |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | Token da meta tag `google-site-verification` do Search Console (opcional). |
| `NEXT_PUBLIC_SITE_URL` | URL pública, sem barra final. Padrão: `https://cashback-miles-calculator.vercel.app`. Trocar ao apontar domínio próprio (metadata, sitemap, robots, OG image e MCP seguem). |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Publisher id do AdSense (`ca-pub-…`). Sem ele nenhum anúncio nem script entra no build. |
| `NEXT_PUBLIC_ADSENSE_SLOT_CONTEUDO` | Id da unidade "display responsivo" exibida abaixo da conta em cada calculadora. |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Id da unidade da coluna direita (só desktop, abaixo do resultado). |
| `NEXT_PUBLIC_ADSENSE_SLOT_RODAPE` | Id da unidade do fim da página na home e em `/mcp`. |
| `NEXT_PUBLIC_ADS_PLACEHOLDER` | `1` desenha uma caixa tracejada no lugar de cada anúncio para validar layout localmente. |

## Anúncios (Google AdSense)

Slots manuais com altura reservada (zero CLS), longe dos inputs, no máximo 2 por
calculadora (1 no mobile). Auto ads ficam **desligados** no painel. Nenhuma
página institucional (`/sobre`, `/privacidade`, `/termos`, `/contato`) tem anúncio.

Onde cada slot aparece:

| Posição | Onde | Mobile |
|---|---|---|
| `conteudo` | fim da coluna esquerda das 6 calculadoras, depois do texto explicativo | sim |
| `sidebar` | coluna direita, abaixo do card de resultado (wrapper sticky) | não (`hidden md:block`) |
| `rodape` | fim da home e antes de "Limites" em `/mcp` | sim |

Passo a passo no painel (uma vez):

1. **Conta** — crie a conta em adsense.google.com com o e-mail do site e adicione
   o site (`NEXT_PUBLIC_SITE_URL`). ⚠️ Subdomínio `*.vercel.app` costuma ser
   recusado como "site não pertence a você"; domínio próprio resolve.
2. **Verificação** — escolha "meta tag": basta setar `NEXT_PUBLIC_ADSENSE_CLIENT`
   na Vercel e redeployar; a tag `google-adsense-account` entra no `<head>`.
   Confira também `https://<site>/ads.txt` (gerado do mesmo env).
3. **Privacidade e mensagens** — crie a mensagem de consentimento GDPR (e a de
   estados dos EUA, se quiser). O script do AdSense já entrega a CMP; nada a
   codar. A política em `/privacidade` já cita cookies, DoubleClick e opt-out.
4. **Unidades** — Anúncios → Por unidade → "Display", tamanho *responsivo*.
   Crie três (conteúdo, sidebar, rodapé) e copie os `data-ad-slot` para
   `NEXT_PUBLIC_ADSENSE_SLOT_*`.
5. **Auto ads** — Anúncios → Por site → deixe **desligado** (senão o Google
   injeta âncora/vignette por cima do card de resultado sticky do mobile).
6. Redeploy. Enquanto a revisão do site não termina, os slots ficam em branco
   com a altura reservada — comportamento esperado.

Validar layout sem conta: `NEXT_PUBLIC_ADS_PLACEHOLDER=1 npm run dev`.
