---
title: Getting Started
subtitle: Installation and basic setup
---

## Installation

Install the plugin via npm:

```bash
npm install eleventy-plugin-uncharted
```

## Setup

Import and add the plugin in your Eleventy configuration:

```javascript
// eleventy.config.js
import uncharted from 'eleventy-plugin-uncharted';

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(uncharted);
}
```

The plugin automatically copies the CSS to your output directory and injects the stylesheet link into pages that contain charts.

## Plugin Options

Configure the plugin by passing an options object:

```javascript
eleventyConfig.addPlugin(uncharted, {
  dataDir: '_data',              // where to find CSV files
  animate: true,                 // enable animations globally
  cssPath: '/css/uncharted.css', // output path for stylesheet
  injectCss: false,              // disable automatic CSS handling
  downloadData: true,            // enable download links globally
  dataPassthrough: true,         // copy CSV files to public path
  dataPath: '/data/'             // public URL path for CSV files
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dataDir` | string | `'_data'` | Directory for CSV files |
| `animate` | boolean | `false` | Enable animations globally |
| `cssPath` | string | `'/css/uncharted.css'` | Output path for stylesheet |
| `injectCss` | boolean | `true` | Automatically inject CSS link |
| `downloadData` | boolean | `false` | Show download links on charts |
| `dataPassthrough` | boolean | `false` | Copy CSV files to output |
| `dataPath` | string | `'/data/'` | Public URL path for data files |

## Manual CSS Include

If you set `injectCss: false`, manually include the stylesheet in your layout:

```html
<link rel="stylesheet" href="/css/uncharted.css">
```

## Basic Usage

Define charts in your page's frontmatter and render them with the `chart` shortcode:

```markdown
---
charts:
  growth:
    type: stacked-bar
    title: Platform Growth
    file: charts/platform-growth.csv
---

{% raw %}{% chart "growth" %}{% endraw %}
```

See [Data Sources](/data-sources/) for more ways to define chart data.
