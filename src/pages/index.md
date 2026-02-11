---
title: Introduction
permalink: /
charts:
  releases:
    type: stacked-column
    title: Release Cadence
    file: charts/releases.csv
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

Create a CSV file in your data directory:

```csv
quarter,Production,Hotfix,Beta
Q1,4,2,6
Q2,3,5,8
Q3,6,1,4
Q4,5,3,7
```

Define a chart in your page's frontmatter—just `type` and `file`:

```yaml
charts:
  releases:
    type: stacked-column
    title: Release Cadence
    file: charts/releases.csv
```

Render it with the `chart` shortcode:

```liquid
{% raw %}{% chart "releases" %}{% endraw %}
```

<div class="chart-example">

{% chart "releases" %}

</div>

Uncharted automatically uses the first column as categories and remaining columns as data series, with column names as legend labels. See [Configuration](/configuration/) for customizing column mapping, axis limits, and formatting.

## Installation

```bash
npm install eleventy-plugin-uncharted
```

See [Getting Started](/getting-started/) for setup instructions.
