# Arquitetura do Site — Brisa Noturna (Serena)

Documento de referência técnica e arquitetural para o site oficial de página única da **Brisa Noturna** e seu produto estrela **Serena** (Body Splash Artesanal de Lavanda, 200ml).

---

## 1. Visão Geral & Stack Tecnológica

- **Framework:** React 19 + TypeScript (`strict: true`) + Vite 6
- **Estilização:** Tailwind CSS v4 (`@tailwindcss/vite`) + Design Tokens CSS (`src/styles/tokens.css`)
- **Tipografia Local (Zero FOUT externo):**
  - Display Editorial: `@fontsource/cormorant-garamond` (`400`, `500`, `600`, `400-italic`) — classe `.font-display`
  - Corpo & UI: `@fontsource/plus-jakarta-sans` (`300`, `400`, `500`, `600`) — classe `.font-sans`
- **Coreografia de Movimento & Vídeo:**
  - `lenis`: Smooth scroll inercial sincronizado com GSAP
  - `gsap` + `ScrollTrigger`: Pinning horizontal, camadas sobrepostas, paralaxe e entrada coreografada
  - `split-type`: Quebra tipográfica em palavras/caracteres para o título do Hero
  - `framer-motion`: Transições de estado UI (Pirâmide Olfativa com `layoutId`, abas da Ficha Técnica, acordeão de FAQ)
  - `remotion` + `@remotion/player`: Filme programático interativo em 3 atos (`SerenaFilm.tsx`)
  - `lucide-react`: Iconografia minimalista

---

## 2. Arquitetura das 7 Seções da Página Única

Além da **Navbar Flutuante (`Navbar.tsx`)** fixa no topo e do **Footer Editorial (`Footer.tsx`)** no fechamento, a narrativa vertical se organiza em **7 seções principais**:

| # | Seção | Componente Esperado | Âncora (`id`) | Fundo Base | Papel Narrativo & Mecânica Principal |
|---|---|---|---|---|---|
| 0 | Navbar Flutuante | `Navbar.tsx` | — | `.lunar-glass` | Marca **BRISA NOTURNA** com lua crescente, links suaves via `lenis.scrollTo`, barra de progresso de leitura no topo e menu mobile acessível. |
| 1 | **Hero Cinematográfico** | `HeroSection.tsx` | `#inicio` | `#090710` | Entrada coreografada com **SplitType + GSAP**, névoa lunar sutil, frasco `serena-hero.jpg` em paralaxe, 3 micro-indicadores e CTAs com `MagnetButton`. |
| 2 | **Sobre a Brisa Noturna** | `AboutSection.tsx` | `#sobre` | `#141022` | Composição editorial assimétrica contando o nascimento da marca e 3 pilares em cartões `SpotlightCard` (iluminação radial seguindo o ponteiro). |
| 3 | **Jornada Horizontal da Lavanda** | `HorizontalJourney.tsx` | `#jornada` | `#090710` | **Scroll Horizontal Scroll-Driven** (`pin: true`, `scrub: 1`, `>= 1024px`) percorrendo 4 capítulos com paralaxe interna e indicador lunar. Em `< 1024px`, degrada em cards verticais sem overflow. |
| 4 | **Filme Interativo Serena (Remotion)** | `FilmShowcase.tsx` + `src/remotion/SerenaFilm.tsx` | `#filme` | `#141022` | Moldura editorial contendo `<Player />` (1280×720, 30fps, 300 frames / 10s) em 3 atos: campo de lavanda sob o luar, macro botânica com partículas prateadas e revelação do Serena. Fallback estático elegante sob `prefers-reduced-motion`. |
| 5 | **O Ritual de 3 Passos (Camadas Sobrepostas)** | `RitualLayers.tsx` | `#ritual` | `#090710` | **Stacked Overlapping Cards** (`position: sticky` + GSAP `scale`/`opacity`/`filter`) empilhando 3 folhas editoriais do ritual da mulher noturna ao descer a página. |
| 6 | **Produto Serena & Ficha Técnica** | `SerenaProduct.tsx` | `#serena` e `#ficha-tecnica` | `#141022` | Showcase heroico (`serena-hero.jpg` + `lavender-botanical-macro.jpg`), seletor interativo da **Pirâmide Olfativa** (Topo / Coração / Fundo com Framer Motion `AnimatePresence` + `layoutId`) e **Ficha Técnica Profissional** em grid arquitetural por categorias (Especificações, Composição & Ética, Modo de Uso). |
| 7 | **FAQ Resumido & Contato / Encomenda** | `FaqSection.tsx` + `ContactSection.tsx` | `#faq` e `#contato` | `#090710` → `#141022` | 5 perguntas objetivas em acordeão Framer Motion (`aria-expanded`) seguidas de canais oficiais e formulário de contato/encomenda com validação client-side e rate limiting de 60s via `localStorage`. |
| 8 | Footer Editorial | `Footer.tsx` | — | `#090710` | Assinatura final da Brisa Noturna, links rápidos, aviso de perfumaria artesanal e direitos autorais. |

