---
title: Introduction
permalink: /
charts:
  issues:
    type: donut
    title: Issue Types
    center:
      value: total
      label: Issues
    data:
      - label: Features
        value: 33
      - label: Bugs
        value: 21
      - label: Other
        value: 4
---

Uncharted is a CSS-based chart plugin for [Eleventy](https://www.11ty.dev/). It renders charts as pure HTML and CSS with no JavaScript dependencies for display.

## Key Features

- **Pure CSS rendering** — Charts are built with CSS properties like `conic-gradient`, flexbox, and CSS grid
- **No JavaScript required** — Charts display without any client-side JavaScript
- **Multiple chart types** — Donut, stacked bar, stacked column, dot, and scatter plots
- **CSV data support** — Load chart data from CSV files or define inline
- **Automatic styling** — Includes a default color palette with light/dark mode support
- **Animations** — Optional CSS-based animations with staggered reveals
- **Download links** — Let users download source data files

## Quick Example

Define a chart in your page's frontmatter:

```yaml
charts:
  issues:
    type: donut
    title: Issue Types
    center:
      value: total
      label: Issues
    data:
      - label: Features
        value: 33
      - label: Bugs
        value: 21
      - label: Other
        value: 4
```

Then render it with the `chart` shortcode:

```liquid
{% raw %}{% chart "issues" %}{% endraw %}
```

<div class="chart-example">

{% chart "issues" %}

</div>

## Installation

```bash
npm install eleventy-plugin-uncharted
```

See [Getting Started](/getting-started/) for setup instructions.
