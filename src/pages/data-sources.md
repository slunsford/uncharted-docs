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
    max: 25
    file: charts/platform-growth.csv
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
    "legend": ["Production", "Hotfix", "Beta"]
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
- Header row names become legend labels

### Scatter Plot Format

For scatter plots, columns are positional:

```csv
country,population,gdp,region
USA,330,21,Americas
China,1400,14,Asia
Germany,83,4,Europe
```

1. First column: point labels
2. Second column: X values
3. Third column: Y values
4. Fourth column (optional): series grouping

Column names become axis titles by default.

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
