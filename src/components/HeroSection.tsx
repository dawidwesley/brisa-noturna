import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { HERO, IMAGE_ASSETS } from '@/data/content';
import { MagnetButton } from './MagnetButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bottleFrameRef = useRef<HTMLDivElement>(null);
  const bottleImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    if (!section || !titleEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    let split: SplitType | null = null;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      split = new SplitType(titleEl, { types: 'words,chars' });

      const entryTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      entryTimeline
        .from('[data-hero-badge]', {
          opacity: 0,
          y: 16,
          duration: 0.7,
        })
        .from(
          split.chars ?? split.words ?? titleEl,
          {
            opacity: 0,
            y: 26,
            duration: 0.85,
            stagger: 0.018,
          },
          '-=0.45'
        )
        .from(
          '[data-hero-copy]',
          {
            opacity: 0,
            y: 22,
            duration: 0.8,
            stagger: 0.1,
          },
          '-=0.55'
        )
        .from(
          bottleFrameRef.current,
          {
            opacity: 0,
            y: 34,
            scale: 0.96,
            duration: 1.05,
          },
          '-=0.85'
        )
        .from(
          '[data-hero-highlight]',
          {
            opacity: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.08,
          },
          '-=0.65'
        );
    }, section);

    // Paralaxe suave da imagem do frasco Serena apenas em telas >= 768px (evita jitter em touch mobile)
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      if (!bottleImgRef.current) return;
      gsap.to(bottleImgRef.current, {
        yPercent: -10,
        scale: 1.08,
        force3D: true,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
      split?.revert();
    };
  }, []);

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="section-abyss relative flex min-h-screen flex-col justify-between pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16"
    >
      {/* Atmosfera Lunar Ametista Sutil (Gradientes Radiais Puros, zero blur-3xl pesado na GPU) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 'var(--z-ambient)' }}
      >
        <div
          className="absolute -top-28 left-[4%] h-[580px] w-[580px] rounded-full opacity-75"
          style={{
            background:
              'radial-gradient(circle, rgba(155, 111, 199, 0.2) 0%, rgba(38, 21, 64, 0.12) 42%, transparent 72%)',
          }}
        />
        <div
          className="absolute right-[2%] bottom-[6%] h-[520px] w-[520px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(circle, rgba(198, 164, 230, 0.14) 0%, rgba(27, 15, 46, 0.1) 46%, transparent 72%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-44"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #07040D 100%)',
          }}
        />
      </div>

      {/* Conteúdo Principal */}
      <div
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Coluna Editorial Esquerda */}
          <div className="lg:col-span-7">
            <div
              data-hero-badge
              className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-silver/16 bg-midnight/75 px-3.5 py-2 text-[10px] font-medium tracking-[0.14em] text-serena-dew uppercase sm:mb-7 sm:gap-2.5 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]"
            >
              <Sparkles size={13} className="shrink-0 text-mauve" aria-hidden="true" />
              <span>{HERO.badge}</span>
            </div>

            <h1
              ref={titleRef}
              aria-label={HERO.title}
              className="font-display text-[2.35rem] leading-[1.04] font-medium tracking-[-0.015em] text-starlight min-[375px]:text-[2.7rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
            >
              <span className="block">{HERO.titleLines[0]}</span>
              <span className="block italic text-serena-pearl">{HERO.titleLines[1]}</span>
            </h1>

            <p
              data-hero-copy
              className="mt-6 max-w-xl text-base leading-relaxed font-light text-mist sm:mt-7 sm:text-lg sm:leading-[1.72]"
            >
              {HERO.subtitle}
            </p>

            {/* CTAs com MagnetButton */}
            <div
              data-hero-copy
              className="mt-8 flex flex-col items-stretch gap-3.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <MagnetButton
                href={HERO.primaryCta.href}
                variant="primary"
                onClick={(event) => handleAnchor(event, HERO.primaryCta.href)}
                wrapperClassName="w-full sm:w-auto"
                className="w-full px-7 text-xs tracking-[0.16em] uppercase sm:w-auto"
              >
                <span>{HERO.primaryCta.label}</span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </MagnetButton>

              <MagnetButton
                href={HERO.secondaryCta.href}
                variant="secondary"
                onClick={(event) => handleAnchor(event, HERO.secondaryCta.href)}
                wrapperClassName="w-full sm:w-auto"
                className="w-full px-7 text-xs tracking-[0.16em] uppercase sm:w-auto"
              >
                <span>{HERO.secondaryCta.label}</span>
              </MagnetButton>
            </div>

            {/* 3 Micro-Indicadores Editoriais */}
            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-silver/12 pt-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 sm:pt-7">
              {HERO.highlights.map((item) => (
                <div key={item.label} data-hero-highlight className="space-y-1">
                  <p className="text-xs font-medium tracking-[0.12em] text-serena-pearl uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm font-light text-mist">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Fotográfica Direita — Frasco Serena */}
          <div className="lg:col-span-5">
            <div ref={bottleFrameRef} className="relative mx-auto max-w-md lg:ml-auto lg:max-w-none">
              {/* Moldura Principal 3:4 */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] border border-silver/18 bg-midnight shadow-[0_36px_90px_-24px_rgba(4,2,10,0.95)] sm:rounded-[2rem]">
                <img
                  ref={bottleImgRef}
                  src={IMAGE_ASSETS['serena-hero'].src}
                  alt={IMAGE_ASSETS['serena-hero'].alt}
                  width={896}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full scale-[1.03] object-cover object-center md:will-change-transform"
                />
                {/* Vinheta Editorial Fina */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/75 via-transparent to-abyss/20"
                />

                {/* Selo Editorial Inferior Interno */}
                <div className="absolute inset-x-3 bottom-3 rounded-2xl lunar-glass px-3.5 py-3 sm:inset-x-5 sm:bottom-5 sm:px-4 sm:py-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div>
                      <p className="font-display text-xl italic leading-none text-serena-pearl">
                        Serena
                      </p>
                      <p className="mt-1 text-[10px] tracking-[0.16em] text-mist uppercase sm:text-[11px] sm:tracking-[0.18em]">
                        Body Splash • 200 ml • 5%
                      </p>
                    </div>
                    <span className="whitespace-nowrap rounded-full border border-mauve/40 bg-plum/70 px-3 py-1 text-[10px] tracking-[0.12em] text-serena-dew uppercase sm:text-[11px] sm:tracking-[0.14em]">
                      Lavanda Francesa
                    </span>
                  </div>
                </div>
              </div>

              {/* Linha arquitetural sutil */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2 -z-10 rounded-[2.1rem] border border-silver/8 sm:-inset-3 sm:rounded-[2.4rem]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de Scroll Inferior */}
      <div
        className="relative mx-auto mt-12 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:mt-14 lg:px-10"
        style={{ zIndex: 'var(--z-content)' }}
      >
        <a
          href="#sobre"
          onClick={(event) => handleAnchor(event, '#sobre')}
          className="group inline-flex min-h-[44px] items-center gap-3 text-xs tracking-[0.2em] text-mist uppercase transition-colors hover:text-serena-pearl"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-silver/20 transition-colors group-hover:border-mauve/50">
            <ArrowDown
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </span>
          <span>{HERO.scrollHint}</span>
        </a>

        <span className="hidden text-[11px] tracking-[0.24em] text-shadow-star uppercase sm:inline">
          01 — Atmosfera Noturna
        </span>
      </div>
    </section>
  );
}
