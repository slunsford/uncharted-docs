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
    x:
      columns:
        existing: Existing
        new: New Hires
  column-demo:
    type: stacked-column
    title: Release Cadence
    file: charts/releases.csv
  dot-demo:
    type: dot
    title: Monthly Temperatures
    file: charts/temperature.csv
    y:
      title: Temperature (°C)
  scatter-demo:
    type: scatter
    title: Population vs GDP
    file: charts/scatter-demo.csv
    x:
      title: Population (millions)
    y:
      title: GDP (trillions)
  scatter-size-demo:
    type: scatter
    title: Population, GDP & CO₂ Emissions
    file: charts/scatter-size-demo.csv
    x:
      title: Population (millions)
    y:
      title: GDP (trillions)
    series:
      title: Region
    size:
      title: CO₂ (tonnes/capita)
  line-demo:
    type: line
    title: Monthly Temperatures
    file: charts/temperature.csv
    y:
      title: Temperature (°C)
    animate: true
  line-no-dots:
    type: line
    title: Monthly Temperatures
    file: charts/temperature.csv
    y:
      title: Temperature (°C)
    dots: false
  sankey-demo:
    type: sankey
    title: Website Traffic Flow
    file: charts/sankey-demo.csv
  timeseries-demo:
    type: timeseries
    title: NZ Livestock Population
    file: charts/nz-livestock.csv
    y:
      title: Population
      format:
        compact: true
  timeseries-dots:
    type: timeseries
    title: Daily Temperatures
    subtitle: "2024"
    file: charts/daily-temps.csv
    dots: true
    y:
      columns:
        high: High
        low: Low
      title: Temperature (°C)
  bubble-demo:
    type: bubble
    title: Quarterly Performance
    file: charts/bubble-demo.csv
    series:
      title: Metric
    size:
      title: Market Value
  line-hide-lines:
    type: line
    title: Monthly Temperatures
    file: charts/temperature.csv
    y:
      title: Temperature (°C)
    lines: false
---

## Overview

Uncharted supports nine chart types, each suited for different data visualization needs.

| Type | Description | Negative Values |
|------|-------------|-----------------|
| `donut` | Pie/donut chart | No |
| `stacked-bar` | Horizontal bars with stacked segments | No |
| `stacked-column` | Vertical columns with stacked segments | Yes |
| `dot` | Categorical dot chart with Y-axis positioning | Yes |
| `line` | Line chart connecting data points across categories | Yes |
| `timeseries` | Line chart with continuous X-axis for time-based data | Yes |
| `bubble` | Categorical X, continuous Y with variable dot sizes | Yes |
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
    x:
      columns:
        existing: Existing
        new: New Hires
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
```

<div class="chart-example">

{% chart "column-demo" %}

</div>

### Rotated Labels

For long category labels, use `x.rotateLabels: true`:

```yaml
x:
  rotateLabels: true
```

## Dot Charts

> **Deprecated:** The `dot` chart type is deprecated. Please migrate to one of the following:
>
> - **Line chart with `lines: false`**: For the same visual appearance with no data changes required
> - **Bubble chart**: For variable-sized dots (requires data reformatting)
>
> See the [Line Charts](#line-charts) or [Bubble Charts](#bubble-charts) sections for details.

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

### Hiding Lines

Use `lines: false` to display dots without connecting lines (useful for migrating from dot charts):

```yaml
lines: false
```

<div class="chart-example">

{% chart "line-hide-lines" %}

</div>

This is the recommended migration path from the deprecated `dot` chart type—simply change `type: "dot"` to `type: "line"` and add `lines: false`.

### Hiding Dots

Use `dots: false` to show only the connecting lines:

```yaml
dots: false
```

<div class="chart-example">

{% chart "line-no-dots" %}

</div>

When `dots: false` is set and `icons` are configured, the icons appear in the legend only.

### Axis Titles

Add labels to the X or Y axis:

```yaml
x:
  title: Month
y:
  title: Temperature (°C)
```

## Time-Series Charts

Time-series charts render line charts with a continuous X-axis. Unlike line charts where categories are evenly spaced, time-series charts position data points proportionally based on their actual time values—so gaps in your data appear as gaps in the chart.

```yaml
charts:
  timeseries-demo:
    type: timeseries
    title: NZ Livestock Population
    file: charts/nz-livestock.csv
    y:
      format:
        compact: true
