export type ImageKey =
  | 'lavender-field'
  | 'lavender-botanical'
  | 'ritual-noturno'
  | 'serena-hero';

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BrandConfig {
  name: string;
  nameUpper: string;
  subtitle: string;
  manifesto: string;
  year: number;
  origin: string;
  editionLabel: string;
  logoPath: string;
  navLinks: NavLink[];
  footerNote: string;
}

export interface HeroHighlight {
  label: string;
  detail: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleLines: [string, string];
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  highlights: [HeroHighlight, HeroHighlight, HeroHighlight];
  scrollHint: string;
}

export interface BrandPillar {
  index: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutStoryBeat {
  index: '01' | '02' | '03';
  label: string;
  text: string;
}

export interface AboutBrandContent {
  eyebrow: string;
  title: string;
  lead: string;
  thesis: string;
  storyBeats: [AboutStoryBeat, AboutStoryBeat, AboutStoryBeat];
  transitionCue: string;
  paragraphs: string[];
  pillars: [BrandPillar, BrandPillar, BrandPillar];
}

export interface JourneyChapter {
  number: '01' | '02' | '03' | '04';
  eyebrow: string;
  title: string;
  text: string;
  detail: string;
  imageKey: ImageKey;
}

export interface SectionHeader {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface RemotionScene {
  id: string;
  act: string;
  title: string;
  caption: string;
  timestamp: string;
  imageKey: ImageKey;
}

export interface RemotionShowcaseContent {
  eyebrow: string;
  title: string;
  description: string;
  closingPhrase: string;
  replayHint: string;
  scenes: [RemotionScene, RemotionScene, RemotionScene];
}

export type OlfactoryLevelId = 'topo' | 'coracao' | 'fundo';

export interface OlfactoryNoteLevel {
  id: OlfactoryLevelId;
  label: string;
  stage: string;
  timing: string;
  mood: string;
  description: string;
  notes: string[];
}

export interface SerenaProductContent {
  eyebrow: string;
  name: string;
  fullName: string;
  subtitle: string;
  volume: string;
  olfactoryFamily: string;
  concentration: string;
  price: string;
  priceNote: string;
  sensoryDescription: string[];
  badges: string[];
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  olfactoryPyramid: [OlfactoryNoteLevel, OlfactoryNoteLevel, OlfactoryNoteLevel];
}

export type TechnicalSpecCategory =
  | 'Especificações'
  | 'Composição & Ética'
  | 'Uso & Conservação';

export interface TechnicalSpecItem {
  id: string;
  category: TechnicalSpecCategory;
  label: string;
  specification: string;
}

export interface RitualStep {
  number: '01' | '02' | '03';
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  duration: string;
  focus: string;
  cue: string;
  imageKey: ImageKey;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactChannel {
  id: 'email' | 'instagram' | 'whatsapp' | 'hours';
  label: string;
  value: string;
  helper: string;
  href?: string;
}

export interface ContactCareProof {
  title: string;
  detail: string;
}

export interface ContactInterestChoice {
  value: string;
  label: string;
  subtitle: string;
}

export interface ContactFormCopy {
  title: string;
  description: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  interestLabel: string;
  interestOptions: string[];
  interestChoices: ContactInterestChoice[];
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successMessage: string;
  cooldownMessage: string;
  privacyNote: string;
}

export interface ContactInfoContent {
  eyebrow: string;
  badge: string;
  title: string;
  subtitle: string;
  atelierPromise: string;
  whatsappQuickCta: {
    label: string;
    sublabel: string;
    href: string;
  };
  careProofs: [ContactCareProof, ContactCareProof, ContactCareProof];
  channels: ContactChannel[];
  form: ContactFormCopy;
}

export const IMAGE_ASSETS: Record<ImageKey, ImageAsset> = {
  'lavender-field': {
    src: '/images/lavender-field-night.jpg',
    alt: 'Campo de Lavanda Francesa em flor sob céu noturno estrelado, lua crescente prateada e névoa suave.',
  },
  'lavender-botanical': {
    src: '/images/lavender-botanical-macro.jpg',
    alt: 'Ramos frescos de Lavanda Francesa (Lavandula angustifolia) com gotículas finas de orvalho prateado sobre fundo escuro.',
  },
  'ritual-noturno': {
    src: '/images/ritual-noturno.jpg',
    alt: 'Mulher em quarto tranquilo à meia-luz borrifando uma névoa fina de Lavanda Francesa antes de dormir.',
  },
  'serena-hero': {
    src: '/images/serena-hero.jpg',
    alt: 'Frasco artesanal em vidro fumê-ametista do Body Splash Serena, da Brisa Noturna, sobre pedra escura úmida com ramos de lavanda.',
  },
};

export const BRAND: BrandConfig = {
  name: 'Brisa Noturna',
  nameUpper: 'BRISA NOTURNA',
  subtitle: 'Perfumaria Artesanal de Atmosfera Noturna',
  manifesto:
    'Fragrâncias feitas à mão para a hora em que a casa silencia, a pele respira e o sono começa a florescer.',
  year: 2026,
  origin: 'Atelier Botânico • Brasil',
  editionLabel: 'Edição de Estreia • v1',
  logoPath: '/images/logo-brisa-noturna.jpg',
  navLinks: [
    { label: 'A Casa', href: '#sobre' },
    { label: 'O Ritual', href: '#ritual' },
    { label: 'Serena', href: '#serena' },
    { label: 'Ficha Técnica', href: '#ficha-tecnica' },
    { label: 'Dúvidas', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ],
  footerNote:
    'Produção artesanal em pequenos lotes. Perfumaria de descanso criada no Brasil.',
};

export const HERO: HeroContent = {
  badge: 'Edição de Estreia • 5% Essência Pura de Lavanda Francesa',
  title: 'Floresça o sono sob o véu da lavanda.',
  titleLines: ['Floresça o sono', 'sob o véu da lavanda.'],
  subtitle:
    'Para noites em que o corpo pede pausa e a mente não desliga: bruma artesanal com 5% de Lavanda Francesa pura que acompanha o ritual da mulher noturna antes de dormir.',
  primaryCta: {
    label: 'Descobrir Serena',
    href: '#serena',
  },
  secondaryCta: {
    label: 'Conhecer o Ritual',
    href: '#ritual',
  },
  highlights: [
    {
      label: 'Lavanda Francesa Pura',
      detail: 'Mono-essência Lavandula angustifolia',
    },
    {
      label: '200 ml • 5% de Essência',
      detail: '21 dias de maceração artesanal',
    },
    {
      label: 'Ritual Pré-Sono',
      detail: 'Pele, colo e lençóis',
    },
  ],
  scrollHint: 'Sinta como a noite desacelera',
};

const ABOUT_THESIS =
  'Quase todo perfume nasce para disputar atenção sob luz forte. A Brisa Noturna existe para o oposto: o instante em que a luz baixa e a pele pede frescor limpo para desacelerar.';

export const ABOUT_BRAND: AboutBrandContent = {
  eyebrow: 'Sobre a Brisa Noturna',
  title: 'Perfumaria artesanal feita para a última hora do dia.',
  lead: 'Quando a casa silencia, mas a mente insiste em continuar acesa.',
  thesis: ABOUT_THESIS,
  storyBeats: [
    {
      index: '01',
      label: 'Pureza sem excessos',
      text: 'Apenas 5% de essência pura de Lavanda Francesa (Lavandula angustifolia), sem notas doces ou barulhentas para cansar o olfato.',
    },
    {
      index: '02',
      label: '21 dias no escuro',
      text: 'Maceração artesanal lenta no atelier brasileiro até a névoa pousar na pele aquecida do banho como bruma fria.',
    },
    {
      index: '03',
      label: 'Permissão para pausar',
      text: 'Um gesto íntimo entre o último pensamento do dia e o primeiro suspiro em lençóis frescos.',
    },
  ],
  transitionCue: 'Do campo sob o luar ao momento em que o peito desacelera',
  paragraphs: [ABOUT_THESIS],
  pillars: [
    {
      index: '01',
      title: 'Alquimia Artesanal',
      subtitle: '5% de essência • 21 dias no escuro',
      description:
        'Álcool de cereais neutro, água purificada e repouso lento que suavizam a saída desde a primeira borrifada.',
    },
    {
      index: '02',
      title: 'Assinatura da Lavanda',
      subtitle: 'Mono-essência Lavandula angustifolia',
      description:
        'Pureza botânica selecionada para aprofundar o relaxamento e aliviar a tensão acumulada antes de dormir.',
    },
    {
      index: '03',
      title: 'Presença de Quarto',
      subtitle: 'Névoa fina e íntima',
      description:
        'Vidro fumê-ametista e rastro rente à pele que acolhem a cabeceira sem pesar no ambiente.',
    },
  ],
};

export const HORIZONTAL_JOURNEY_HEADER: SectionHeader = {
  eyebrow: 'Da Flor ao Repouso',
  title: 'Quatro atos de uma noite serena',
  subtitle:
    'A travessia silenciosa que leva a Lavanda Francesa do campo ao seu gesto de descanso.',
};

export const HORIZONTAL_JOURNEY: [
  JourneyChapter,
  JourneyChapter,
  JourneyChapter,
  JourneyChapter,
] = [
  {
    number: '01',
    eyebrow: 'A Origem sob o Luar',
    title: 'O Campo de Lavanda ao Anoitecer',
    text: 'Quando o ar esfria sobre as fileiras roxas, a Lavanda Francesa revela seu frescor herbal mais limpo. É sob essa calma noturna que nossa única essência começa.',
    detail: 'Lavandula angustifolia • Frescor noturno',
    imageKey: 'lavender-field',
  },
  {
    number: '02',
    eyebrow: 'Ofício sem Pressa',
    title: 'A Colheita & Maceração Lenta',
    text: 'Os 5% de Lavanda Francesa descansam 21 dias no escuro, sem pressa industrial. O tempo arredonda cada nuance até a bruma tocar a pele como seda fria.',
    detail: '5% de essência • 21 dias de maceração',
    imageKey: 'lavender-botanical',
  },
  {
    number: '03',
    eyebrow: 'O Ritual da Mulher Noturna',
    title: 'Desacelerar Antes de Deitar',
    text: 'Entre telas acesas e o peso do dia nos ombros, falta um marco físico para encerrar o expediente interno. A meia-luz e a névoa certa devolvem a noite a você.',
    detail: 'Respiração lenta • Alívio da tensão',
    imageKey: 'ritual-noturno',
  },
  {
    number: '04',
    eyebrow: 'Assinatura Serena',
    title: 'Florescer o Sono',
    text: 'Sobre o colo ainda aquecido do banho e nos lençóis frescos, Serena alonga a respiração com seu rastro limpo e balsâmico. O descanso deixa de ser acaso.',
    detail: 'Pele fresca • Sono profundo',
    imageKey: 'serena-hero',
  },
];

export const REMOTION_SHOWCASE: RemotionShowcaseContent = {
  eyebrow: 'Estudo Cinematográfico • Serena',
  title: 'Uma pausa visual antes do sono',
  description:
    'Do frescor noturno da Lavanda Francesa à bruma fina que prepara a pele para o sono.',
  closingPhrase: 'Floresça o sono. O ritual da mulher noturna.',
  replayHint: 'Clique no quadro para pausar ou rever',
  scenes: [
    {
      id: 'ato-1',
      act: 'Ato I',
      title: 'O campo sob a lua',
      caption: 'A névoa desce sobre a Lavanda Francesa quando a noite finalmente desacelera.',
      timestamp: '00:00 — 00:03',
      imageKey: 'lavender-field',
    },
    {
      id: 'ato-2',
      act: 'Ato II',
      title: 'Orvalho e maceração',
      caption: '5% de essência pura de Lavandula angustifolia em repouso lento por 21 dias.',
      timestamp: '00:03 — 00:07',
      imageKey: 'lavender-botanical',
    },
    {
      id: 'ato-3',
      act: 'Ato III',
      title: 'Serena na pele',
      caption: 'Floresça o sono. O ritual da mulher noturna.',
      timestamp: '00:07 — 00:10',
      imageKey: 'serena-hero',
    },
  ],
};

export const RITUAL_HEADER: SectionHeader = {
  eyebrow: 'O Ritual de 3 Passos',
  title: 'Como a noite ganha leveza',
  subtitle:
    'Três gestos simples para abaixar o volume do dia, aprofundar o relaxamento e convidar o sono com naturalidade.',
};

export const RITUAL_STEPS: [RitualStep, RitualStep, RitualStep] = [
  {
    number: '01',
    eyebrow: 'Primeiro Gesto',
    title: 'Desligar o Ruído',
    summary: 'Banho morno, meia-luz e pausa nas telas.',
    description:
      'Deixe as telas longe da cabeceira. A água morna solta a tensão dos ombros e da nuca, preparando a pele limpa para o instante em que o dia realmente termina.',
    duration: '15 min antes de deitar',
    focus: 'Corpo & Ambiente',
    cue: 'Água morna e meia-luz',
    imageKey: 'lavender-field',
  },
  {
    number: '02',
    eyebrow: 'Segundo Gesto',
    title: 'A Bruma de Lavanda',
    summary: 'Aplicação de Serena nos pontos de pulsação e nos lençóis.',
    description:
      'Com a pele ainda aquecida do banho, borrife Serena nos pulsos, no colo e atrás das orelhas. Se quiser envolver o quarto, lance uma névoa leve a 30 cm do travesseiro.',
    duration: 'Logo após o banho',
    focus: 'Pele & Lençóis',
    cue: '3 a 5 borrifadas finas',
    imageKey: 'ritual-noturno',
  },
  {
    number: '03',
    eyebrow: 'Terceiro Gesto',
    title: 'Florescer o Sono',
    summary: 'Respiração lenta enquanto a Lavanda Francesa acalma a mente.',
    description:
      'Deite-se em meia-luz e faça três inspirações lentas. Do frescor herbal ao coração floral macio da Lavanda Francesa, o peito desacelera e o sono floresce sem esforço.',
    duration: 'Ao apagar a luz',
    focus: 'Mente & Respiração',
    cue: 'Três respirações longas',
    imageKey: 'serena-hero',
  },
];

export const SERENA_PRODUCT: SerenaProductContent = {
  eyebrow: 'Edição de Estreia • Produto Estrela',
  name: 'Serena',
  fullName: 'Serena — Body Splash Artesanal de Lavanda Francesa',
  subtitle:
    '5% de essência pura de Lavanda Francesa (Lavandula angustifolia) macerada por 21 dias. A bruma feita para transformar o fim do dia em descanso real.',
  volume: '200 ml / 6.7 fl. oz',
  olfactoryFamily: 'Aromático Floral Puro • Lavanda Francesa',
  concentration: 'Body Splash Artesanal • 5% de Essência',
  price: 'R$ 89,90',
  priceNote: 'Pequenos lotes artesanais • Envase sob encomenda após 21 dias de maceração',
  sensoryDescription: [
    'Serena entrega a pureza absoluta da Lavanda Francesa a 5%, sem misturas que competem com o silêncio do quarto. Na primeira borrifada, o frescor herbal limpo solta o peso do dia e convida a uma respiração mais longa.',
    'No calor da pele pós-banho, os 21 dias de maceração revelam o coração floral aveludado até repousar no fundo balsâmico limpo do próprio extrato de lavanda. Um rastro íntimo que permanece na pele e nos lençóis até a madrugada.',
  ],
  badges: [
    '5% Essência de Lavanda Francesa',
    'Mono-Essência Pura',
    'Maceração de 21 Dias',
    'Vegano & Cruelty-Free',
  ],
  ctaLabel: 'Reservar meu Serena',
  ctaHref: '#contato',
  secondaryCtaLabel: 'Ver Ficha Técnica',
  secondaryCtaHref: '#ficha-tecnica',
  olfactoryPyramid: [
    {
      id: 'topo',
      label: 'Topo',
      stage: 'Abertura Luminosa',
      timing: '0 — 15 min',
      mood: 'Frescor herbal que libera a tensão do dia',
      description:
        'Faceta fresca, herbal e luminosa da flor de Lavanda Francesa recém-colhida. Limpa o ar ao redor e convida à primeira respiração profunda.',
      notes: [
        'Flor de Lavanda Francesa Recém-Colhida',
        'Faceta Herbal Luminosa',
        'Frescor Leve de Abertura',
      ],
    },
    {
      id: 'coracao',
      label: 'Corpo',
      stage: 'Coração Floral Macerado',
      timing: '15 min — 2 h',
      mood: 'Abraço macio que acalma a mente no ritual noturno',
      description:
        'Coração floral aveludado e doce-sereno da Lavanda Francesa (Lavandula angustifolia) macerada por 21 dias, acalmando a mente no ritual da mulher noturna.',
      notes: [
        'Lavanda Francesa (Lavandula angustifolia)',
        'Coração Floral Aveludado',
        'Doçura Serena da Maceração',
      ],
    },
    {
      id: 'fundo',
      label: 'Fundo',
      stage: 'Assinatura de Descanso',
      timing: '2 h — 4 h+',
      mood: 'Rastro confortável que floresce o sono até a madrugada',
      description:
        'Base balsâmica suave, limpa e levemente amadeirada do próprio extrato natural de Lavanda Francesa, florescendo o sono na pele e nos lençóis até a madrugada.',
      notes: [
        'Base Balsâmica Suave da Lavanda',
        'Rastro Limpo e Acolhedor',
        'Nuance Levemente Amadeirada Natural',
      ],
    },
  ],
};

export const TECHNICAL_SHEET_HEADER: SectionHeader = {
  eyebrow: 'Ficha Técnica Profissional',
  title: 'Transparência em cada detalhe',
  subtitle:
    'Cada detalhe da fórmula mono-essência a 5% de Lavanda Francesa, da maceração no escuro ao cuidado com a pele.',
};

export const TECHNICAL_SHEET_CATEGORIES: TechnicalSpecCategory[] = [
  'Especificações',
  'Composição & Ética',
  'Uso & Conservação',
];

export const TECHNICAL_SHEET: TechnicalSpecItem[] = [
  {
    id: 'classificacao',
    category: 'Especificações',
    label: 'Classificação',
    specification:
      'Body Splash Artesanal / Bruma Corporal Perfumada de uso noturno e pós-banho.',
  },
  {
    id: 'volume',
    category: 'Especificações',
    label: 'Volume Líquido',
    specification: '200 ml / 6.7 fl. oz.',
  },
  {
    id: 'familia-olfativa',
    category: 'Especificações',
    label: 'Família Olfativa',
    specification: 'Aromático Floral Puro • Lavanda Francesa (Lavandula angustifolia).',
  },
  {
    id: 'concentracao',
    category: 'Especificações',
    label: 'Concentração de Essência',
    specification:
      '5% de essência selecionada de Lavanda Francesa: presença serena e envolvente, calibrada para relaxar sem pesar durante o sono.',
  },
  {
    id: 'assinatura-botanica',
    category: 'Especificações',
    label: 'Assinatura Botânica',
    specification:
      'Mono-essência pura de Lavanda Francesa, sem adição de outras flores, especiarias ou misturas concorrentes.',
  },
  {
    id: 'base-veicular-ph',
    category: 'Composição & Ética',
    label: 'Base Veicular & pH Fisiológico',
    specification:
      'Álcool de cereais neutro de grau perfumaria e água deionizada purificada, com pH fisiológico entre 5,5 e 6,2 para respeitar a barreira natural da pele.',
  },
  {
    id: 'tempo-maceracao',
    category: 'Composição & Ética',
    label: 'Tempo de Maceração',
    specification:
      '21 dias em repouso escuro e temperatura estável antes do envase artesanal, arredondando as três facetas da Lavanda Francesa.',
  },
  {
    id: 'embalagem-etica',
    category: 'Composição & Ética',
    label: 'Embalagem, Segurança & Ética',
    specification:
      'Vidro fumê-ametista reciclável com válvula spray névoa fina prata. Vegano, Cruelty-Free, livre de parabenos, ftalatos e corantes artificiais; testado dermatologicamente.',
  },
  {
    id: 'modo-de-uso-pele',
    category: 'Uso & Conservação',
    label: 'Aplicação na Pele',
    specification:
      'Borrifar sobre a pele limpa pós-banho nos pulsos, colo, nuca e atrás das orelhas, deixando a névoa fina assentar naturalmente sem friccionar.',
  },
  {
    id: 'modo-de-uso-lencois',
    category: 'Uso & Conservação',
    label: 'Ritual nos Lençóis & Quarto',
    specification:
      'Para envolver o ambiente pré-sono, aplicar uma bruma leve no ar, sobre o travesseiro e a roupa de cama a cerca de 30 cm de distância, alguns minutos antes de deitar.',
  },
  {
    id: 'precaucoes',
    category: 'Uso & Conservação',
    label: 'Precauções & Conservação',
    specification:
      'Uso externo. Evitar contato com olhos e pele lesionada ou irritada. Conservar o frasco fechado, ao abrigo de calor e luz solar direta, preservando a integridade da Lavanda Francesa.',
  },
];

export const FAQ_HEADER: SectionHeader = {
  eyebrow: 'Perguntas Frequentes',
  title: 'Dúvidas essenciais',
  subtitle: 'Respostas diretas sobre a fragrância a 5%, o uso antes de dormir e as encomendas.',
};

export const FAQ_ITEMS: [FaqItem, FaqItem, FaqItem, FaqItem, FaqItem] = [
  {
    id: 'fixacao',
    question: 'Como é a fixação e a projeção do Serena na pele?',
    answer:
      'Com 5% de Lavanda Francesa pura, Serena tem projeção íntima e dura de 2 a 4 horas na pele, a medida exata para acolher o sono sem enjoar ou cansar o olfato. Em fronhas de algodão ou linho, o fundo balsâmico suave segue perceptível até a madrugada.',
  },
  {
    id: 'roupa-de-cama',
    question: 'Posso borrifar o Serena no travesseiro e na roupa de cama?',
    answer:
      'Sim, sem risco de manchar. A fórmula é translúcida, livre de corantes e feita com álcool de cereais neutro: basta borrifar uma névoa fina a cerca de 30 cm do travesseiro e aguardar alguns instantes.',
  },
  {
    id: 'pele-sensivel',
    question: 'O produto é adequado para peles sensíveis?',
    answer:
      'Serena é minimalista: apenas Lavanda Francesa (5%), vegana, testada dermatologicamente, pH fisiológico (5,5 – 6,2) e livre de parabenos ou ftalatos. Em caso de sensibilidade conhecida a fragrâncias, teste antes na parte interna do antebraço.',
  },
  {
    id: 'maceracao-artesanal',
    question: 'O que muda com os 21 dias de maceração artesanal?',
    answer:
      'O repouso no escuro integra lentamente os 5% de essência à base líquida, eliminando qualquer saída áspera de álcool. O resultado na pele é uma névoa macia desde o primeiro segundo.',
  },
  {
    id: 'encomendas',
    question: 'Como funciona a produção em lotes e como fazer uma encomenda?',
    answer:
      'Cada lote é envasado à mão em pequenas tiragens para preservar o frescor da Lavanda Francesa. Você reserva em segundos pelo WhatsApp do atelier ou pelo formulário abaixo, com envio cuidadoso para todo o Brasil.',
  },
];

const WHATSAPP_PREFILLED_HREF =
  'https://wa.me/5511994208810?text=Ol%C3%A1%2C%20Atelier%20Brisa%20Noturna!%20Gostaria%20de%20reservar%20o%20Body%20Splash%20Serena%20(Lavanda%20Francesa%205%25%20%E2%80%A2%20200ml)%20e%20saber%20a%20disponibilidade%20do%20lote%20atual.';

export const CONTACT_INFO: ContactInfoContent = {
  eyebrow: 'Contato & Encomendas',
  badge: 'Lote Artesanal Sob Encomenda • Tiragem Limitada',
  title: 'Leve Serena para o seu ritual noturno',
  subtitle:
    'Reserve seu frasco de 200 ml (5% Lavanda Francesa pura) da edição de estreia, monte um presente memorável ou fale direto com o atelier.',
  atelierPromise:
    'Atendimento personalizado pelo Atelier Brisa Noturna: cada reserva é acompanhada de perto, do envase à entrega.',
  whatsappQuickCta: {
    label: 'Reservar agora pelo WhatsApp',
    sublabel: 'Resposta humana do atelier • Mensagem já pronta para enviar',
    href: WHATSAPP_PREFILLED_HREF,
  },
  careProofs: [
    {
      title: 'Lote Artesanal Numerado',
      detail: 'Envase feito à mão após 21 dias de maceração no escuro.',
    },
    {
      title: 'Embalagem Presenteável',
      detail: 'Acabamento noturno delicado, pronto para presentear ou compor a cabeceira.',
    },
    {
      title: 'Consultoria do Ritual Pré-Sono',
      detail: 'Orientação sob medida sobre aplicação na pele, nos lençóis e no quarto.',
    },
  ],
  channels: [
    {
      id: 'whatsapp',
      label: 'WhatsApp • Reservas Rápidas',
      value: '+55 (11) 99420-8810',
      helper: 'Canal mais ágil para reservar seu lote e tirar dúvidas',
      href: WHATSAPP_PREFILLED_HREF,
    },
    {
      id: 'email',
      label: 'E-mail do Atelier',
      value: 'contato@brisanoturna.com.br',
      helper: 'Respostas cuidadosas em até 1 dia útil',
      href: 'mailto:contato@brisanoturna.com.br',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: '@brisanoturna.oficial',
      helper: 'Bastidores da maceração, novos lotes e rituais noturnos',
      href: 'https://instagram.com/brisanoturna.oficial',
    },
    {
      id: 'hours',
      label: 'Horário de Atendimento',
      value: 'Seg a Sex, 9h às 19h • Sáb, 10h às 14h',
      helper: 'Horário de Brasília • Canal ilustrativo de atendimento',
    },
  ],
  form: {
    title: 'Solicitar reserva ou atendimento personalizado',
    description:
      'Escolha o assunto, deixe seu contato e receba o retorno direto do nosso atelier com disponibilidade do lote atual.',
    nameLabel: 'Seu nome',
    namePlaceholder: 'Como gostaria de ser chamada?',
    emailLabel: 'WhatsApp ou E-mail',
    emailPlaceholder: '(11) 99999-9999 ou voce@exemplo.com',
    interestLabel: 'Como podemos cuidar do seu pedido?',
    interestOptions: [
      'Reservar Serena (200 ml)',
      'Presente / Edição Especial',
      'Consultoria do Ritual',
      'Parcerias & Boutiques',
    ],
    interestChoices: [
      {
        value: 'Reservar Serena (200 ml)',
        label: 'Reservar Serena',
        subtitle: '200 ml • R$ 89,90 • Lote atual',
      },
      {
        value: 'Presente / Edição Especial',
        label: 'Presentear alguém',
        subtitle: 'Embalagem editorial & cartão',
      },
      {
        value: 'Consultoria do Ritual',
        label: 'Consultoria do Ritual',
        subtitle: 'Dúvidas sobre uso e fragrância',
      },
      {
        value: 'Parcerias & Boutiques',
        label: 'Boutiques & Parcerias',
        subtitle: 'Curadoria e pedidos especiais',
      },
    ],
    messageLabel: 'Mensagem',
    messagePlaceholder:
      'Conte quantos frascos deseja reservar, se é para presente ou como prefere conversar com o atelier...',
    submitLabel: 'Solicitar reserva do meu lote',
    submittingLabel: 'Registrando sua solicitação...',
    successTitle: 'Solicitação recebida pelo atelier',
    successMessage:
      'Obrigada por escrever para a Brisa Noturna. Retornaremos em breve pelo canal informado com os detalhes do lote atual.',
    cooldownMessage:
      'Sua solicitação recente já foi registrada. Aguarde alguns instantes antes de enviar uma nova mensagem.',
    privacyNote:
      'Seus dados são usados exclusivamente para responder ao seu atendimento personalizado.',
  },
};
