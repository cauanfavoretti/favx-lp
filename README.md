# FAVX — Landing Page

Landing page da **FAVX** (automação comercial com Inteligência Artificial), construída como uma página única em HTML com design system escuro e componentes premium (glassmorphism, glitch/bloom no scroll, animações em canvas 3D).

## Arquivo principal

- **`FAVX Landing Page.dc.html`** — a landing page completa (HTML + CSS + JS inline).

## Estrutura

1. **Hero** — vídeo de fundo
2. **Planos** — Nexus Chat AI · Plus · MAX (teste grátis 7 dias)
3. **IAs**
   - **Nexus Chat AI** — chat ao vivo que se responde sozinho + dashboard real (DSX) com glitch iluminado no scroll
   - **Nexus Voice AI** — esfera neural 3D interativa (cor pelo scroll, reage ao mouse)
4. **Clientes** — DSX, Maivor, EASY (estágio fixado com scroll)
5. **Rodapé**

## Assets

- `assets/img/` — imagens (logo, capas de clientes, dashboard)
- `assets/video/0717-web.mp4` — vídeo do hero (otimizado)
- `image-slot.js` — helper de imagem

Os arquivos-fonte originais (vídeos brutos, uploads) **não são versionados** — ver [`.gitignore`](./.gitignore).

## Como visualizar

Abra `FAVX Landing Page.dc.html` no builder `.dc.html`, ou sirva a pasta localmente para carregar os assets relativos.

## Deploy (Vercel / hospedagem estática)

O ponto de entrada servido na web é o **`index.html`** — uma versão browser-native gerada a partir do `.dc.html` (sem os wrappers `<x-dc>`/`<helmet>` do builder). Hospedagem estática procura por `index.html` na raiz; sem ele o deploy retorna **404 NOT_FOUND**.

Depois de editar o `FAVX Landing Page.dc.html`, regenere o `index.html`:

```bash
node build.js
```

Faça commit do `index.html` atualizado e o deploy (Vercel) atualiza automaticamente.