---

## 3. Sistema de Camadas (`z-index`) & Regra de Overflow

Todos os níveis de empilhamento estão centralizados em `src/styles/tokens.css`:

| Token CSS | Valor | Uso |
|---|---|---|
| `--z-base` | `0` | Fundos de seção e gradientes base |
| `--z-ambient` | `1` | Névoa lunar, halos radiais, partículas decorativas (`pointer-events: none`) |
| `--z-content` | `10` | Conteúdo editorial padrão de cada seção |
| `--z-sticky-card-1` | `20` | Passo 01 em `RitualLayers` (`position: sticky`) |
| `--z-sticky-card-2` | `21` | Passo 02 em `RitualLayers` (sobrepõe Passo 01) |
| `--z-sticky-card-3` | `22` | Passo 03 em `RitualLayers` (sobrepõe Passo 02) |
| `--z-horizontal` | `30` | Trilho pinado da galeria `HorizontalJourney` |
| `--z-navbar` | `50` | Navbar flutuante `.lunar-glass` |
| `--z-progress` | `60` | Barra fina de progresso de leitura no topo da viewport |
| `--z-overlay` | `70` | Drawer mobile / modal / feedback flutuante |

> **Regra Crítica de Overflow:** `html` e `body` utilizam `overflow-x: clip` (jamais `overflow-x: hidden`). Nenhum ancestral de `RitualLayers` (`position: sticky`) ou `HorizontalJourney` (`ScrollTrigger` com `pin: true`) pode aplicar `overflow: hidden` ou `transform` estático no wrapper pai, preservando o contexto de empilhamento sticky e evitando overflow horizontal em qualquer viewport.

---

## 4. Transições, Scroll & Engenharia de Movimento

### 4.1 Sincronização Lenis + GSAP ScrollTrigger
- Inicializar `Lenis` (`duration: 1.25`, `smoothWheel: true`) apenas quando `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for `false`.
- Conectar `lenis.on('scroll', ScrollTrigger.update)`.
- Executar o loop via `gsap.ticker.add((time) => lenis.raf(time * 1000))` com `gsap.ticker.lagSmoothing(0)`.
- Exportar/compartilhar função de scroll suave (`scrollToSection(targetId)`) para links da Navbar e CTAs do Hero.
- Realizar cleanup completo no retorno do `useEffect` (`gsap.ticker.remove`, `lenis.destroy()`, `ScrollTrigger.killAll()` ou `ctx.revert()`).

### 4.2 Isolamento no React 19 StrictMode
- Todo efeito GSAP deve estar encapsulado em `gsap.context(() => { ... }, containerRef)` e/ou `gsap.matchMedia()`.
- Sempre reverter (`ctx.revert()` / `mm.revert()`) na desmontagem para evitar pins duplicados ou instâncias presas.
- Em `SplitType`, chamar `split.revert()` no cleanup do `useEffect`.

### 4.3 Pinned Horizontal Scroll Gallery (`HorizontalJourney.tsx`)
- Desktop (`min-width: 1024px`): `gsap.matchMedia()` cria timeline com `ScrollTrigger` (`pin: true`, `scrub: 1`, `invalidateOnRefresh: true`) traduzindo o trilho horizontal (`x: () => -(track.scrollWidth - window.innerWidth)`).
- Imagens internas recebem leve paralaxe horizontal (`containerAnimation`) e barra de progresso lunar acompanha `self.progress`.
- Mobile/Tablet (`max-width: 1023px`): layout vertical fluido em pilha editorial sem pin.

### 4.4 Pinned / Sticky Stacking Layers (`RitualLayers.tsx`)
- Cada cartão de passo usa `position: sticky` com offsets progressivos (`top: 6rem`, `top: 7.5rem`, `top: 9rem`) e `z-index` crescente (`20`, `21`, `22`).
- Enquanto o próximo cartão sobe, um `ScrollTrigger` com `scrub: true` aplica redução sutil de escala (`scale: 0.95`) e escurecimento atmosférico no cartão anterior, criando profundidade tátil de lâminas editoriais.

### 4.5 Remotion Player Showcase (`src/remotion/SerenaFilm.tsx`)
- Composição: `width={1280}`, `height={720}`, `fps={30}`, `durationInFrames={300}` (10s).
- **Ato 1 (0–100):** Campo de lavanda sob o luar (`/images/lavender-field-night.jpg`) com zoom lento `interpolate`, véu de névoa e tipografia cinética.
- **Ato 2 (100–200):** Macro botânica (`/images/lavender-botanical-macro.jpg`) com partículas prateadas procedurais e ondas sutis de serenidade.
- **Ato 3 (200–300):** Revelação do frasco Serena (`/images/serena-hero.jpg`) com `spring` suave e assinatura *"Floresça o sono. O ritual da mulher noturna."*
- Integração com `<Player component={SerenaFilm} ... autoPlay loop controls clickToPlay />` em moldura `.lunar-glass`, exibindo quadro editorial estático quando `prefers-reduced-motion: reduce` estiver ativo.

---

## 5. Design Tokens & Paleta Oficial

Definidos em `src/styles/tokens.css` e espelhados no `@theme` do Tailwind CSS v4 em `src/index.css`:

| Papel | Token CSS | Classe Tailwind v4 | Hex / Valor |
|---|---|---|---|
| Noite Profunda (Fundo 1) | `--bg-abyss` | `bg-abyss` | `#090710` |
| Céu de Meia-Noite (Fundo 2) | `--bg-midnight` | `bg-midnight` | `#141022` |
| Ameixa Nebulosa (Superfície) | `--surface-plum` | `bg-plum` | `#261C3B` |
| Vidro Lunar | `--surface-glass` | `.lunar-glass` | `rgba(20, 16, 34, 0.68)` |
| Véu de Lavanda | `--brand-lavender` | `text-lavender` / `bg-lavender` | `#8D6AA8` |
| Malva Lunar | `--brand-mauve` | `text-mauve` / `bg-mauve` | `#B89FD0` |
| Prata da Lua | `--accent-silver` | `text-silver` | `#D8D3E3` |
| Luz Estelar (Texto 1) | `--text-primary` | `text-starlight` | `#F5F2FA` |
| Brisa de Névoa (Texto 2) | `--text-secondary` | `text-mist` | `#A7A0B8` |
| Sombra de Estrela (Texto 3) | `--text-muted` | `text-shadow-star` | `#6E6682` |
| Orvalho Prateado | `--serena-dew` | `text-serena-dew` | `#C8CBE0` |
| Bruma Perolada | `--serena-pearl` | `text-serena-pearl` | `#EAE4F2` |

