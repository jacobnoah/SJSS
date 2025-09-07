#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { processSJSS } = require('./index');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Please provide an SJSS file: npx sjss input.sjss');
  process.exit(1);
}

const sjssContent = fs.readFileSync(inputFile, 'utf-8');
const { css, js } = processSJSS(sjssContent, {
  outputCSS: 'output.css',
  outputJS: 'output.js'
});

fs.writeFileSync('output.css', css);
fs.writeFileSync('output.js', js);
console.log(`Generated output.css and output.js from ${inputFile}`);