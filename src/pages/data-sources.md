---
title: Data Sources
subtitle: CSV files, inline data, and global definitions
charts:
  inline-demo:
    type: donut
    title: Task Status
    data:
      - label: Complete
        value: 45
      - label: In Progress
        value: 30
      - label: Pending
        value: 25
---

Charts can be defined in page frontmatter, global data files, or with inline data.

## Page Frontmatter

Define charts directly in a page's frontmatter. Reference them by name with the `chart` shortcode:

```markdown
---
charts:
  growth:
    type: stacked-bar
    title: Platform Growth
    subtitle: Models by domain
    file: charts/platform-growth.csv
    x:
      max: 25
    legend: true
---

{% raw %}{% chart "growth" %}{% endraw %}
```

## Global Data Files

Define reusable charts in `_data/charts.json` or `_data/charts.yaml`:

```json
{
  "releases": {
    "type": "stacked-column",
    "title": "Release Cadence",
    "file": "charts/releases.csv",
    "y": {
      "columns": {
        "production": "Production",
        "hotfix": "Hotfix",
        "beta": "Beta"
      }
    },
    "legend": true
  }
}
```

Then use on any page:

```markdown
{% raw %}{% chart "releases" %}{% endraw %}
```

Page-level chart definitions override global definitions with the same name.

## Inline Data

Embed data directly in frontmatter instead of referencing a file:

```yaml
charts:
  inline-demo:
    type: donut
    title: Task Status
    data:
      - label: Complete
        value: 45
      - label: In Progress
        value: 30
      - label: Pending
        value: 25
```

<div class="chart-example">

{% chart "inline-demo" %}

</div>

### Multi-Series Inline Data

For charts with multiple series (dot, line, column, bar), structure data with a category key and value keys:

```yaml
charts:
  multi-series:
    type: dot
    title: Monthly Metrics
    x:
      column: month
    y:
      columns:
        sales: Sales
        returns: Returns
    data:
      - month: Jan
        sales: 100
        returns: 10
      - month: Feb
        sales: 120
        returns: 15
      - month: Mar
        sales: 90
        returns: 8
```

## CSV File Format

CSV files use the first column as labels and subsequent columns as data series. Column names become legend labels by default.

### Standard Format

```csv
department,existing,new
Finance,11,11
Sales,16,2
Core,8,0
```

- First column: category labels
- Additional columns: data series values
- Header row names become legend labels (or specify with `y.columns`)

### Scatter Plot Format

For scatter plots, columns are positional unless explicitly mapped:

```csv
country,population,gdp,region
USA,330,21,Americas
China,1400,14,Asia
Germany,83,4,Europe
```

1. First column: point labels
2. Second column: X values (or column named `x`)
3. Third column: Y values (or column named `y`)
4. Additional columns: `series`, `size` (detected by name)

Or explicitly map columns:

```yaml
x:
  column: population
y:
  column: gdp
label:
  column: country
series:
  column: region
```

## File Paths

File paths are relative to the `dataDir` option (default: `_data`):

```yaml
file: charts/revenue.csv  # Resolves to _data/charts/revenue.csv
```

Configure the data directory in plugin options:

```javascript
eleventyConfig.addPlugin(uncharted, {
  dataDir: 'src/_data'  // Custom data directory
});
```
