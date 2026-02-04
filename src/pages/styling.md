---
title: Styling
subtitle: CSS customization and theming
---

## CSS Custom Properties

Override the default color palette and sizing with CSS custom properties:

```css
:root {
  /* Named colors */
  --chart-color-blue: #2196f3;
  --chart-color-green: #4caf50;
  --chart-color-orange: #ff7043;
  --chart-color-yellow: #ffc107;
  --chart-color-teal: #009688;
  --chart-color-purple: #9c27b0;
  --chart-color-pink: #e91e63;
  --chart-color-indigo: #3f51b5;
  --chart-color-red: #f44336;
  --chart-color-cyan: #00bcd4;
  --chart-color-lime: #cddc39;
  --chart-color-gray: #78909c;

  /* Background */
  --chart-bg: rgba(128, 128, 128, 0.15);

  /* Dimensions */
  --chart-height: 12rem;
  --chart-column-width: 1rem;
  --chart-donut-size: 20rem;
  --chart-donut-hole: 30%;

  /* Dot sizes */
  --chart-dot-size: 0.75rem;
  --chart-dot-size-min: 0.375rem;
  --chart-dot-size-max: 1.5rem;
}
```

## Available Properties

### Named Colors

Colors can be overridden by name for easier customization:

| Property | Default | Alias |
|----------|---------|-------|
| `--chart-color-blue` | `#2196f3` | `--chart-color-1` |
| `--chart-color-green` | `#4caf50` | `--chart-color-2` |
| `--chart-color-orange` | `#ff7043` | `--chart-color-3` |
| `--chart-color-yellow` | `#ffc107` | `--chart-color-4` |
| `--chart-color-teal` | `#009688` | `--chart-color-5` |
| `--chart-color-purple` | `#9c27b0` | `--chart-color-6` |
| `--chart-color-pink` | `#e91e63` | `--chart-color-7` |
| `--chart-color-indigo` | `#3f51b5` | `--chart-color-8` |
| `--chart-color-red` | `#f44336` | `--chart-color-9` |
| `--chart-color-cyan` | `#00bcd4` | `--chart-color-10` |
| `--chart-color-lime` | `#cddc39` | `--chart-color-11` |
| `--chart-color-gray` | `#78909c` | `--chart-color-12` |

The numbered aliases (`--chart-color-1`, etc.) reference the named colors. Override either globally:

```css
:root {
  /* Change what "blue" looks like everywhere */
  --chart-color-blue: #1976d2;

  /* Or change the first series color everywhere */
  --chart-color-1: #1976d2;
}
```

Or use named colors to style specific series in a specific chart:

```css
.chart-sales .chart-series-production {
  --color: var(--chart-color-green);
}
.chart-sales .chart-series-returns {
  --color: var(--chart-color-red);
}
```

### Other Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--chart-color-1` through `--chart-color-12` | Various | Series color palette |
| `--chart-dot-size` | `0.75rem` | Dot size (scatter, dot, and line charts) |
| `--chart-dot-size-min` | `0.375rem` | Minimum dot size (scatter charts with size column) |
| `--chart-dot-size-max` | `1.5rem` | Maximum dot size (scatter charts with size column) |
| `--chart-bg` | `rgba(128,128,128,0.15)` | Background/axis color |
| `--chart-height` | `12rem` | Height of bar/column/dot/scatter charts |
| `--chart-column-width` | `1rem` | Minimum width per column |
| `--chart-donut-size` | `20rem` | Donut chart maximum diameter |
| `--chart-donut-hole` | `30%` | Donut hole size (% of diameter) |

## Responsive Donut Charts

Donut charts automatically adapt using CSS container queries:

- **Narrow containers**: Donut on top, legend wraps below horizontally
- **Wide containers** (30rem+): Donut and legend side by side

The donut scales to 80% of container width (minimum 8rem, maximum `--chart-donut-size`).

## Per-Chart Styling

Each chart gets a class based on its ID for targeted styling:

```yaml
charts:
  sales-growth:
    type: stacked-column
    file: charts/sales.csv
```

```css
/* Target this specific chart */
.chart-sales-growth {
  --chart-height: 16rem;
  --chart-color-1: #ff6b6b;
}
```

The class name is `chart-` followed by the chart ID with spaces converted to hyphens.

## Dual Class System

Each chart element (bars, segments, legend items) gets two classes for styling flexibility:

### Ordinal Classes

Position-based classes: `.chart-color-1`, `.chart-color-2`, etc.

```css
/* Style by position in series */
.chart-color-1 { --color: #ff6b6b; }
.chart-color-2 { --color: #4ecdc4; }
.chart-color-3 { --color: #ffe66d; }
```

### Semantic Classes

Name-based classes: `.chart-series-{slugified-name}`

```css
/* Style by series name */
.chart-series-production { --color: #51cf66; }
.chart-series-beta { --color: #fcc419; }
.chart-series-hotfix { --color: #ff6b6b; }
```

Series names are converted to lowercase with non-alphanumeric characters replaced by hyphens.

## Dark Mode

The default Uncharted stylesheet supports `prefers-color-scheme` automatically. Colors adjust for both light and dark modes.

To customize dark mode colors:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --chart-color-1: #64b5f6;
    --chart-color-2: #81c784;
    --chart-bg: rgba(255, 255, 255, 0.1);
  }
}
```

Or use the `light-dark()` function:

```css
:root {
  --chart-color-1: light-dark(#2196f3, #64b5f6);
  --chart-bg: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.1));
}
```

## Custom Stylesheets

To completely replace the default styles, disable CSS injection:

```javascript
eleventyConfig.addPlugin(uncharted, {
  injectCss: false
});
```

Then include your own stylesheet. The plugin generates semantic HTML that you can style as needed.

## Chart Structure

Understanding the HTML structure helps with custom styling:

```html
<figure class="chart chart-stacked-column chart-{id}">
  <figcaption class="chart-header">
    <span class="chart-title">Title</span>
    <span class="chart-subtitle">Subtitle</span>
  </figcaption>
  <div class="chart-body">
    <!-- Chart-specific content -->
  </div>
  <div class="chart-legend">
    <span class="chart-legend-item chart-color-1 chart-series-{name}">
      <span class="chart-legend-swatch"></span>
      <span class="chart-legend-label">Label</span>
    </span>
  </div>
</figure>
```

Target specific parts:

```css
.chart-header { /* title area */ }
.chart-body { /* main visualization */ }
.chart-legend { /* legend below */ }
.chart-legend-swatch { /* color indicator */ }
```
