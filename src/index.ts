import { findScriptTag, parseConfig, type Config } from './config';
import { Widget } from './widget';

let widget: Widget | null = null;

function init(config?: Partial<Config>): Widget {
  if (widget) {
    if (config) widget.updateConfig(config);
    widget.init();
    return widget;
  }

  const script = findScriptTag();
  const baseConfig = script ? parseConfig(script) : parseConfig(document.createElement('script'));

  if (config) {
    Object.assign(baseConfig, config);
  }

  widget = new Widget(baseConfig);
  widget.init();
  return widget;
}

function destroy(): void {
  widget?.destroy();
  widget = null;
}

function refresh(): void {
  widget?.refreshPageData();
}

if (typeof window !== 'undefined') {
  window.ExploreAI = { init, destroy, refresh };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }
}

declare global {
  interface Window {
    ExploreAI: {
      init: typeof init;
      destroy: typeof destroy;
      refresh: typeof refresh;
    };
  }
}
