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
