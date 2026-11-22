import { ArrowUp } from 'lucide-react';
import { BRAND } from '@/data/content';
import { LunarMark } from './LunarMark';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleAnchor = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <footer className="relative bg-abyss pt-16 pb-12">
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12 lg:items-end">
          {/* Marca & Manifesto */}
          <div className="lg:col-span-6">
            <a
              href="#inicio"
              onClick={(event) => handleAnchor(event, '#inicio')}
              className="inline-flex items-center gap-3 text-starlight transition-colors hover:text-serena-pearl"
            >
              <LunarMark size={24} className="shrink-0 text-silver sm:h-[26px] sm:w-[26px]" />
              <span className="font-display text-xl font-medium tracking-[0.2em] sm:text-2xl sm:tracking-[0.26em]">
                {BRAND.nameUpper}
              </span>
            </a>

            <p className="mt-4 max-w-md font-display text-xl leading-relaxed italic text-serena-dew">
              {BRAND.manifesto}
            </p>

            <p className="mt-3 text-xs tracking-[0.18em] text-mist/90 uppercase">
              {BRAND.origin} • {BRAND.editionLabel}
            </p>
          </div>

          {/* Navegação Rápida */}
          <div className="flex flex-col items-start gap-6 lg:col-span-6 lg:items-end">
            <nav aria-label="Navegação de rodapé">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {BRAND.navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => handleAnchor(event, link.href)}
                      className="inline-flex min-h-[44px] items-center text-xs tracking-[0.16em] text-mist uppercase transition-colors hover:text-serena-pearl"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => onNavigate('#inicio')}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-silver/16 bg-midnight/75 px-4 py-2 text-xs tracking-[0.16em] text-silver uppercase transition-colors hover:border-mauve/45 hover:text-starlight"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp size={14} aria-hidden="true" />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-silver/10 pt-6 text-xs text-mist/85 sm:flex-row sm:items-center">
          <p>{BRAND.footerNote}</p>
          <p>
            © {BRAND.year} {BRAND.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