---

## 6. Contrato de Arquivos & Responsabilidades

```text
brisa-noturna/
├── ARCHITECTURE.md                  # [@planner] Documentação arquitetural
├── index.html                       # [@planner] HTML pt-BR, SEO, Open Graph, favicon lunar
├── package.json                     # [@planner] Scripts e dependências travadas/compatíveis
├── tsconfig.json                    # [@planner] TypeScript strict + alias @/* -> src/*
├── vite.config.ts                   # [@planner] Vite 6 + React + Tailwind v4 + alias @
├── public/
│   ├── favicon.svg                  # [@planner] Ícone SVG lua crescente prata/lavanda
│   └── images/                      # [@visuals] Assets fotográficos oficiais
│       ├── serena-hero.jpg
│       ├── lavender-field-night.jpg
│       ├── ritual-noturno.jpg
│       ├── lavender-botanical-macro.jpg
│       └── logo-brisa-noturna.jpg
└── src/
    ├── main.tsx                     # [@planner] Fontes @fontsource + tokens.css + index.css + <App />
    ├── index.css                    # [@planner] Tailwind v4 @theme, Lenis CSS, utilitários & reduced-motion
    ├── styles/
    │   └── tokens.css               # [@planner] Tokens CSS oficiais do Brand Kit Brisa Noturna
    ├── data/
    │   └── content.ts               # [@copywriter] Toda a copy tipada (BRAND, HERO, ABOUT_BRAND, etc.)
    ├── remotion/
    │   └── SerenaFilm.tsx           # [@ui-ux] Composição Remotion 3 atos (1280x720, 30fps, 300f)
    ├── components/                  # [@ui-ux] Componentes UI, animações e seções
    │   ├── Navbar.tsx
    │   ├── HeroSection.tsx
    │   ├── AboutSection.tsx
    │   ├── HorizontalJourney.tsx
    │   ├── FilmShowcase.tsx
    │   ├── RitualLayers.tsx
    │   ├── SerenaProduct.tsx
    │   ├── FaqSection.tsx
    │   ├── ContactSection.tsx
    │   ├── Footer.tsx
    │   ├── MagnetButton.tsx
    │   └── SpotlightCard.tsx
    └── App.tsx                      # [@ui-ux] Orquestração das 7 seções + Lenis + ScrollTrigger
```

---

## 7. Checklist de Verificação Final (`@evaluator`)

1. `npx tsc --noEmit` finaliza com código `0` e zero erros.
2. `npm run build` gera bundle limpo em `dist/` sem warnings críticos de peer deps ou assets quebrados.
3. Todas as 5 imagens em `public/images/` referenciadas existem e são carregadas via caminhos `/images/...`.
4. Zero `overflow-x: hidden` em ancestrais sticky e zero quebra horizontal em desktop/mobile.
5. Respeito integral a `prefers-reduced-motion: reduce` e limpeza de todos os contextos GSAP/Lenis/SplitType.
