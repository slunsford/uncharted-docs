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
  scatter-size-demo:
    type: scatter
    title: Population, GDP & CO₂ Emissions
    file: charts/scatter-size-demo.csv
    titleX: Population (millions)
    titleY: GDP (trillions)
    legendTitle: Region
    sizeTitle: CO₂ (tonnes/capita)
  line-demo:
    type: line
    title: Monthly Temperatures
    file: charts/temperature.csv
    animate: true
  line-no-dots:
    type: line
    title: Monthly Temperatures
    file: charts/temperature.csv
    dots: false
  sankey-demo:
    type: sankey
    title: Website Traffic Flow
    file: charts/sankey-demo.csv
---

## Overview

Uncharted supports seven chart types, each suited for different data visualization needs.

| Type | Description | Negative Values |
|------|-------------|-----------------|
| `donut` | Pie/donut chart using conic-gradient | No |
| `stacked-bar` | Horizontal bars with stacked segments | No |
| `stacked-column` | Vertical columns with stacked segments | Yes |
| `dot` | Categorical dot chart with Y-axis positioning | Yes |
| `line` | Line chart connecting data points across categories | Yes |
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

## Line Charts

Line charts connect data points with line segments across categories. They share the same data format and axis behavior as dot charts.

```yaml
charts:
  line-demo:
    type: line
    title: Monthly Temperatures
    file: charts/temperature.csv
```

<div class="chart-example">

{% chart "line-demo" %}

</div>

### Hiding Dots

Use `dots: false` to show only the connecting lines:

```yaml
dots: false
```

<div class="chart-example">

{% chart "line-no-dots" %}

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

If your CSV has a column named `series`, points are grouped and colored accordingly:

```csv
country,x,y,series
USA,330,21,Americas
China,1400,14,Asia
Germany,83,4,Europe
```

### Size Dimension

Add a `size` column for variable dot sizes:

```yaml
charts:
  scatter-size-demo:
    type: scatter
    title: Population, GDP & CO₂ Emissions
    file: charts/scatter-size-demo.csv
    titleX: Population (millions)
    titleY: GDP (trillions)
    legendTitle: Region
    sizeTitle: CO₂ (tonnes/capita)
```

```csv
country,x,y,size,series
USA,330,21,9.8,Americas
China,1400,14,18.1,Asia
Germany,83,4,1.5,Europe
```

<div class="chart-example">

{% chart "scatter-size-demo" %}

</div>

The `sizeTitle` option adds a size legend showing the min/max values. Dot sizes scale linearly from min to max within the data range.

### Named Columns

Scatter charts detect columns by name (case-insensitive):

| Column | Purpose |
|--------|---------|
| First column | Point labels (for tooltips) |
| `x` | X-axis values |
| `y` | Y-axis values |
| `size` | Dot size (optional) |
| `series` | Series grouping (optional) |

If `x` and `y` columns aren't found by name, the second and third columns are used.

### Proportional Scaling

Use `proportional: true` to maintain the data's aspect ratio:

```yaml
proportional: true
```

This ensures that equal numeric ranges appear as equal visual distances on both axes, useful for geographic or scientific data.

### Legend Title

Display a title above the series legend with `legendTitle`:

```yaml
legendTitle: Region
```

## Sankey Charts

Sankey diagrams visualize flows between nodes across multiple levels. The width of each flow represents its value.

```yaml
charts:
  sankey-demo:
    type: sankey
    title: Website Traffic Flow
    file: charts/sankey-demo.csv
```

<div class="chart-example">

{% chart "sankey-demo" %}

</div>

### Data Format

Sankey charts require three columns in order: source, target, and value. The column names can be anything:

```csv
from,to,visitors
Search,Homepage,40000
Search,Product,35000
Social,Homepage,15000
Social,Blog,30000
Homepage,Signup,30000
Homepage,Bounce,45000
Product,Purchase,25000
```

Nodes are automatically arranged into levels based on the flow relationships.

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `nodeWidth` | 20 | Width of node bars in pixels |
| `nodePadding` | 10 | Vertical gap between nodes in pixels |
| `endLabelsOutside` | false | Position last-level labels on the right |
| `proportional` | false | Force proportional node heights for data integrity |

Use `proportional: true` to ensure node heights are strictly proportional to their values. The chart will grow as tall as needed to keep the smallest node visible, which may significantly increase the chart height when data values vary widely.
