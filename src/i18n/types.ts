export interface Phase {
  num: string;
  title: string;
  duration: string;
  summary: string;
  bullets: string[];
  deliverable: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface Dictionary {
  locale: 'it' | 'es' | 'pt';
  htmlLang: string;
  meta: {
    home: { title: string; description: string };
    contact: { title: string; description: string };
  };
  nav: {
    method: string;
    services: string;
    why: string;
    start: string;
    cta: string;
    ariaMain: string;
    ariaLang: string;
  };
  hero: {
    headlineA: string;
    headlineB: string;
    subline: string;
    personal: string;
    cta: string;
    scrollHint: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    team: TeamMember[];
    togetherCaption: string;
    trust: string;
    stats: { line: string; caption: string }[];
  };
  route: {
    eyebrow: string;
    title: string;
    intro: string;
    origin: string;
    destination: string;
    phaseLabel: string;
    deliverableLabel: string;
    phases: Phase[];
    note: string;
  };
  photos: {
    tastingAlt: string;
    tastingCaption: string;
    presentingAlt: string;
    presentingCaption: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    cols: { title: string; body: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    paras: string[];
  };
  start: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
    cta: string;
  };
  footer: {
    cities: string;
    tagline: string;
    emailLabel: string;
    whatsappLabel: string;
    langLabel: string;
    rights: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subline: string;
    reassurance: string;
    directTitle: string;
    directBody: string;
    form: {
      company: string;
      country: string;
      sector: string;
      sectorOptions: { value: string; label: string }[];
      name: string;
      email: string;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  paths: { home: string; contact: string };
}
