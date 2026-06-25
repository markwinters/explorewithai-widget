import type { Config } from './config';
import { collectPageData } from './config';
import type { Provider } from './providers';
import { getEnabledProviders } from './providers';
import styles from './styles.css?raw';
import {
  createButton,
  createOverlay,
  createPanel,
  positionPanel,
  updateTheme,
} from './ui';

export class Widget {
  private config: Config;
  private host: HTMLDivElement | null = null;
  private root: HTMLElement | null = null;
  private btn: HTMLButtonElement | null = null;
  private panel: HTMLDivElement | null = null;
  private overlay: HTMLDivElement | null = null;
  private isOpen = false;
  private providers: Provider[] = [];

  constructor(config: Config) {
    this.config = { ...config };
    this.providers = getEnabledProviders(this.config.providers);
  }

  init(): void {
    if (this.host) return;

    this.host = document.createElement('div');
    this.host.id = 'ewai-root';

    const shadow = this.host.attachShadow({ mode: 'closed' });

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);

    this.root = document.createElement('div');
    shadow.appendChild(this.root);

    document.body.appendChild(this.host);

    this.render();
    this.bindListeners();
    this.handleThemeChange();
  }

  destroy(): void {
    if (this.host) {
      this.host.remove();
      this.host = null;
    }
    this.root = null;
    this.btn = null;
    this.panel = null;
    this.overlay = null;
    this.isOpen = false;
  }

  updateConfig(config: Partial<Config>): void {
    this.config = { ...this.config, ...config };
    this.providers = getEnabledProviders(this.config.providers);
    if (this.host) {
      this.render();
      this.handleThemeChange();
    }
  }

  refreshPageData(): void {
    // Re-reads page data for SPA navigation support
  }

  private render(): void {
    if (!this.root) return;

    this.root.innerHTML = '';

    updateTheme(this.root, this.config.theme);

    this.overlay = createOverlay();
    this.root.appendChild(this.overlay);

    this.btn = createButton(this.config);
    this.root.appendChild(this.btn);

    this.panel = createPanel(this.providers, (provider) => {
      this.openProvider(provider);
    });
    this.root.appendChild(this.panel);
  }

  private bindListeners(): void {
    this.btn?.addEventListener('click', () => this.toggle());

    this.btn?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.open();
        this.focusFirstProvider();
      }
    });

    this.overlay?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('touchstart', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.btn?.focus();
      }
      if (e.key === 'Tab' && this.isOpen) {
        this.handleTabTrap(e);
      }
    });

    window.addEventListener('resize', () => {
      if (this.isOpen && this.btn && this.panel) {
        positionPanel(this.btn, this.panel, this.config.position);
      }
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.config.theme === 'auto' && this.root) {
          updateTheme(this.root, 'auto');
        }
      });

    window.addEventListener('popstate', () => {
      // Can refresh page data for SPAs
    });
  }

  private handleThemeChange(): void {
    if (this.config.theme !== 'auto') return;
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.root) updateTheme(this.root, 'auto');
      });
  }

  private toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  private open(): void {
    if (this.isOpen || !this.btn || !this.panel || !this.overlay) return;
    this.isOpen = true;
    this.btn.setAttribute('aria-expanded', 'true');
    positionPanel(this.btn, this.panel, this.config.position);
    this.panel.classList.add('open');
    this.overlay.classList.add('open');
  }

  private close(): void {
    if (!this.isOpen || !this.panel || !this.overlay || !this.btn) return;
    this.isOpen = false;
    this.btn.setAttribute('aria-expanded', 'false');
    this.panel.classList.remove('open');
    this.overlay.classList.remove('open');
  }

  private openProvider(provider: Provider): void {
    const data = collectPageData();
    const url = provider.generateUrl(data);
    window.open(url, '_blank', 'noopener,noreferrer');
    this.close();
  }

  private focusFirstProvider(): void {
    const items = this.root?.querySelectorAll<HTMLButtonElement>(
      '.ewai-provider-item'
    );
    items?.[0]?.focus();
  }

  private handleTabTrap(e: KeyboardEvent): void {
    const items = this.root?.querySelectorAll<HTMLButtonElement>(
      '.ewai-provider-item'
    );
    if (!items || items.length === 0) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      this.btn?.focus();
    }
  }
}
