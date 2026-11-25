import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO, IMAGE_ASSETS } from '@/data/content';
import { LunarMark } from './LunarMark';
import { MagnetButton } from './MagnetButton';

interface HeroSectionProps {
  onNavigate: (href: string) => void;
}

const TITLE_LINE_WORDS = HERO.titleLines.map((line) => line.split(' '));

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bottleCardRef = useRef<HTMLDivElement>(null);
  const bottleImgRef = useRef<HTMLImageElement>(null);
  const [isEntered, setIsEntered] = useState(false);
  const [isBottleLoaded, setIsBottleLoaded] = useState(false);

  // Sincroniza estado se a imagem heroica já veio decodificada do preload/cache
  useEffect(() => {
    const img = bottleImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setIsBottleLoaded(true);
    }
  }, []);

  // Entrada harmônica em GPU pura pós-document.fonts.ready (com fallback seguro de 250ms)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsEntered(true);
      return;
    }

    let cancelled = false;
    let rafId = 0;

    const triggerEntrance = () => {
      if (cancelled) return;
      rafId = window.requestAnimationFrame(() => {
        if (!cancelled) {
          setIsEntered(true);
        }
      });
    };

    const fallbackTimer = window.setTimeout(triggerEntrance, 250);

    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          window.clearTimeout(fallbackTimer);
          triggerEntrance();
        })
        .catch(() => {
          // Mantém o fallback de 250ms caso document.fonts rejeite
        });
    } else {
      window.clearTimeout(fallbackTimer);
      triggerEntrance();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Paralaxe vertical sutil do cartão do frasco em desktop sem zoom/corte nas bordas 1:1
  useEffect(() => {
    const section = sectionRef.current;
    const bottleCard = bottleCardRef.current;
    if (!section || !bottleCard) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    let revertMedia: (() => void) | null = null;

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
        .then(([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled || !sectionRef.current || !bottleCardRef.current) return;
          gsap.registerPlugin(ScrollTrigger);

          const mm = gsap.matchMedia();
          mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
            if (!bottleCardRef.current || !sectionRef.current) return;
            gsap.to(bottleCardRef.current, {
              y: -18,
              force3D: true,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
              },
            });
          });

          revertMedia = () => mm.revert();
        })
        .catch(() => {
          // Mantém o Hero íntegro mesmo se a importação diferida falhar
        });
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      revertMedia?.();
    };
  }, []);

  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onNavigate(href);
  };

  let runningWordIndex = 0;

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className={[
        'section-abyss relative flex min-h-screen flex-col justify-between pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16',
        isEntered ? 'hero-entered' : '',
      ]
        .filter(Boolean)
        .join(' ')}
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
              className="hero-reveal mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-silver/16 bg-midnight/75 px-3.5 py-2 text-[10px] font-medium tracking-[0.14em] text-serena-dew uppercase sm:mb-7 sm:gap-2.5 sm:px-4 sm:text-[11px] sm:tracking-[0.22em]"
              style={{ '--hero-delay': '40ms', '--hero-y': '12px' } as CSSProperties}
            >
              <LunarMark size={14} className="shrink-0 text-mauve" />
              <span>{HERO.badge}</span>
            </div>

            <h1
              aria-label={HERO.title}
              className="font-display text-[2.35rem] leading-[1.04] font-medium tracking-[-0.015em] text-starlight min-[375px]:text-[2.7rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]"
            >
              {TITLE_LINE_WORDS.map((words, lineIndex) => (
                <span
                  key={lineIndex}
                  className={lineIndex === 1 ? 'block italic text-serena-pearl' : 'block'}
                >
                  {words.map((word, wordIdx) => {
                    const currentOrder = runningWordIndex++;
                    const delayMs = 90 + currentOrder * 55;
                    return (
                      <span
                        key={`${lineIndex}-${wordIdx}`}
                        className="hero-word"
                        style={{ '--word-delay': `${delayMs}ms` } as CSSProperties}
                      >
                        {word}
                        {wordIdx < words.length - 1 ? '\u00A0' : ''}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p
              className="hero-reveal mt-6 max-w-xl text-base leading-relaxed font-light text-mist sm:mt-7 sm:text-lg sm:leading-[1.72]"
              style={{ '--hero-delay': '260ms', '--hero-y': '16px' } as CSSProperties}
            >
              {HERO.subtitle}
            </p>

            {/* CTAs com MagnetButton */}
            <div
              className="hero-reveal mt-8 flex flex-col items-stretch gap-3.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
              style={{ '--hero-delay': '340ms', '--hero-y': '16px' } as CSSProperties}
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
              {HERO.highlights.map((item, idx) => (
                <div
                  key={item.label}
                  className="hero-reveal space-y-1"
                  style={
                    {
                      '--hero-delay': `${400 + idx * 65}ms`,
                      '--hero-y': '14px',
                    } as CSSProperties
                  }
                >
                  <p className="text-xs font-medium tracking-[0.12em] text-serena-pearl uppercase">
                    {item.label}
                  </p>
                  <p className="text-sm font-light text-mist">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Fotográfica Direita: Frasco Serena (proporção exata 1:1 sem cortes) */}
          <div className="lg:col-span-5">
            <div
              className="hero-reveal relative mx-auto max-w-md lg:ml-auto lg:max-w-none"
              style={
                {
                  '--hero-delay': '140ms',
                  '--hero-y': '24px',
                  '--hero-scale': '0.97',
                  '--hero-dur': '0.9s',
                } as CSSProperties
              }
            >
              <div
                ref={bottleCardRef}
                className="overflow-hidden rounded-[1.75rem] border border-silver/18 bg-[#080410] shadow-[0_36px_90px_-24px_rgba(4,2,10,0.95)] sm:rounded-[2rem] md:will-change-transform"
              >
                {/* Moldura Principal 1:1 integral (1254x1254) sem corte de bordas ou laterais */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#080410]">
                  <img
                    ref={bottleImgRef}
                    src={IMAGE_ASSETS['serena-hero'].src}
                    alt={IMAGE_ASSETS['serena-hero'].alt}
                    width={1254}
                    height={1254}
                    loading="eager"
                    fetchPriority="high"
                    onLoad={() => setIsBottleLoaded(true)}
                    onError={() => setIsBottleLoaded(true)}
                    className={[
                      'h-full w-full object-contain object-center transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      isBottleLoaded ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                  />
                </div>

                {/* Barra Editorial Inferior fora da arte para não cobrir rótulo, reflexo nem lua */}
                <div className="border-t border-silver/14 bg-midnight/90 px-4 py-3.5 sm:px-5 sm:py-4">
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
        className="hero-reveal relative mx-auto mt-12 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:mt-14 lg:px-10"
        style={
          {
            zIndex: 'var(--z-content)',
            '--hero-delay': '480ms',
            '--hero-y': '10px',
          } as CSSProperties
        }
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
          01 · Atmosfera Noturna
        </span>
      </div>
    </section>
  );
}
