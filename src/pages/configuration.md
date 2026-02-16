---
title: Configuration
subtitle: Complete options reference
---

## Zero Config Defaults

Uncharted works out of the box with minimal configuration. For most chart types, you only need `type` and `file`:

```yaml
charts:
  sales:
    type: stacked-column
    file: charts/sales.csv
```

With a CSV like:

```csv
quarter,revenue,costs,profit
Q1,100,80,20
Q2,120,90,30
Q3,140,85,55
Q4,160,95,65
```

Uncharted automatically:
- Uses the **first column** (`quarter`) as category labels
- Uses **remaining columns** (`revenue`, `costs`, `profit`) as data series
- Uses **column header names** as legend labels
- Calculates appropriate **axis scaling** from the data

This convention applies to most chart types:

| Chart Type | First Column | Remaining Columns |
|------------|--------------|-------------------|
| dot, line, stacked-column | X-axis categories | Y-axis series |
| stacked-bar | Y-axis categories | X-axis series |
| donut | Segment labels | Segment values |
| scatter | Point labels | Detected by name (`x`, `y`, `series`, `size`) |
| sankey | Source nodes | Target, then value |

When you need more control—custom labels, axis limits, number formatting—use the axis configuration options described below.

## Chart Options

All options available when defining a chart:

| Option | Type | Description |
|--------|------|-------------|
| `type` | string | Chart type (required): `donut`, `stacked-bar`, `stacked-column`, `dot`, `line`, `scatter`, `sankey` |
| `title` | string | Chart title |
| `subtitle` | string | Subtitle below title |
| `file` | string | Path to CSV file (relative to `dataDir`) |
| `data` | array | Inline data array (alternative to file) |
| `x` | object | X-axis configuration (see below) |
| `y` | object | Y-axis configuration (see below) |
| `proportional` | boolean | Maintain data aspect ratio (scatter, sankey) |
| `center` | object | Donut center content |
| `showPercentages` | boolean | Show percentages in donut legend |
| `legend` | boolean | Show/hide legend (default: true) |
| `animate` | boolean | Override global animation setting |
| `downloadData` | boolean/string | Enable download link |

### Column Definition Formats

Columns can be specified in three ways:

**Single column** (string):
```yaml
x:
  column: month
```

**Multiple columns** (array - uses column names as labels):
```yaml
y:
  columns: [prs, commits]
```

**Multiple columns with labels** (object):
```yaml
y:
  columns:
    prs: Pull Requests
    commits: Commits
```

### Axis Properties

Each axis can have these properties:

| Property | Type | Description |
|----------|------|-------------|
| `column` | string | Single column name |
| `columns` | array/object | Multiple columns, optionally with display labels |
| `min` | number | Minimum axis value |
| `max` | number | Maximum axis value |
| `title` | string | Axis title (scatter only) |
| `format` | object | Number formatting options |
| `rotateLabels` | boolean | Rotate labels vertically (x-axis only) |

### Axis Keys by Chart Type

| Chart Type | Axis Keys |
|------------|-----------|
| dot, line, stacked-column | `x` (categories), `y` (values) |
| stacked-bar | `y` (categories), `x` (values) |
| scatter | `x`, `y` (coordinates), `label`, `series`, `size` |
| donut | `label`, `value` |
| sankey | `source`, `target`, `value` |

## Chart Type Examples

### Dot Chart

```yaml
charts:
  example:
    type: dot
    title: "Chart Title"
    subtitle: "Optional subtitle"
    file: data.csv

    x:
      column: month              # Category column (default: first)
      rotateLabels: true         # Rotate labels vertically

    y:
      columns:                   # Value series with labels
        sales: Sales
        returns: Returns
      # OR: columns: [sales, returns]    # Array (use names as labels)
      # OR: column: revenue              # Single column
      min: 0
      max: 100
      format:
        thousands: true
        compact: true
        decimals: 1
        currency: { symbol: "$" }

    legend: true
    animate: true
    downloadData: true
```

### Line Chart

```yaml
charts:
  example:
    type: line
    title: "Trend Over Time"
    file: data.csv

    x:
      column: date
      rotateLabels: true

    y:
      columns:
        visitors: Unique Visitors
        pageviews: Page Views
      max: 100
      format: { compact: true }

    dots: true                   # Show dots at data points (default: true)
    legend: true
    animate: true
```

### Stacked Column Chart

```yaml
charts:
  example:
    type: stacked-column
    title: "Quarterly Results"
    file: data.csv

    x:
      column: quarter
      rotateLabels: true

    y:
      columns:
        revenue: Revenue
        costs: Costs
        profit: Profit/Loss
      min: -50
      max: 100
      format: { thousands: true }

    legend: true
    animate: true
    downloadData: "Download quarterly data"
```

### Stacked Bar Chart (Horizontal)

```yaml
charts:
  example:
    type: stacked-bar
    title: "Category Breakdown"
    file: data.csv

    y:
      column: category           # Categories on left side

    x:
      columns:                   # Value series (bars extend right)
        completed: Completed
        pending: Pending
        blocked: Blocked
      max: 100
      format: { compact: true }

    legend: true
    animate: true
    downloadData: true
```