```

<div class="chart-example">

{% chart "timeseries-demo" %}

</div>

Time-series charts support both numeric years (1971, 2024) and ISO dates (2024-02-17). Axis tick intervals are calculated automatically based on the data range.

### Showing Dots

By default, time-series charts show lines without dots. Use `dots: true` to display dots at each data point:

```yaml
dots: true
```

<div class="chart-example">

{% chart "timeseries-dots" %}

</div>

When `dots: false` (the default) and `icons` are configured, the icons appear in the legend only.

### Axis Titles

Add labels to the X or Y axis:

```yaml
x:
  title: Year
y:
  title: Population
```

## Bubble Charts

Bubble charts combine categorical X-axis positioning with continuous Y values and variable-sized dots. They're ideal for showing three dimensions of data: category, value, and magnitude.

```yaml
charts:
  bubble-demo:
    type: bubble
    title: Quarterly Performance
    file: charts/bubble-demo.csv
    series:
      title: Metric
    size:
      title: Market Value
```

<div class="chart-example">

{% chart "bubble-demo" %}

</div>

### Data Format

Bubble charts expect CSV data with columns for X (categorical), Y (numeric), and size (numeric). An optional series column enables multi-series grouping:

**Simple (single series):**
```csv
x,y,size
Q1,45,1200
Q2,78,3400
Q3,62,2100
Q4,89,4500
```

**Multi-series:**
```csv
x,y,size,series
Q1,45,1200,revenue
Q1,320,800,users
Q2,78,3400,revenue
Q2,580,1500,users
```

### Column Detection

Bubble charts detect columns by name (case-insensitive):

| Column | Purpose |
|--------|---------|
| `x` | X-axis categories |
| `y` | Y-axis values |
| `size` | Dot size values |
| `series` | Series grouping (optional) |

If not found by name, the first three columns are used as x, y, and size respectively.

Or explicitly specify columns:

```yaml
x:
  column: category
y:
  column: value
size:
  column: magnitude
  title: Market Size    # Adds size legend
series:
  column: group
  title: Group          # Legend title
```

### Size Legend

Add a `size.title` to display a size legend showing min/max values:

```yaml
size:
  title: Market Value
```

## Scatter Charts

XY scatter plots with continuous axes on both dimensions. Supports negative values on both axes.

```yaml
charts:
  scatter-demo:
    type: scatter
    title: Population vs GDP
    file: charts/scatter-demo.csv
    x:
      title: Population (millions)
    y:
      title: GDP (trillions)
```

<div class="chart-example">

{% chart "scatter-demo" %}

</div>

### Axis Titles

Specify axis titles in the axis configuration:

```yaml
x:
  title: "Population (millions)"
y:
  title: "GDP (trillions)"
```

### Series Grouping

If your CSV has a column named `series`, points are grouped and colored accordingly:

```csv
country,x,y,series
USA,330,21,Americas
China,1400,14,Asia
Germany,83,4,Europe
```

Or explicitly specify the column:

```yaml
series:
  column: region
  title: Region    # Legend title
```

### Size Dimension

Add a `size` column for variable dot sizes:

```yaml
charts:
  scatter-size-demo:
    type: scatter
    title: Population, GDP & CO₂ Emissions
    file: charts/scatter-size-demo.csv
    x:
      title: Population (millions)
    y:
      title: GDP (trillions)
    series:
      title: Region
    size:
      title: CO₂ (tonnes/capita)
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

The `size.title` option adds a size legend showing the min/max values. Dot sizes scale linearly from min to max within the data range.

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

Or explicitly specify columns:

```yaml
x:
  column: population
y:
  column: gdp
label:
  column: country
series:
  column: region
size:
  column: area
```

### Proportional Scaling

Use `proportional: true` to maintain the data's aspect ratio:

```yaml
proportional: true
```

This ensures that equal numeric ranges appear as equal visual distances on both axes, useful for geographic or scientific data.

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

Sankey charts require three columns: source, target, and value. The column names can be anything:

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

Or explicitly specify columns:

```yaml
source:
  column: from
target:
  column: to
value:
  column: visitors
  format:
    compact: true
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
