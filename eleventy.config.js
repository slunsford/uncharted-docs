import uncharted from 'eleventy-plugin-uncharted';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import markdownItAnchor from 'markdown-it-anchor';
import yaml from 'js-yaml';

export default function(eleventyConfig) {
  // YAML data file support
  eleventyConfig.addDataExtension('yml, yaml', contents => yaml.load(contents));

  // Uncharted chart plugin
  eleventyConfig.addPlugin(uncharted, {
    dataDir: 'src/_data',
    animate: true,
    downloadData: true,
    dataPassthrough: true,
    dataPath: '/data/'
  });

  // Syntax highlighting for code examples
  eleventyConfig.addPlugin(syntaxHighlight);

  // Configure markdown with heading anchors
  eleventyConfig.amendLibrary('md', (mdLib) => {
    mdLib.use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
      level: [2, 3],
      slugify: (s) => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
    });
  });

  // Wrap tables in scrollable container for mobile
  eleventyConfig.addTransform('wrapTables', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      return content.replace(/<table>/g, '<div class="table-wrapper"><table>').replace(/<\/table>/g, '</table></div>');
    }
    return content;
  });

  // Filter to extract headings for TOC
  eleventyConfig.addFilter('toc', (content) => {
    const headings = [];
    const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>.*?<a[^>]*>([^<]*(?:<[^/a][^>]*>[^<]*<\/[^a][^>]*>)*[^<]*)<\/a>.*?<\/h[23]>/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      // Clean up the heading text by removing any nested tags
      const text = match[3].replace(/<[^>]+>/g, '').trim();
      headings.push({
        level: parseInt(match[1]),
        id: match[2],
        text: text
      });
    }
    return headings;
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/icons');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');

  // Input/output directories
  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  };
}
