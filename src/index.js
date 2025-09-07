const sass = require('sass');
const { parseSJSS } = require('./parser');
const { generateJS } = require('./generator');

function processSJSS(input, options = {}) {
  const { outputCSS = 'output.css', outputJS = 'output.js' } = options;

  // Preprocess to remove => directives for sass
  const lines = input.split('\n');
  const cleanedInput = lines
    .filter(line => !line.trim().startsWith('=>'))
    .join('\n');

  // Compile cleaned SCSS
  const css = sass.compileString(cleanedInput).css;

  // Parse directives for JS generation
  const directives = parseSJSS(input);
  const js = generateJS(directives);

  return { css, js, directives };
}

module.exports = { processSJSS };