### Scatter Chart

```yaml
charts:
  example:
    type: scatter
    title: "Correlation Analysis"
    file: data.csv

    x:
      column: population
      min: 0
      max: 1000
      title: "Population (millions)"
      format: { compact: true }

    y:
      column: gdp
      min: 0
      max: 50000
      title: "GDP per Capita"
      format:
        thousands: true
        currency: { symbol: "$" }

    label:
      column: country            # Point identifier for tooltips

    series:
      column: region
      title: Region              # Legend title

    size:
      column: area
      title: Land Area           # Size legend title

    proportional: true
    legend: true
    animate: true
```

### Donut/Pie Chart

```yaml
charts:
  example:
    type: donut
    title: "Market Share"
    file: data.csv

    label:
      column: category           # Segment names (default: first column)

    value:
      column: share              # Segment values (default: second column)
      format:
        compact: true
        currency: { symbol: "$" }

    center:
      value: total
      label: "Total Sales"
    showPercentages: true

    legend: true
    animate: true
```

### Sankey Chart

```yaml
charts:
  example:
    type: sankey
    title: "Budget Flow"
    file: data.csv

    source:
      column: from

    target:
      column: to

    value:
      column: amount
      format:
        compact: true
        currency: { symbol: "$" }

    nodeWidth: 20
    nodePadding: 10
    endLabelsOutside: true
    proportional: true

    legend: true
    animate: true
```

## Number Formatting

Format options can be specified at the axis level:

| Option | Type | Description |
|--------|------|-------------|
| `thousands` | boolean | Add thousand separators (1,000) |
| `compact` | boolean | Compact notation (1K, 1M) |
| `decimals` | number | Fixed decimal places |
| `currency` | object | Currency formatting |
| `currency.symbol` | string | Currency symbol ("$", "€") |
| `currency.position` | string | "before" or "after" |

Example:

```yaml
y:
  columns: [revenue, profit]
  format:
    thousands: true
    currency:
      symbol: "$"
      position: before
```

## Plugin Options

Global options passed when registering the plugin:

```javascript
eleventyConfig.addPlugin(uncharted, {
  dataDir: '_data/charts',       // CSV directory relative to root
  animate: true,                 // enable animations
  cssPath: '/css/uncharted.css', // stylesheet output path
  injectCss: true,               // auto-inject CSS link
  downloadData: true,            // show download links
  dataPassthrough: true,         // copy CSVs to output
  dataPath: '/data/'             // public path for CSVs
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `dataDir` | string | Eleventy's `dir.data` | Directory for CSV files, relative to root (e.g., `_data/charts`) |
| `animate` | boolean | `false` | Enable animations globally |
| `cssPath` | string | `'/css/uncharted.css'` | Output path for stylesheet |
| `injectCss` | boolean | `true` | Automatically inject CSS link |
| `downloadData` | boolean | `false` | Show download links on charts |
| `dataPassthrough` | boolean | `false` | Copy CSV files to output |
| `dataPath` | string | `'/data/'` | Public URL path for data files |

## Deprecated Options

The following options are deprecated and will be removed in version 1.0. They still work but emit console warnings during build.

### Column Mapping

| Deprecated | Use Instead |
|------------|-------------|
| `legend: ["Label1", "Label2"]` | `y: { columns: { key: "Label" } }` |

**Before:**
```yaml
legend: ["Pull Requests", "Commits"]
```

**After:**
```yaml
y:
  columns:
    prs: Pull Requests
    commits: Commits
```

### Axis Properties

| Deprecated | Use Instead |
|------------|-------------|
| `maxX` | `x: { max }` |
| `minX` | `x: { min }` |
| `maxY` | `y: { max }` |
| `minY` | `y: { min }` |
| `titleX` | `x: { title }` |
| `titleY` | `y: { title }` |
| `format: { x: {...} }` | `x: { format: {...} }` |
| `format: { y: {...} }` | `y: { format: {...} }` |
| `rotateLabels` | `x: { rotateLabels }` |

### Scatter Chart Options

| Deprecated | Use Instead |
|------------|-------------|
| `legendTitle` | `series: { title }` |
| `sizeTitle` | `size: { title }` |

### Migration Example

**Before:**
```yaml
charts:
  scatter:
    type: scatter
    maxX: 100
    maxY: 50
    titleX: "Population"
    titleY: "Growth"
    legendTitle: "Region"
    sizeTitle: "Area"
    format:
      x:
        thousands: true
      y:
        compact: true
```

**After:**
```yaml
charts:
  scatter:
    type: scatter
    x:
      max: 100
      title: "Population"
      format:
        thousands: true
    y:
      max: 50
      title: "Growth"
      format:
        compact: true
    series:
      title: Region
    size:
      title: Area
```

## Precedence Rules

When both new and deprecated options are present, the new schema always takes precedence:

1. `y: { columns: { key: "Label" } }` overrides `legend: []`
2. `x: { max }` overrides `maxX` and `max`
3. `series: { title }` overrides `legendTitle`
