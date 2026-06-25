# Explore With AI Widget

A lightweight, framework-agnostic JavaScript widget that adds an "Explore With AI" button to any website. Visitors can open the current page in ChatGPT, Claude, Gemini, Perplexity, Copilot, and more.

**[→ Live Demo & Docs](https://markwinters.github.io/explorewithai-widget/)**

## Installation

Add one script tag:

```html
<script src="https://cdn.jsdelivr.net/gh/markwinters/explorewithai-widget@latest/dist/explore-ai.min.js"></script>
```

That's it. The widget appears as a floating button in the bottom-right corner.

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

### Providers

| ID | Name |
|----|------|
| `chatgpt` | ChatGPT |
| `claude` | Claude |
| `gemini` | Gemini |
| `perplexity` | Perplexity |
| `copilot` | Microsoft Copilot |
| `grok` | Grok |
| `deepseek` | DeepSeek |

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
