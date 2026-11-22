import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Gift,
  Instagram,
  Mail,
  MessageCircle,
  Moon,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { CONTACT_INFO } from '@/data/content';
import type { ContactChannel } from '@/data/content';
import { MagnetButton } from './MagnetButton';
import { SpotlightCard } from './SpotlightCard';

const COOLDOWN_STORAGE_KEY = 'brisa_noturna_contact_cooldown_until';
const COOLDOWN_SECONDS = 60;

interface FormState {
  name: string;
  contact: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

function getChannelIcon(id: ContactChannel['id']) {
  switch (id) {
    case 'email':
      return Mail;
    case 'instagram':
      return Instagram;
    case 'whatsapp':
      return MessageCircle;
    case 'hours':
      return Clock;
  }
}

const CARE_PROOF_ICONS = [Sparkles, Gift, Moon] as const;

function isValidContactValue(value: string): boolean {
  const trimmed = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (emailRegex.test(trimmed)) return true;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

function getRemainingCooldownSeconds(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (!raw) return 0;
    const until = Number(raw);
    if (!Number.isFinite(until)) return 0;
    const diff = Math.ceil((until - Date.now()) / 1000);
    return diff > 0 ? diff : 0;
  } catch {
    return 0;
  }
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyTimerRef = useRef<number | null>(null);
  const submitTimerRef = useRef<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    contact: '',
    interest: CONTACT_INFO.form.interestChoices[0]?.value ?? CONTACT_INFO.form.interestOptions[0],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(() =>
    getRemainingCooldownSeconds()
  );

  // Pausa animações contínuas (shimmer/ping) quando a seção está fora da viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Limpeza de timers ao desmontar
  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const interval = window.setInterval(() => {
      const remaining = getRemainingCooldownSeconds();
      setCooldownSeconds(remaining);
      if (remaining <= 0) {
        window.clearInterval(interval);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [cooldownSeconds]);

  const handleCopyEmail = async (emailValue: string) => {
    try {
      await navigator.clipboard.writeText(emailValue);
      setCopiedEmail(true);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = window.setTimeout(() => {
        copyTimerRef.current = null;
        setCopiedEmail(false);
      }, 2400);
    } catch {
      // Fallback silencioso caso clipboard não seja permitido pelo navegador
      setCopiedEmail(false);
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome com pelo menos 2 caracteres.';
    }
    if (!isValidContactValue(form.contact)) {
      nextErrors.contact = 'Informe um e-mail válido ou WhatsApp com DDD.';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Escreva uma breve mensagem (mínimo de 10 caracteres).';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const remaining = getRemainingCooldownSeconds();
    if (remaining > 0) {
      setCooldownSeconds(remaining);
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    if (submitTimerRef.current !== null) {
      window.clearTimeout(submitTimerRef.current);
    }

    submitTimerRef.current = window.setTimeout(() => {
      submitTimerRef.current = null;
      try {
        const until = Date.now() + COOLDOWN_SECONDS * 1000;
        window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(until));
      } catch {
        // Fallback gracioso caso localStorage esteja restrito
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setCooldownSeconds(COOLDOWN_SECONDS);
      setForm({
        name: '',
        contact: '',
        interest:
          CONTACT_INFO.form.interestChoices[0]?.value ?? CONTACT_INFO.form.interestOptions[0],
        message: '',
      });
    }, 520);
  };

  const isCoolingDown = cooldownSeconds > 0;
  const secondaryChannels = CONTACT_INFO.channels.filter((ch) => ch.id !== 'whatsapp');

  return (
    <section
      id="contato"
      ref={sectionRef}
      className={[
        'section-velvet section-ambient-glow relative py-20 sm:py-28 lg:py-36',
        !isInView ? 'anim-paused' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div aria-hidden="true" className="divider-lunar absolute inset-x-0 top-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Cabeçalho de Conversão & Disponibilidade do Lote */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-mauve/35 bg-plum/55 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.12em] text-serena-pearl uppercase sm:gap-2.5 sm:px-4 sm:text-[11px] sm:tracking-[0.2em]">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mauve opacity-65" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-serena-pearl" />
            </span>
            <span>{CONTACT_INFO.badge}</span>
          </div>

          <h2 className="mt-5 font-display text-[2.1rem] leading-[1.08] font-medium text-starlight sm:text-5xl lg:text-[3.5rem]">
            {CONTACT_INFO.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed font-light text-mist sm:text-lg">
            {CONTACT_INFO.subtitle}
          </p>

          <p className="mt-3 font-display text-xl italic text-serena-dew">
            {CONTACT_INFO.atelierPromise}
          </p>
        </div>

        {/* 3 Provas de Cuidado do Atelier */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {CONTACT_INFO.careProofs.map((proof, index) => {
            const Icon = CARE_PROOF_ICONS[index] ?? Sparkles;
            return (
              <div
                key={proof.title}
                className="flex items-start gap-3.5 rounded-2xl border border-silver/14 bg-abyss/65 p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-mauve/30 bg-plum/55 text-serena-pearl">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-starlight">{proof.title}</p>
                  <p className="mt-1 text-xs leading-relaxed font-light text-mist">
                    {proof.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid Principal: Canais Diretos + Formulário Interativo */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Coluna Esquerda: Card Hero WhatsApp Shimmer + Canais Spotlight */}
          <div className="space-y-4 lg:col-span-5">
            {/* Card Hero de Reserva Rápida no WhatsApp */}
            <SpotlightCard
              spotlightColor="rgba(198, 164, 230, 0.22)"
              className="border-mauve/35 bg-gradient-to-br from-royal-night via-plum/70 to-abyss p-6 sm:p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-mauve uppercase">
                  <MessageCircle size={14} aria-hidden="true" />
                  <span>Canal Prioritário</span>
                </span>
                <span className="rounded-full border border-silver/20 bg-abyss/65 px-2.5 py-0.5 text-[10px] tracking-[0.16em] text-serena-pearl uppercase">
                  Resposta Ágil
                </span>
              </div>

              <h3 className="mt-4 font-display text-3xl leading-tight font-medium text-starlight">
                Atendimento direto com o atelier
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed font-light text-mist">
                {CONTACT_INFO.whatsappQuickCta.sublabel}. Reserve Serena 200 ml (Lavanda Francesa 5%) com 1 clique.
              </p>

              <a
                href={CONTACT_INFO.whatsappQuickCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-silver px-4 py-3 text-center text-[11px] font-semibold tracking-[0.12em] text-abyss uppercase shadow-[0_16px_40px_-14px_rgba(228,223,240,0.48)] transition-[background-color,transform] duration-300 hover:bg-serena-pearl active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:text-xs sm:tracking-[0.16em]"
              >
                <MessageCircle size={16} className="shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.whatsappQuickCta.label}</span>
                <ArrowUpRight size={15} className="shrink-0" aria-hidden="true" />
              </a>
            </SpotlightCard>

            {/* Demais Canais em SpotlightCard (E-mail com Copiar, Instagram, Horário) */}
            {secondaryChannels.map((channel) => {
              const Icon = getChannelIcon(channel.id);
              const isExternal = channel.href?.startsWith('http');
              const isEmail = channel.id === 'email';

              return (
                <SpotlightCard key={channel.id} className="bg-abyss/72">
                  <div className="flex flex-col justify-between gap-3.5 p-4 min-[480px]:flex-row min-[480px]:items-start sm:p-5">
                    <div className="flex min-w-0 items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-silver/16 bg-plum/50 text-silver transition-colors group-hover:border-mauve/55 group-hover:text-serena-pearl">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium tracking-[0.2em] text-mauve uppercase">
                          {channel.label}
                        </p>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 break-all text-sm font-normal text-starlight transition-colors hover:text-serena-pearl sm:min-h-0 sm:text-base"
                          >
                            <span>{channel.value}</span>
                            {isExternal && (
                              <ArrowUpRight
                                size={14}
                                className="shrink-0 text-mist"
                                aria-hidden="true"
                              />
                            )}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-normal text-starlight sm:text-base">
                            {channel.value}
                          </p>
                        )}
                        <p className="mt-1 text-xs font-light text-mist">{channel.helper}</p>
                      </div>
                    </div>

                    {isEmail && (
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(channel.value)}
                        aria-label={
                          copiedEmail
                            ? 'E-mail copiado para a área de transferência'
                            : 'Copiar e-mail do atelier'
                        }
                        className={[
                          'inline-flex min-h-[44px] w-full shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors min-[480px]:w-auto',
                          copiedEmail
                            ? 'border-mauve/70 bg-plum/85 text-serena-pearl'
                            : 'border-silver/18 bg-midnight/85 text-mist hover:border-mauve/45 hover:text-starlight',
                        ].join(' ')}
                      >
                        {copiedEmail ? (
                          <>
                            <Check size={13} aria-hidden="true" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} aria-hidden="true" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>

          {/* Coluna Direita: Formulário Premium com Seletor Visual de Assunto */}
          <div className="lg:col-span-7">
            <div className="rounded-[1.75rem] lunar-glass-strong p-5 sm:rounded-[2rem] sm:p-9 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-silver/12 pb-5">
                <div>
                  <h3 className="font-display text-3xl font-medium text-starlight">
                    {CONTACT_INFO.form.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed font-light text-mist">
                    {CONTACT_INFO.form.description}
                  </p>
                </div>
              </div>

              {/* Feedback de Sucesso */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    role="status"
                    aria-live="polite"
                    className="mt-6 rounded-2xl border border-mauve/45 bg-plum/55 p-5"
                  >
                    <div className="flex items-start gap-3.5">
                      <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-serena-pearl"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-display text-xl font-medium text-serena-pearl">
                          {CONTACT_INFO.form.successTitle}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed font-light text-mist">
                          {CONTACT_INFO.form.successMessage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Aviso de Rate Limit (Cooldown 60s) */}
              {isCoolingDown && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-silver/18 bg-abyss/80 px-4 py-3 text-xs text-serena-dew"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={15} className="shrink-0 text-mauve" aria-hidden="true" />
                    <span>{CONTACT_INFO.form.cooldownMessage}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-mauve/45 bg-plum/65 px-2.5 py-1 font-mono text-[11px] text-serena-pearl">
                    {cooldownSeconds}s
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
                {/* Seletor Visual Interativo de Assunto (Substitui <select> nativo) */}
                <fieldset>
                  <legend className="mb-3 block text-xs font-medium tracking-[0.14em] text-serena-dew uppercase">
                    {CONTACT_INFO.form.interestLabel}
                  </legend>
                  <div
                    role="radiogroup"
                    aria-label={CONTACT_INFO.form.interestLabel}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    {CONTACT_INFO.form.interestChoices.map((choice) => {
                      const isSelected = form.interest === choice.value;
                      return (
                        <button
                          key={choice.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, interest: choice.value }))
                          }
                          className={[
                            'relative flex min-h-[68px] cursor-pointer flex-col items-start justify-center rounded-2xl border px-4 py-3 text-left transition-[border-color,background-color] duration-300',
                            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mauve',
                            isSelected
                              ? 'border-mauve/70 text-starlight'
                              : 'border-silver/14 bg-abyss/65 text-mist hover:border-silver/30 hover:bg-abyss/90 hover:text-starlight',
                          ].join(' ')}
                        >
                          {isSelected && (
                            <motion.span
                              layoutId="contact-interest-active"
                              className="absolute inset-0 rounded-2xl bg-plum/75 shadow-[0_12px_28px_-16px_rgba(155,111,199,0.55)]"
                              transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                            />
                          )}
                          <div className="relative z-10 flex w-full items-center justify-between gap-2">
                            <span className="text-sm font-medium text-starlight">
                              {choice.label}
                            </span>
                            <span
                              aria-hidden="true"
                              className={[
                                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                                isSelected
                                  ? 'border-serena-pearl bg-silver text-abyss'
                                  : 'border-silver/25',
                              ].join(' ')}
                            >
                              {isSelected && <Check size={10} strokeWidth={3} />}
                            </span>
                          </div>
                          <span className="relative z-10 mt-1 text-xs font-light text-mist">
                            {choice.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-medium tracking-[0.14em] text-serena-dew uppercase"
                    >
                      {CONTACT_INFO.form.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, name: event.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder={CONTACT_INFO.form.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="min-h-[48px] w-full rounded-xl border border-silver/18 bg-abyss/80 px-4 py-3 text-base text-starlight placeholder:text-mist/75 transition-[border-color,box-shadow] focus:border-mauve focus:shadow-[0_0_0_3px_rgba(155,111,199,0.22)] focus:outline-none sm:text-sm"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-mauve"
                      >
                        <AlertCircle size={13} aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* WhatsApp ou E-mail */}
                  <div>
                    <label
                      htmlFor="contact-channel"
                      className="mb-2 block text-xs font-medium tracking-[0.14em] text-serena-dew uppercase"
                    >
                      {CONTACT_INFO.form.emailLabel}
                    </label>
                    <input
                      id="contact-channel"
                      name="contact"
                      type="text"
                      autoComplete="email"
                      value={form.contact}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, contact: event.target.value }));
                        if (errors.contact)
                          setErrors((prev) => ({ ...prev, contact: undefined }));
                      }}
                      placeholder={CONTACT_INFO.form.emailPlaceholder}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'contact-channel-error' : undefined}
                      className="min-h-[48px] w-full rounded-xl border border-silver/18 bg-abyss/80 px-4 py-3 text-base text-starlight placeholder:text-mist/75 transition-[border-color,box-shadow] focus:border-mauve focus:shadow-[0_0_0_3px_rgba(155,111,199,0.22)] focus:outline-none sm:text-sm"
                    />
                    {errors.contact && (
                      <p
                        id="contact-channel-error"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-mauve"
                      >
                        <AlertCircle size={13} aria-hidden="true" />
                        <span>{errors.contact}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-medium tracking-[0.14em] text-serena-dew uppercase"
                  >
                    {CONTACT_INFO.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={(event) => {
                      setForm((prev) => ({ ...prev, message: event.target.value }));
                      if (errors.message)
                        setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder={CONTACT_INFO.form.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className="w-full resize-y rounded-xl border border-silver/18 bg-abyss/80 px-4 py-3 text-base leading-relaxed text-starlight placeholder:text-mist/75 transition-[border-color,box-shadow] focus:border-mauve focus:shadow-[0_0_0_3px_rgba(155,111,199,0.22)] focus:outline-none sm:text-sm"
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-mauve"
                    >
                      <AlertCircle size={13} aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                  <p className="max-w-xs text-xs leading-relaxed font-light text-mist/90">
                    {CONTACT_INFO.form.privacyNote}
                  </p>

                  <MagnetButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting || isCoolingDown}
                    wrapperClassName="w-full sm:w-auto"
                    className="btn-shimmer w-full px-6 text-xs font-semibold tracking-[0.14em] uppercase disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto sm:px-7 sm:tracking-[0.16em]"
                  >
                    <Send size={14} className="shrink-0" aria-hidden="true" />
                    <span>
                      {isSubmitting
                        ? CONTACT_INFO.form.submittingLabel
                        : isCoolingDown
                          ? `Aguarde ${cooldownSeconds}s`
                          : CONTACT_INFO.form.submitLabel}
                    </span>
                  </MagnetButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
