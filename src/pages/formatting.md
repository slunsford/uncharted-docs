---
title: Value Formatting
subtitle: Thousands separators, currency, and compact notation
charts:
  thousands-demo:
    type: dot
    title: Monthly Revenue
    format:
      thousands: true
    data:
      - label: January
        value: 1234567
      - label: February
        value: 2345678
      - label: March
        value: 1876543
  compact-demo:
    type: stacked-bar
    title: User Growth
    format:
      compact: true
    data:
      - label: 2022
        value: 1500000
      - label: 2023
        value: 2800000
      - label: 2024
        value: 4200000
  currency-demo:
    type: dot
    title: Sales by Region
    format:
      thousands: true
      currency:
        symbol: "$"
    data:
      - label: North
        value: 125000
      - label: South
        value: 98000
      - label: East
        value: 142000
      - label: West
        value: 87000
---

Format displayed numbers with thousands separators, compact notation, or currency symbols. Raw values are preserved for calculations; only display output is affected.

## Format Options

| Option | Type | Description |
|--------|------|-------------|
| `thousands` | boolean | Add commas: `1000` → `1,000` |
| `compact` | boolean | Use suffixes: `1000` → `1K`, `1000000` → `1M` |
| `decimals` | number | Decimal places (default: 0, or 1 if compact) |
| `currency.symbol` | string | Currency symbol: `$`, `€`, etc. |
| `currency.position` | string | `prefix` (default) or `suffix` |

## Thousands Separators

Add commas to large numbers:

```yaml
charts:
  revenue:
    type: dot
    title: Monthly Revenue
    format:
      thousands: true
    file: charts/revenue.csv
```

<div class="chart-example">

{% chart "thousands-demo" %}

</div>

Result: `1234567` → `1,234,567`

## Compact Notation

Shorten large numbers with K/M/B suffixes:

```yaml
charts:
  users:
    type: stacked-bar
    title: User Growth
    format:
      compact: true
    file: charts/users.csv
```

<div class="chart-example">

{% chart "compact-demo" %}

</div>

Examples:
- `1500` → `1.5K`
- `2000000` → `2M`
- `3500000000` → `3.5B`

Compact notation defaults to 1 decimal place. Override with `decimals`:

```yaml
format:
  compact: true
  decimals: 0  # 1500 → 2K (rounded)
```

## Currency Symbols

Add currency prefix or suffix:

```yaml
charts:
  sales:
    type: dot
    title: Sales by Region
    format:
      thousands: true
      currency:
        symbol: "$"
    file: charts/sales.csv
```

<div class="chart-example">

{% chart "currency-demo" %}

</div>

Result: `1234` → `$1,234`

### Suffix Position

For currencies that follow the number (e.g., Euro in some locales):

```yaml
format:
  thousands: true
  currency:
    symbol: "€"
    position: suffix
```

Result: `1234` → `1,234€`

## Decimal Places

Control precision with `decimals`:

```yaml
format:
  decimals: 2
```

Works with all formatting options:

```yaml
format:
  thousands: true
  decimals: 2
  currency:
    symbol: "$"
# 1234.5 → $1,234.50
```

## Scatter Chart Formatting

Scatter charts support separate formatting for X and Y axes:

```yaml
charts:
  scatter:
    type: scatter
    file: charts/data.csv
    format:
      x:
        thousands: true
      y:
        compact: true
        currency:
          symbol: "$"
```

This applies different formatting to each axis independently.

## Combining Options

Multiple formatting options can be combined:

```yaml
format:
  thousands: true      # Add commas
  compact: true        # Use K/M/B (overrides thousands for large numbers)
  decimals: 1          # One decimal place
  currency:
    symbol: "$"        # Dollar sign prefix
```

Note: When both `thousands` and `compact` are true, `compact` takes precedence for numbers large enough to abbreviate.
