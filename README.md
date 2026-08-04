# Explore With AI Widget

[![Packagist Version](https://img.shields.io/packagist/v/markwinters/explorewithai-widget.svg)](https://packagist.org/packages/markwinters/explorewithai-widget)
[![Packagist Downloads](https://img.shields.io/packagist/dt/markwinters/explorewithai-widget.svg)](https://packagist.org/packages/markwinters/explorewithai-widget)
[![jsDelivr](https://img.shields.io/jsdelivr/gh/hm/markwinters/explorewithai-widget.svg)](https://www.jsdelivr.com/package/gh/markwinters/explorewithai-widget)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A lightweight, framework-agnostic JavaScript widget that adds an "Explore With AI" button to any website. Visitors can open the current page in ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok, DeepSeek, Meta AI, Mistral, and more.

**[→ Live Demo & Docs](https://markwinters.github.io/explorewithai-widget/)**

## Installation

Add one script tag:

```html
<script src="https://cdn.jsdelivr.net/gh/markwinters/explorewithai-widget@latest/dist/explore-ai.min.js"></script>
```

That's it. The widget appears as a floating button in the bottom-right corner.

### Composer (PHP projects)

```bash
composer require markwinters/explorewithai-widget
```

Then serve or copy the bundled file from `vendor/markwinters/explorewithai-widget/dist/explore-ai.min.js`, e.g. in a Laravel Blade view:

```php
<script src="{{ asset('vendor/explorewithai/explore-ai.min.js') }}"></script>
```

## Configuration

Use `data-*` attributes on the script tag:

```html
<script
  src="https://cdn.jsdelivr.net/gh/markwinters/explorewithai-widget@latest/dist/explore-ai.min.js"
  data-theme="dark"
  data-position="bottom-left"
  data-label="Ask AI"
  data-providers="chatgpt,claude,gemini">
</script>
```

### Options

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-theme` | `light`, `dark`, `auto` | `auto` | Color theme |
| `data-position` | `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` | Button position |
| `data-label` | any string | `Explore With AI` | Button label text |
| `data-providers` | comma-separated provider IDs | all | Visible providers |
| `data-compact` | `true` or omitted | — | Icon-only circular button. Auto-enabled on mobile. |

### Providers

| ID | Name | Prompt pre-fill |
|----|------|----------------|
| `chatgpt` | ChatGPT | ✅ |
| `claude` | Claude | ✅ |
| `grok` | Grok | ✅ |
| `perplexity` | Perplexity | ✅ |
| `gemini` | Gemini | ❌ (opens app homepage) |
| `copilot` | Microsoft Copilot | ❌ (opens app homepage) |
| `deepseek` | DeepSeek | ❌ (opens app homepage) |
| `meta` | Meta AI | ❌ (opens app homepage) |
| `mistral` | Mistral | ❌ (opens app homepage) |

> Only providers with native URL parameter support are shown by default. The others are available if explicitly added via `data-providers` but will open the app's homepage without a pre-filled prompt.

## JavaScript API

```html
<script>
  // Initialize with custom config
  window.ExploreAI.init({
    theme: 'dark',
    label: 'Ask AI',
  });

  // Destroy the widget
  window.ExploreAI.destroy();

  // Refresh page data (useful for SPAs)
  window.ExploreAI.refresh();
</script>
```

## Browser Support

Chrome, Edge, Safari, Firefox — last two major versions.

## License

MIT
