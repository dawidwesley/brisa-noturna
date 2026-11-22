import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { BRAND } from '@/data/content';
import { LunarMark } from './LunarMark';

const OBSERVED_SECTION_IDS = [
  'inicio',
  'sobre',
  'jornada',
  'ritual',
  'serena',
  'ficha-tecnica',
  'faq',
  'contato',
] as const;

interface NavbarProps {
  onNavigate: (href: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const maxScrollRef = useRef<number>(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Barra de progresso via DOM direto + detecção leve de scroll (zero re-render no App)
  useEffect(() => {
    let rafId = 0;

    const recalcMaxScroll = () => {
      maxScrollRef.current = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    const syncScroll = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScrollRef.current));

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      const scrolled = scrollTop > 28;
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
    };

    const handleScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(syncScroll);
      }
    };

    const handleResize = () => {
      recalcMaxScroll();
      handleScroll();
    };

    recalcMaxScroll();
    syncScroll();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            recalcMaxScroll();
            handleScroll();
          })
        : null;

    resizeObserver?.observe(document.documentElement);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Detecção da seção ativa via IntersectionObserver (zero getBoundingClientRect no scroll)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const elements = OBSERVED_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection((prev) =>
              prev === entry.target.id ? prev : entry.target.id
            );
          }
        }
      },
      {
        rootMargin: '-28% 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMobileOpen(false);
    onNavigate(href);
  };

  return (
    <>
      {/* Barra fina de progresso de leitura lunar no topo da viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[2px] bg-silver/10"
        style={{ zIndex: 'var(--z-progress)' }}
      >
        <div
          ref={progressBarRef}
          className="h-full origin-left bg-gradient-to-r from-lavender via-mauve to-serena-pearl will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <header
        className="fixed inset-x-0 top-0 px-3 pt-3 sm:px-6 md:pt-4"
        style={{ zIndex: 'var(--z-navbar)' }}
      >
        <nav
          aria-label="Navegação principal"
          className={[
            'mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full px-3.5 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6 sm:py-2.5',
            isScrolled
              ? 'lunar-glass-strong border-silver/16 shadow-[0_20px_50px_-20px_rgba(4,2,10,0.92)]'
              : 'lunar-glass border-silver/10',
          ].join(' ')}
        >
          {/* Assinatura da Marca */}
          <a
            href="#inicio"
            onClick={(event) => handleLinkClick(event, '#inicio')}
            className="group flex min-h-[44px] min-w-0 items-center gap-2 rounded-full pr-1.5 text-starlight transition-colors hover:text-serena-pearl sm:gap-2.5 sm:pr-2"
            aria-label="Brisa Noturna — Voltar ao início"
          >
            <LunarMark
              size={20}
              className="shrink-0 text-silver transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:text-mauve sm:h-[22px] sm:w-[22px]"
            />
            <span className="whitespace-nowrap font-display text-sm font-medium tracking-[0.16em] text-starlight min-[375px]:text-base min-[375px]:tracking-[0.22em] sm:text-lg sm:tracking-[0.24em]">
              {BRAND.nameUpper}
            </span>
          </a>

          {/* Links Desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            {BRAND.navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={[
                      'relative inline-flex min-h-[44px] items-center px-3.5 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300',
                      isActive ? 'text-starlight' : 'text-mist hover:text-starlight',
                    ].join(' ')}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute inset-x-4 bottom-1.5 h-[1.5px] rounded-full bg-gradient-to-r from-lavender via-mauve to-silver"
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA Desktop + Toggle Mobile */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="#contato"
              onClick={(event) => handleLinkClick(event, '#contato')}
              className="hidden min-h-[44px] items-center rounded-full border border-silver/25 bg-silver/12 px-4 py-2 text-xs font-medium tracking-[0.14em] text-serena-pearl uppercase transition-[background-color,border-color,color] duration-300 hover:border-serena-pearl/50 hover:bg-silver hover:text-abyss md:inline-flex"
            >
              Reservar Serena
            </a>

            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-silver/15 bg-midnight/80 text-silver transition-colors hover:border-mauve/45 hover:text-starlight lg:hidden"
            >
              {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu Mobile Acessível */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop para fechar ao tocar fora */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-abyss/65 lg:hidden"
              style={{ zIndex: 'calc(var(--z-overlay) - 1)' }}
            />

            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[74px] max-h-[calc(100dvh-90px)] overflow-y-auto rounded-3xl lunar-glass-strong p-5 sm:inset-x-4 sm:p-6 lg:hidden"
              style={{ zIndex: 'var(--z-overlay)' }}
              role="dialog"
              aria-label="Menu de navegação móvel"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-silver/12 pb-3">
                <span className="text-[11px] tracking-[0.2em] text-mauve uppercase">
                  {BRAND.editionLabel}
                </span>
                <span className="text-xs text-mist">{BRAND.origin}</span>
              </div>

              <ul className="flex flex-col gap-1">
                {BRAND.navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => handleLinkClick(event, link.href)}
                        className={[
                          'flex min-h-[48px] items-center justify-between rounded-xl px-4 text-sm tracking-[0.12em] uppercase transition-colors',
                          isActive
                            ? 'bg-plum/70 text-starlight'
                            : 'text-mist hover:bg-plum/40 hover:text-starlight',
                        ].join(' ')}
                      >
                        <span>{link.label}</span>
                        <span
                          aria-hidden="true"
                          className={[
                            'h-1.5 w-1.5 rounded-full',
                            isActive ? 'bg-mauve' : 'bg-silver/25',
                          ].join(' ')}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 border-t border-silver/12 pt-4">
                <a
                  href="#contato"
                  onClick={(event) => handleLinkClick(event, '#contato')}
                  className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-silver px-5 text-xs font-medium tracking-[0.16em] text-abyss uppercase transition-colors hover:bg-serena-pearl"
                >
                  Reservar Serena
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
