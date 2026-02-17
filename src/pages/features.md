---
title: Features
subtitle: Animations, downloads, icons, and negative values
charts:
  negative-demo:
    type: stacked-column
    title: Quarterly Performance
    file: charts/quarterly-profit.csv
    legend:
      - Cost
      - Profit/Loss
---

## Animations

Charts support CSS-based animations with staggered reveals. Enable globally or per-chart.

### Global Enable

```javascript
eleventyConfig.addPlugin(uncharted, {
  animate: true
});
```

### Per-Chart Override

```yaml
charts:
  # Disable for this chart
  static-chart:
    type: donut
    animate: false
    file: charts/data.csv

  # Enable for this chart (if global is false)
  animated-chart:
    type: stacked-bar
    animate: true
    file: charts/data.csv
```

### Scroll-Triggered Animations

For animations that trigger when scrolled into view, add an Intersection Observer that toggles the `.chart-animate` class:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('chart-animate');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.chart').forEach(chart => {
  observer.observe(chart);
});
```

## Download Links

Let users download the source CSV data for any chart.

### Setup

Enable globally in plugin options:

```javascript
eleventyConfig.addPlugin(uncharted, {
  downloadData: true,     // show download links
  dataPassthrough: true,  // copy CSV files to output
  dataPath: '/data/'      // URL path for files
});
```

This adds a download link below each chart that loads data from a file.

### Per-Chart Override

```yaml
charts:
  # Uses global setting
  revenue:
    type: stacked-bar
    file: charts/revenue.csv

  # Custom download label
  expenses:
    type: stacked-column
    file: charts/expenses.csv
    downloadData: "Download expense report"

  # Disable for this chart
  internal:
    type: donut
    file: charts/internal.csv
    downloadData: false
```

### Without Passthrough

If `dataPassthrough` is false, ensure CSV files are available at the expected URLs. The plugin generates links based on `dataPath` + `file`:

```
/data/charts/revenue.csv
```

## Negative Values

Stacked column, dot, and scatter charts support negative values. When present, a zero axis line appears automatically.

### Stacked Columns

Positive values stack upward from zero, negative values stack downward:

```csv
quarter,Cost,Profit
Q1,20,10
Q2,25,-10
Q3,15,25
Q4,30,-10
```

<div class="chart-example">

{% chart "negative-demo" %}

</div>

The chart calculates the range from maximum positive stack to minimum negative stack automatically.

### Dot Charts

Points position above or below the zero line:

```csv
month,Change
Jan,5
Feb,-3
Mar,8
Apr,-2
```

### Scatter Charts

Both X and Y axes can display negative values:

```yaml
charts:
  scatter:
    type: scatter
    x:
      min: -100
      max: 100
    y:
      min: -50
      max: 50
```

## Manual Scaling with Negatives

Set explicit ranges that include negative values:

```yaml
charts:
  performance:
    type: stacked-column
    y:
      min: -50
      max: 100
    file: charts/performance.csv
```

Or using global defaults:

```yaml
charts:
  performance:
    type: stacked-column
    min: -50
    max: 100
    file: charts/performance.csv
```

The zero line positions proportionally between min and max.

## Icon Support

Dot, line, and scatter charts can display Font Awesome icons instead of default circular dots. Icons inherit series colors automatically.

### Prerequisites

Include Font Awesome in your site:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
```

### Single Icon for All Series

Use a string to apply the same icon to all data points:

```yaml
charts:
  stars:
    type: dot
    file: data.csv
    icons: "fa-solid fa-star"
```

### Per-Series Icons

Use an object to assign different icons to each series:

```yaml
charts:
  development:
    type: dot
    file: adoption.csv
    y:
      columns:
        prs: Pull Requests
        commits: Commits
    icons:
      prs: "fa-solid fa-code-merge"
      commits: "fa-solid fa-code-commit"
```

### Scatter Charts

For scatter charts, icons are keyed by series value:

```yaml
charts:
  metrics:
    type: scatter
    file: data.csv
    series:
      column: group
    icons:
      alpha: "fa-solid fa-circle"
      beta: "fa-solid fa-square"
```

Icons also appear in the legend, replacing the default colored dot marker.

## Accessibility

Charts are rendered as `<figure>` elements with proper semantic structure:

- `<figcaption>` contains the title and subtitle
- Chart data is represented in HTML, not canvas
- Legend items are readable by screen readers
- Color is not the only differentiator (position matters)

For additional accessibility, consider:

1. Adding `aria-label` to the figure with a text description
2. Providing a data table alternative for complex charts
3. Ensuring sufficient color contrast in custom palettes
