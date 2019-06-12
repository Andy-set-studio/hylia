// Import filters
const markdownFilter = require('./src/filters/markdown-filter.js');

module.exports = function(config) {
  // Filters
  config.addFilter('markdown', markdownFilter);

  // Layout aliases
  config.addLayoutAlias('home', 'layouts/home.njk');

  // Passthrough copy
  config.addPassthroughCopy('src/fonts');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    passthroughFileCopy: true
  };
};
