import { useState } from 'react';
import { ArrowUpRight, MessageCircle, Plus } from 'lucide-react';
import { CONTACT_INFO, FAQ_HEADER, FAQ_ITEMS } from '@/data/content';

interface FaqSectionProps {
  onNavigate: (href: string) => void;
}

export function FaqSection({ onNavigate }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section-abyss relative py-20 sm:py-28 lg:py-36">
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-mauve/75" aria-hidden="true" />
                <span className="text-[11px] font-medium tracking-[0.26em] text-mauve uppercase">
                  {FAQ_HEADER.eyebrow}
                </span>
              </div>

              <h2 className="mt-4 font-display text-4xl font-medium text-starlight sm:text-5xl">
                {FAQ_HEADER.title}
              </h2>

              <p className="mt-4 max-w-md text-base leading-relaxed font-light text-mist">
                {FAQ_HEADER.subtitle}
              </p>

              <div className="mt-8 rounded-2xl lunar-glass p-6">
                <p className="font-display text-xl italic text-serena-pearl">
                  Ficou com alguma pergunta específica sobre o lote artesanal?
                </p>
                <p className="mt-2 text-sm leading-relaxed font-light text-mist">
                  Nosso atelier responde cada mensagem com cuidado, seja sobre a Lavanda Francesa a 5% ou presentes.
                </p>

                <div className="mt-5 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
                  <a
                    href={CONTACT_INFO.whatsappQuickCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-mauve/45 bg-plum/60 px-4 py-2 text-xs font-medium tracking-[0.14em] text-serena-pearl uppercase transition-colors hover:border-serena-pearl/60 hover:bg-plum"
                  >
                    <MessageCircle size={14} className="shrink-0" aria-hidden="true" />
                    <span>Falar no WhatsApp</span>
                  </a>

                  <a
                    href="#contato"
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate('#contato');
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 px-2 text-xs font-medium tracking-[0.16em] text-silver uppercase transition-colors hover:text-serena-pearl min-[420px]:justify-start"
                  >
                    <span>Formulário</span>
                    <ArrowUpRight size={14} className="shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita — Acordeão CSS Grid Ultra-Suave com Altura Estabilizada */}
          <div className="lg:col-span-7">
            <div className="space-y-3.5 lg:min-h-[650px] xl:min-h-[590px]">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openId === item.id;
                const buttonId = `faq-trigger-${item.id}`;
                const panelId = `faq-panel-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className={[
                      'relative overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-300',
                      isOpen
                        ? 'border-mauve/45 bg-royal-night/75 shadow-[0_18px_44px_-24px_rgba(155,111,199,0.42)]'
                        : 'border-silver/12 bg-midnight/60 hover:border-silver/25 hover:bg-midnight/85',
                    ].join(' ')}
                  >
                    {/* Linha luminosa superior sutil no item aberto */}
                    <span
                      aria-hidden="true"
                      className={[
                        'pointer-events-none absolute inset-x-0 top-0 h-[1.5px] origin-left bg-gradient-to-r from-lavender via-mauve to-serena-pearl transition-[transform,opacity] duration-300',
                        isOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0',
                      ].join(' ')}
                    />

                    <h3 className="m-0">
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex min-h-[68px] w-full cursor-pointer items-center justify-between gap-3.5 px-4 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mauve sm:gap-5 sm:px-6 sm:py-5"
                      >
                        <span className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                          <span
                            className={[
                              'shrink-0 font-display text-lg italic transition-colors',
                              isOpen ? 'text-serena-pearl' : 'text-mauve',
                            ].join(' ')}
                          >
                            0{index + 1}
                          </span>
                          <span
                            className={[
                              'font-display text-lg leading-snug font-medium transition-colors min-[375px]:text-xl sm:text-[1.45rem]',
                              isOpen
                                ? 'text-serena-pearl'
                                : 'text-starlight group-hover:text-serena-pearl',
                            ].join(' ')}
                          >
                            {item.question}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={[
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            isOpen
                              ? 'rotate-45 border-mauve/70 bg-plum/85 text-serena-pearl shadow-[0_0_20px_rgba(198,164,230,0.34)]'
                              : 'border-silver/20 bg-abyss/75 text-silver group-hover:border-mauve/50 group-hover:text-serena-pearl',
                          ].join(' ')}
                        >
                          <Plus size={17} />
                        </span>
                      </button>
                    </h3>

                    {/* Expansão suave via CSS Grid (grid-rows-[0fr] -> grid-rows-[1fr]) */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!isOpen}
                      className={[
                        'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                      ].join(' ')}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={[
                            'px-4 pb-5 text-sm leading-[1.82] font-light text-mist transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:pr-12 sm:pb-6 sm:pl-[3.65rem] sm:text-[0.96rem]',
                            isOpen ? 'translate-y-0' : '-translate-y-1',
                          ].join(' ')}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
