import type { Dictionary } from './types';
import it from './it';
import es from './es';
import pt from './pt';

export type Locale = 'it' | 'es' | 'pt';

export const dictionaries: Record<Locale, Dictionary> = { it, es, pt };

export const locales: Locale[] = ['it', 'es', 'pt'];

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Equivalent page paths in every language, for hreflang + the language switcher. */
export function alternates(page: 'home' | 'contact'): { locale: Locale; href: string }[] {
  return locales.map((l) => ({ locale: l, href: dictionaries[l].paths[page] }));
}
