import type { Config, Position } from './config';
import type { Provider } from './providers';

const SPARKLE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M18 17l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/></svg>`;

export function createButton(config: Config): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = `ewai-btn ewai-pos-${config.position}`;
  btn.setAttribute('aria-label', `Explore with AI — ${config.label}`);
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-haspopup', 'true');
  btn.innerHTML = `
    <span class="ewai-btn-icon">${SPARKLE_ICON}</span>
    <span class="ewai-btn-label">${escapeHtml(config.label)}</span>
  `;
  return btn;
}

export function createOverlay(): HTMLDivElement {
  const el = document.createElement('div');
  el.className = 'ewai-overlay';
  el.setAttribute('aria-hidden', 'true');
  return el;
}

export function createPanel(
  providers: Provider[],
  onSelect: (provider: Provider) => void
): HTMLDivElement {
  const panel = document.createElement('div');
  panel.className = 'ewai-panel';
  panel.setAttribute('role', 'menu');
  panel.setAttribute('aria-label', 'Select an AI provider');

  const header = document.createElement('div');
  header.className = 'ewai-panel-header';
  header.textContent = 'Explore this page with';
  panel.appendChild(header);

  providers.forEach((provider) => {
    const item = document.createElement('button');
    item.className = 'ewai-provider-item';
    item.setAttribute('role', 'menuitem');
    item.setAttribute('data-provider', provider.id);
    item.innerHTML = `
      <span class="ewai-provider-icon">${provider.icon}</span>
      ${escapeHtml(provider.name)}
    `;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      onSelect(provider);
    });
    panel.appendChild(item);
  });

  return panel;
}

export function positionPanel(
  btn: HTMLElement,
  panel: HTMLElement,
  position: Position
): void {
  const btnRect = btn.getBoundingClientRect();
  const gap = 8;

  if (position.startsWith('bottom-')) {
    panel.style.bottom = `${window.innerHeight - btnRect.top + gap}px`;
  } else {
    panel.style.top = `${btnRect.bottom + gap}px`;
  }

  if (position.endsWith('-right')) {
    panel.style.right = `${window.innerWidth - btnRect.right}px`;
  } else {
    panel.style.left = `${btnRect.left}px`;
  }
}

export function updateTheme(root: HTMLElement, theme: Config['theme']): void {
  if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-ewai-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-ewai-theme', theme);
  }
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
