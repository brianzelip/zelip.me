const { readFileSync } = require('fs');
const { join } = require('path');

const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

const bio = './bio.md';

module.exports = md.render(readFileSync(join(__dirname, bio), 'utf-8'));
