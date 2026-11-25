import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Droplets, FileText, Flower2, Moon, Wind } from 'lucide-react';
import {
  IMAGE_ASSETS,
  SERENA_PRODUCT,
  TECHNICAL_SHEET,
  TECHNICAL_SHEET_CATEGORIES,
  TECHNICAL_SHEET_HEADER,
} from '@/data/content';
import type { OlfactoryLevelId, TechnicalSpecCategory } from '@/data/content';
import { MagnetButton } from './MagnetButton';
import { SpotlightCard } from './SpotlightCard';

interface SerenaProductProps {
  onNavigate: (href: string) => void;
}

type SpecFilter = 'Todas' | TechnicalSpecCategory;

const OLFACTORY_STAGE_ICONS: Record<OlfactoryLevelId, typeof Wind> = {
  topo: Wind,
  coracao: Flower2,
  fundo: Moon,
};

export function SerenaProduct({ onNavigate }: SerenaProductProps) {
  const [activeNoteId, setActiveNoteId] = useState<OlfactoryLevelId>('coracao');
  const [activeSpecTab, setActiveSpecTab] = useState<SpecFilter>('Todas');

  const activeLevel =
    SERENA_PRODUCT.olfactoryPyramid.find((level) => level.id === activeNoteId) ??
    SERENA_PRODUCT.olfactoryPyramid[0];
  const ActiveNoteIcon = OLFACTORY_STAGE_ICONS[activeLevel.id];

  const filteredSpecs =
    activeSpecTab === 'Todas'
      ? TECHNICAL_SHEET
      : TECHNICAL_SHEET.filter((item) => item.category === activeSpecTab);

  const specTabs: SpecFilter[] = ['Todas', ...TECHNICAL_SHEET_CATEGORIES];

  const getTabCount = (tab: SpecFilter) =>
    tab === 'Todas'
      ? TECHNICAL_SHEET.length
      : TECHNICAL_SHEET.filter((item) => item.category === tab).length;

  const isOddCount = filteredSpecs.length % 2 === 1;

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <section
      id="serena"
      className="section-royal section-ambient-glow relative py-24 sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ===================================================================
            PARTE A: Showcase Heroico do Produto Serena
           =================================================================== */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Galeria Editorial (Frasco 1:1 integral + Macro Botânica alinhada abaixo sem sobrepor a arte) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-silver/18 bg-[#080410] shadow-[0_32px_84px_-24px_rgba(4,2,10,0.94)]">
                <img
                  src={IMAGE_ASSETS['serena-hero'].src}
                  alt={IMAGE_ASSETS['serena-hero'].alt}
                  width={1254}
                  height={1254}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Cartão Fotográfico Botânico abaixo da arte 1:1 (zero obstrução de texto ou frasco) */}
              <div className="mt-5 grid grid-cols-12 items-center gap-3.5 rounded-2xl border border-mauve/22 bg-abyss/92 p-3.5 shadow-[0_24px_60px_-20px_rgba(4,2,10,0.96)] sm:gap-4 sm:p-4">
                <div className="col-span-4 aspect-[4/3] overflow-hidden rounded-xl border border-silver/14 bg-midnight">
                  <img
                    src={IMAGE_ASSETS['lavender-botanical'].src}
                    alt={IMAGE_ASSETS['lavender-botanical'].alt}
                    width={1200}
                    height={896}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="col-span-8 min-w-0 pr-1 sm:pr-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-medium tracking-[0.22em] text-mauve uppercase">
                      Mono-Essência Pura • 5%
                    </p>
                    <span className="rounded-full border border-silver/16 bg-midnight/85 px-2.5 py-0.5 text-[10px] tracking-[0.14em] text-serena-dew uppercase">
                      {SERENA_PRODUCT.volume}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-xl italic text-starlight">
                    Lavandula angustifolia
                  </p>
                  <p className="mt-1 text-xs leading-relaxed font-light text-mist">
                    Apenas Lavanda Francesa selecionada, macerada por 21 dias no escuro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Sensoriais, Preço & CTAs */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-mauve/75" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.26em] text-mauve uppercase">
                {SERENA_PRODUCT.eyebrow}
              </span>
            </div>

            <h2 className="mt-4 font-display text-5xl font-medium text-starlight sm:text-6xl">
              <span className="italic text-serena-pearl">{SERENA_PRODUCT.name}</span>
              <span className="mt-1 block text-2xl font-normal not-italic text-silver sm:text-3xl">
                Body Splash Artesanal de Lavanda Francesa
              </span>
            </h2>

            <p className="mt-5 text-base leading-[1.78] font-light text-mist sm:text-lg">
              {SERENA_PRODUCT.subtitle}
            </p>

            {/* Preço & Lote */}
            <div className="mt-7 flex flex-wrap items-baseline justify-between gap-4 rounded-2xl border border-mauve/22 bg-abyss/75 px-6 py-5">
              <div>
                <p className="text-[11px] tracking-[0.22em] text-mist uppercase">
                  Valor de Apresentação
                </p>
                <p className="mt-1 font-display text-4xl font-medium text-serena-pearl">
                  {SERENA_PRODUCT.price}
                </p>
              </div>
              <p className="max-w-xs text-xs leading-relaxed font-light text-mist">
                {SERENA_PRODUCT.priceNote}
              </p>
            </div>

            {/* Três Metadados Essenciais */}
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-silver/12 bg-abyss/60 p-4">
                <dt className="text-[10px] tracking-[0.2em] text-mist uppercase">
                  Volume
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-starlight">
                  {SERENA_PRODUCT.volume}
                </dd>
              </div>
              <div className="rounded-xl border border-silver/12 bg-abyss/60 p-4">
                <dt className="text-[10px] tracking-[0.2em] text-mist uppercase">
                  Família Olfativa
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-starlight">
                  {SERENA_PRODUCT.olfactoryFamily}
                </dd>
              </div>
              <div className="rounded-xl border border-silver/12 bg-abyss/60 p-4">
                <dt className="text-[10px] tracking-[0.2em] text-mist uppercase">
                  Concentração
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-starlight">
                  {SERENA_PRODUCT.concentration}
                </dd>
              </div>
            </dl>

            {/* Descrição Sensorial */}
            <div className="mt-7 space-y-4">
              {SERENA_PRODUCT.sensoryDescription.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-[1.8] font-light text-mist sm:text-[0.98rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Selos Éticos */}
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {SERENA_PRODUCT.badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-mauve/25 bg-plum/55 px-3.5 py-1.5 text-xs font-normal text-serena-dew"
                >
                  <Check size={13} className="text-mauve" aria-hidden="true" />
                  <span>{badge}</span>
                </li>
              ))}
            </ul>

            {/* Ações */}
            <div className="mt-8 flex flex-col items-stretch gap-3.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <MagnetButton
                href={SERENA_PRODUCT.ctaHref}
                variant="primary"
                onClick={(event) => handleAnchor(event, SERENA_PRODUCT.ctaHref)}
                wrapperClassName="w-full sm:w-auto"
                className="w-full px-7 text-xs tracking-[0.16em] uppercase sm:w-auto"
              >
                <span>{SERENA_PRODUCT.ctaLabel}</span>
                <ArrowUpRight size={15} className="shrink-0" aria-hidden="true" />
              </MagnetButton>

              <MagnetButton
                href={SERENA_PRODUCT.secondaryCtaHref}
                variant="secondary"
                onClick={(event) => handleAnchor(event, SERENA_PRODUCT.secondaryCtaHref)}
                wrapperClassName="w-full sm:w-auto"
                className="w-full px-6 text-xs tracking-[0.16em] uppercase sm:w-auto"
              >
                <FileText size={14} className="shrink-0" aria-hidden="true" />
                <span>{SERENA_PRODUCT.secondaryCtaLabel}</span>
              </MagnetButton>
            </div>
          </div>
        </div>

        {/* ===================================================================
            PARTE B: Pirâmide Olfativa Interativa: 3 Tempos da Lavanda Francesa Pura (5%)
           =================================================================== */}
        <div className="mt-20 sm:mt-24 lg:mt-32">
          <SpotlightCard className="bg-abyss/82 p-5 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center">
              {/* Controles + Diagrama Geométrico da Pirâmide */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] text-mauve uppercase sm:tracking-[0.24em]">
                  <Droplets size={14} className="shrink-0" aria-hidden="true" />
                  <span>Mono-Essência • 5% Lavanda Francesa</span>
                </div>

                <h3 className="mt-3 font-display text-3xl font-medium text-starlight sm:text-4xl">
                  Pirâmide Olfativa
                </h3>

                <p className="mt-3 text-sm leading-relaxed font-light text-mist">
                  Acompanhe a evolução autêntica da Lavanda Francesa pura em três tempos, da abertura herbal luminosa ao fundo balsâmico limpo.
                </p>

                {/* Seletor de Abas com Framer Motion layoutId */}
                <div
                  role="tablist"
                  aria-label="Níveis da pirâmide olfativa"
                  className="mt-6 inline-flex w-full rounded-full border border-silver/18 bg-midnight/95 p-1 sm:mt-7 sm:w-auto sm:p-1.5"
                >
                  {SERENA_PRODUCT.olfactoryPyramid.map((level) => {
                    const isSelected = level.id === activeNoteId;
                    return (
                      <button
                        key={level.id}
                        type="button"
                        role="tab"
                        id={`olfactory-tab-${level.id}`}
                        aria-selected={isSelected}
                        aria-controls={`olfactory-panel-${level.id}`}
                        onClick={() => setActiveNoteId(level.id)}
                        className={[
                          'relative min-h-[44px] flex-1 cursor-pointer rounded-full px-2.5 py-2.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors sm:flex-none sm:px-5 sm:text-xs sm:tracking-[0.16em]',
                          isSelected ? 'text-abyss' : 'text-mist hover:text-starlight',
                        ].join(' ')}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="olfactory-active-pill"
                            className="absolute inset-0 rounded-full bg-silver"
                            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{level.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Representação Visual Minimalista da Pirâmide */}
                <div aria-hidden="true" className="mt-7 flex flex-col items-center gap-2.5 sm:mt-8">
                  {SERENA_PRODUCT.olfactoryPyramid.map((level, index) => {
                    const widths = ['w-2/5', 'w-3/4', 'w-full'];
                    const isSelected = level.id === activeNoteId;
                    return (
                      <div
                        key={level.id}
                        className={[
                          'flex h-9 items-center justify-center rounded-full border text-[11px] tracking-[0.18em] uppercase transition-[background-color,border-color,color,box-shadow] duration-300 sm:tracking-[0.2em]',
                          widths[index],
                          isSelected
                            ? 'border-mauve/65 bg-plum/80 text-serena-pearl shadow-[0_0_24px_rgba(155,111,199,0.34)]'
                            : 'border-silver/14 bg-midnight/60 text-mist/80',
                        ].join(' ')}
                      >
                        {level.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Painel Animado da Nota Selecionada */}
              <div className="lg:col-span-7 lg:border-l lg:border-silver/14 lg:pl-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLevel.id}
                    id={`olfactory-panel-${activeLevel.id}`}
                    role="tabpanel"
                    aria-labelledby={`olfactory-tab-${activeLevel.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-silver/14 pb-4">
                      <span className="text-[11px] font-medium tracking-[0.24em] text-mauve uppercase">
                        {activeLevel.label} • {activeLevel.stage}
                      </span>
                      <span className="rounded-full border border-silver/16 bg-midnight/85 px-3 py-1 font-mono text-xs text-serena-dew">
                        {activeLevel.timing}
                      </span>
                    </div>

                    <p className="mt-6 font-display text-3xl italic text-serena-pearl sm:text-[2.1rem]">
                      “{activeLevel.mood}”
                    </p>

                    <p className="mt-4 text-sm leading-[1.82] font-light text-mist sm:text-base">
                      {activeLevel.description}
                    </p>

                    <div className="mt-7">
                      <p className="text-[11px] tracking-[0.22em] text-mist uppercase">
                        Facetas da Lavanda Francesa
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {activeLevel.notes.map((note) => (
                          <li
                            key={note}
                            className="flex items-center gap-2.5 rounded-xl border border-silver/15 bg-midnight/85 px-4 py-3.5 text-sm font-normal text-starlight"
                          >
                            <ActiveNoteIcon
                              size={13}
                              className="shrink-0 text-mauve"
                              aria-hidden="true"
                            />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* ===================================================================
            PARTE C: Ficha Técnica Profissional (#ficha-tecnica)
            - Menus posturados e separados
            - 2 colunas distantes como fatos independentes + último item ímpar centralizado
           =================================================================== */}
        <div id="ficha-tecnica" className="mt-24 scroll-mt-24 lg:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-[1px] w-8 bg-mauve/75" aria-hidden="true" />
              <span className="text-[11px] font-medium tracking-[0.26em] text-mauve uppercase">
                {TECHNICAL_SHEET_HEADER.eyebrow}
              </span>
              <span className="h-[1px] w-8 bg-mauve/75" aria-hidden="true" />
            </div>

            <h2 className="mt-4 font-display text-4xl font-medium text-starlight sm:text-5xl">
              {TECHNICAL_SHEET_HEADER.title}
            </h2>

            <p className="mt-3 text-base font-light text-mist">
              {TECHNICAL_SHEET_HEADER.subtitle}
            </p>
          </div>

          {/* Menus de Categoria Posturados e Separados (grid limpo no mobile, linha centrada no desktop) */}
          <div
            role="tablist"
            aria-label="Filtrar especificações da ficha técnica"
            className="mt-9 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 md:gap-5"
          >
            {specTabs.map((tab, index) => {
              const isSelected = tab === activeSpecTab;
              const tabId = `tech-tab-${index}`;
              const count = getTabCount(tab);

              return (
                <button
                  key={tab}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="tech-specs-tabpanel"
                  onClick={() => setActiveSpecTab(tab)}
                  className={[
                    'relative inline-flex min-h-[46px] w-full cursor-pointer items-center justify-between gap-2.5 rounded-full border px-5 py-3 text-xs font-medium tracking-[0.12em] uppercase transition-[border-color,color,box-shadow,background-color] duration-300 sm:w-auto sm:justify-center sm:px-6 sm:tracking-[0.14em]',
                    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-mauve',
                    isSelected
                      ? 'border-mauve/70 text-starlight shadow-[0_14px_32px_-16px_rgba(155,111,199,0.65)]'
                      : 'border-silver/18 bg-abyss/65 text-mist hover:border-mauve/40 hover:bg-midnight/85 hover:text-starlight',
                  ].join(' ')}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="tech-tab-indicator"
                      className="absolute inset-0 rounded-full bg-plum/90"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 text-left sm:text-center">{tab}</span>
                  <span
                    className={[
                      'relative z-10 inline-flex h-5 min-w-[22px] shrink-0 items-center justify-center rounded-full px-1.5 font-mono text-[10px]',
                      isSelected
                        ? 'bg-silver/20 text-serena-pearl'
                        : 'bg-midnight/80 text-mist',
                    ].join(' ')}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 2 Colunas Distantes de Fatos Independentes + Último Item Ímpar Centralizado */}
          <AnimatePresence mode="wait">
            <motion.dl
              key={activeSpecTab}
              id="tech-specs-tabpanel"
              role="tabpanel"
              aria-labelledby={`tech-tab-${specTabs.indexOf(activeSpecTab)}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 grid grid-cols-1 gap-x-10 gap-y-5 sm:mt-12 sm:gap-y-6 md:grid-cols-2 lg:gap-x-16 lg:gap-y-8"
            >
              {filteredSpecs.map((spec, index) => {
                const isCenteredLast = isOddCount && index === filteredSpecs.length - 1;
                const factNumber = String(index + 1).padStart(2, '0');

                return (
                  <div
                    key={spec.id}
                    className={[
                      'group relative flex flex-col justify-between rounded-2xl border border-silver/15 bg-abyss/82 p-5 shadow-[0_22px_52px_-28px_rgba(4,2,10,0.92)] transition-[border-color,background-color] duration-300 hover:border-mauve/42 hover:bg-midnight/90 sm:p-7',
                      isCenteredLast
                        ? 'md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-1.25rem)] lg:max-w-[calc(50%-2rem)]'
                        : '',
                    ].join(' ')}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-silver/12 pb-3.5">
                        <span className="font-display text-lg italic text-mauve">
                          {factNumber}
                        </span>
                        <span className="shrink-0 rounded-full border border-silver/14 bg-plum/45 px-3 py-1 text-[10px] tracking-[0.14em] text-serena-dew uppercase sm:tracking-[0.16em]">
                          {spec.category}
                        </span>
                      </div>

                      <dt className="mt-4 font-display text-2xl font-medium text-starlight sm:text-[1.65rem]">
                        {spec.label}
                      </dt>

                      <dd className="mt-2.5 text-sm leading-[1.8] font-light text-mist sm:text-[0.96rem]">
                        {spec.specification}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </motion.dl>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
