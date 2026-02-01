# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` - Start dev server with hot reload
- `npm run build` - Production build to `_site/`

## Architecture

This is an Eleventy 3.x documentation site for the [eleventy-plugin-uncharted](https://github.com/slunsford/uncharted) CSS chart plugin. Deployed to `uncharted.seanlunsford.com`.

### Directory Structure

- `src/pages/` - Markdown documentation pages (use `doc.njk` layout via `pages.11tydata.js`)
- `src/_data/` - Site metadata (`site.yml`, `nav.yml`) and chart CSV files in `charts/`
- `src/_layouts/` - `base.njk` (HTML shell) and `doc.njk` (three-column layout)
- `src/_includes/` - `sidebar.njk` (navigation) and `toc.njk` (table of contents)
- `src/css/` - Modular vanilla CSS imported into `style.css`

### Key Patterns

**Charts in documentation**: Define charts in page frontmatter, render with `{% chart "name" %}` shortcode. CSV data lives in `src/_data/charts/`.

**TOC generation**: The `toc` filter in `eleventy.config.js` extracts H2/H3 headings from rendered content for the table of contents.

**Responsive layout**: Three columns (sidebar/content/TOC) collapse to two then one column via CSS media queries. Mobile sidebar uses ~15 lines of vanilla JS for toggle.

**YAML data files**: Enabled via `js-yaml` package and `addDataExtension` in config.

## CSS Guidelines

- Vanilla CSS only, no build step
- Use `light-dark()` for automatic dark mode
- Semantic class names, no utilities
- Modular files imported into `style.css`
