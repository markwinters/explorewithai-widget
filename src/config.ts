export type Theme = 'light' | 'dark' | 'auto';
export type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface Config {
  theme: Theme;
  position: Position;
  label: string;
  providers: string[];
  compact: boolean;
}

export const DEFAULTS: Config = {
  theme: 'auto',
  position: 'bottom-right',
  label: 'Explore With AI',
  providers: ['chatgpt', 'claude', 'grok', 'perplexity'],
  compact: false,
};

export interface PageData {
  url: string;
  title: string;
  description: string;
}

export function collectPageData(): PageData {
  const getMeta = (name: string): string => {
    const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    return el?.getAttribute('content') || '';
  };

  return {
    url: window.location.href,
    title: document.title,
    description: getMeta('description') || getMeta('og:description'),
  };
}

export function findScriptTag(): HTMLScriptElement | null {
  const scripts = document.getElementsByTagName('script');
  for (let i = scripts.length - 1; i >= 0; i--) {
    const src = scripts[i].src || '';
    if (src.includes('explore-ai')) return scripts[i];
  }
  return scripts[scripts.length - 1] || null;
}

export function parseConfig(script: HTMLScriptElement): Config {
  const d = script.dataset;
  return {
    theme: (d.theme as Theme) || DEFAULTS.theme,
    position: (d.position as Position) || DEFAULTS.position,
    label: d.label || DEFAULTS.label,
    providers: d.providers
      ? d.providers.split(',').map(p => p.trim().toLowerCase())
      : DEFAULTS.providers,
    compact: d.compact === 'true' || d.compact === '' || DEFAULTS.compact,
  };
}
