---
title: Chart Types
subtitle: All available chart types with examples
charts:
  donut-demo:
    type: donut
    title: Browser Market Share
    showPercentages: true
    data:
      - label: Chrome
        value: 65
      - label: Safari
        value: 18
      - label: Firefox
        value: 10
      - label: Edge
        value: 7
  bar-demo:
    type: stacked-bar
    title: Team Growth
    file: charts/platform-growth.csv
    legend:
      - Existing
      - New Hires
  column-demo:
    type: stacked-column
    title: Release Cadence
    file: charts/releases.csv
    legend:
      - Production
      - Hotfix
      - Beta
  dot-demo:
    type: dot
    title: Monthly Temperatures
    file: charts/temperature.csv
  scatter-demo:
    type: scatter
    title: Population vs GDP
    file: charts/scatter-demo.csv
    titleX: Population (millions)
    titleY: GDP (trillions)
  sankey-demo:
    type: sankey
    title: Budget Allocation
    file: charts/sankey-demo.csv
---

## Overview

Uncharted supports six chart types, each suited for different data visualization needs.

| Type | Description | Negative Values |
|------|-------------|-----------------|
| `donut` | Pie/donut chart using conic-gradient | No |
| `stacked-bar` | Horizontal bars with stacked segments | No |
| `stacked-column` | Vertical columns with stacked segments | Yes |
| `dot` | Categorical dot chart with Y-axis positioning | Yes |
| `scatter` | XY scatter plot with continuous axes | Yes (X and Y) |
| `sankey` | Flow diagram showing relationships between nodes | No |

## Donut Charts

Donut charts display proportional data using CSS `conic-gradient`. They automatically adapt to their container width using CSS container queries.

```yaml
charts:
  donut-demo:
    type: donut
    title: Browser Market Share
    showPercentages: true
    data:
      - label: Chrome
        value: 65
      - label: Safari
        value: 18
      - label: Firefox
        value: 10
      - label: Edge
        value: 7
```

<div class="chart-example">

{% chart "donut-demo" %}

</div>

### Center Content

Display a value or label in the center of the donut:

```yaml
center:
  value: total    # Display sum of all values
  label: Users    # Label below the value
```

Use `value: total` for automatic sum, or specify a custom number.

## Stacked Bar Charts

Horizontal bar charts with multiple series stacked per row. Best for comparing categories with long labels.

```yaml
charts:
  bar-demo:
    type: stacked-bar
    title: Team Growth
    file: charts/platform-growth.csv
    legend:
      - Existing
      - New Hires
```

<div class="chart-example">

{% chart "bar-demo" %}

</div>

## Stacked Column Charts

Vertical column charts with stacked series. Supports negative values, which stack downward from zero.

```yaml
charts:
  column-demo:
    type: stacked-column
    title: Release Cadence
    file: charts/releases.csv
    legend:
      - Production
      - Hotfix
      - Beta
```

<div class="chart-example">

{% chart "column-demo" %}

</div>

### Rotated Labels

For long category labels, use `rotateLabels: true`:

```yaml
rotateLabels: true
```

## Dot Charts

Categorical dot charts position points along a Y-axis. Supports negative values.

```yaml
charts:
  dot-demo:
    type: dot
    title: Monthly Temperatures
    file: charts/temperature.csv
```

<div class="chart-example">

{% chart "dot-demo" %}

</div>

## Scatter Charts

XY scatter plots with continuous axes on both dimensions. Supports negative values on both axes.

```yaml
charts:
  scatter-demo:
    type: scatter
    title: Population vs GDP
    file: charts/scatter-demo.csv
    titleX: Population (millions)
    titleY: GDP (trillions)
```

<div class="chart-example">

{% chart "scatter-demo" %}

</div>

### Axis Titles

By default, axis titles come from CSV column names. Override with explicit titles:

```yaml
titleX: "Population (millions)"
titleY: "GDP (trillions)"
```

### Series Grouping

If your CSV has a fourth column, points are grouped into series and colored accordingly:

```csv
country,population,gdp,region
USA,330,21,Americas
China,1400,14,Asia
Germany,83,4,Europe
```

## Sankey Charts

Sankey diagrams visualize flows between nodes across multiple levels. The width of each flow represents its value.

```yaml
charts:
  sankey-demo:
    type: sankey
    title: Budget Allocation
    file: charts/sankey-demo.csv
```

<div class="chart-example">

{% chart "sankey-demo" %}

</div>

### Data Format

Sankey charts require three columns: source, target, and value:

```csv
source,target,value
Budget,Marketing,50000
Budget,Development,120000
Marketing,Social,30000
Marketing,Ads,20000
Development,Frontend,60000
Development,Backend,60000
```

Nodes are automatically arranged into levels based on the flow relationships.

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `nodeWidth` | 20 | Width of node bars in pixels |
| `nodePadding` | 10 | Vertical gap between nodes in pixels |
| `endLabelsOutside` | false | Position last level labels on the right |

Use `endLabelsOutside: true` when the last level has many nodes with long labels:
