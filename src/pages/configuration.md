---
title: Configuration
subtitle: Complete options reference
---

## Chart Options

All options available when defining a chart:

| Option | Type | Description |
|--------|------|-------------|
| `type` | string | Chart type (required): `donut`, `stacked-bar`, `stacked-column`, `dot`, `scatter` |
| `title` | string | Chart title |
| `subtitle` | string | Subtitle below title |
| `file` | string | Path to CSV file (relative to dataDir) |
| `data` | array | Inline data array (alternative to file) |
| `max` | number | Maximum Y value for scaling |
| `min` | number | Minimum Y value for scaling (column, dot) |
| `maxX` | number | Maximum X value (scatter only) |
| `maxY` | number | Maximum Y value (scatter only) |
| `minX` | number | Minimum X value (scatter only) |
| `minY` | number | Minimum Y value (scatter only) |
| `titleX` | string | X-axis title (scatter only, defaults to column name) |
| `titleY` | string | Y-axis title (scatter only, defaults to column name) |
| `legend` | array | Custom legend labels |
| `center` | object | Donut center content |
| `showPercentages` | boolean | Show percentages in donut legend |
| `animate` | boolean | Override global animation setting |
| `format` | object | Number formatting options |
| `rotateLabels` | boolean | Rotate X-axis labels vertically |
| `downloadData` | boolean/string | Enable download link |

## Type-Specific Options

### Donut Charts

```yaml
charts:
  example:
    type: donut
    center:
      value: total        # or a specific number
      label: "Total"      # label below the value
    showPercentages: true # show % instead of values in legend
```

### Scatter Charts

```yaml
charts:
  example:
    type: scatter
    minX: 0
    maxX: 100
    minY: 0
    maxY: 50
    titleX: "X Axis Label"
    titleY: "Y Axis Label"
```

### Column/Dot Charts

```yaml
charts:
  example:
    type: stacked-column
    min: -50           # minimum Y value (for negative data)
    max: 100           # maximum Y value
    rotateLabels: true # vertical category labels
```

## Scaling Behavior

### Automatic Scaling

By default, charts automatically calculate the Y-axis range based on data:

- **Donut**: Always represents 100% of total
- **Bar/Column**: Scales to largest total value
- **Dot**: Scales from minimum to maximum value
- **Scatter**: Scales to contain all points with padding

### Manual Scaling

Override automatic scaling with `min` and `max`:

```yaml
charts:
  example:
    type: stacked-column
    min: 0
    max: 100
    file: charts/data.csv
```

For scatter charts, use `minX`, `maxX`, `minY`, `maxY`:

```yaml
charts:
  example:
    type: scatter
    minX: 0
    maxX: 1500
    minY: 0
    maxY: 25
```

## Legend Configuration

### From CSV Headers

By default, legend labels come from CSV column headers:

```csv
quarter,Production,Hotfix,Beta
Q1,4,2,6
```

Produces legend: Production, Hotfix, Beta

### Custom Labels

Override with the `legend` option:

```yaml
charts:
  example:
    type: stacked-column
    file: charts/releases.csv
    legend:
      - "Prod Releases"
      - "Hotfixes"
      - "Beta Releases"
```

## Plugin Options

Global options passed when registering the plugin:

```javascript
eleventyConfig.addPlugin(uncharted, {
  dataDir: '_data',              // CSV file directory
  animate: true,                 // enable animations
  cssPath: '/css/uncharted.css', // stylesheet output path
  injectCss: true,               // auto-inject CSS link
  downloadData: true,            // show download links
  dataPassthrough: true,         // copy CSVs to output
  dataPath: '/data/'             // public path for CSVs
});
```
