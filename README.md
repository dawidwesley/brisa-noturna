# 🌙 Brisa Noturna — Serena (Body Splash Artesanal)

Vitrine digital e portfólio de apresentação da **Brisa Noturna** e do lançamento **Serena**, um body splash artesanal formulado com **5% de essência pura de Lavanda Francesa (*Lavandula angustifolia*)**, criado para o ritual da mulher noturna e para florescer o sono.

---

## ✨ Destaques do Projeto

- **Paleta Editorial Noturna:** Profundidade em roxo-noite, berinjela-veludo, ametista suave e prata lunar (`#07040D`, `#120A1F`, `#1B0F2E`, `#261540`, `#9B6FC7`, `#C6A4E6`, `#E4DFF0`).
- **Scroll Suave & Animações 60fps:** `Lenis` sincronizado com `GSAP ScrollTrigger`, `SplitType` no Hero, `Framer Motion` nas micro-interações e pausa automática de animações fora da viewport.
- **Filme Programático em Remotion:** Composição real em 3 atos (`src/remotion/SerenaFilm.tsx`) embutida com `@remotion/player` e storyboard interativo.
- **Jornada Horizontal "Da Flor ao Repouso":** Transição horizontal scroll-driven em desktop com 24 estrelas sutis em GPU e degradação vertical responsiva em mobile.
- **Ritual da Mulher Noturna:** 3 gestos em camadas sobrepostas com transição limpa (`autoAlpha: 0`) sem sobreposição de texto.
- **Pirâmide Olfativa & Ficha Técnica Profissional:** 3 tempos da Lavanda Francesa pura a 5% + 11 especificações técnicas filtráveis em 2 colunas distantes com último fato centralizado.
- **FAQ & Contato de Alta Conversão:** Acordeão CSS Grid suave com altura estabilizada, WhatsApp em 1 clique, cópia rápida de e-mail, seletor visual em cards e rate limiting client-side (60s).

---

## 🛠️ Stack Tecnológica

- **React 19** + **TypeScript (strict)** + **Vite 6** + **Tailwind CSS v4**
- **Remotion 4** + **@remotion/player**
- **GSAP 3** (`ScrollTrigger`) + **Lenis** + **SplitType** + **Framer Motion**
- **Fontes locais:** `@fontsource/cormorant-garamond` e `@fontsource/plus-jakarta-sans`

---

## ▶️ Execução Local

```bash
npm install
npm run dev
```

## 🚀 Deploy na Vercel

O projeto já inclui `vercel.json` configurado para Vite + SPA + cabeçalhos de segurança HTTP e cache de assets estáticos:

- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
