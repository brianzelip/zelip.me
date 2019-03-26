const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const file = process.argv[2];
const html = fs.readFileSync(file).toString(); // buffer.toString()

const dom = new JSDOM(html);
const document = dom.window.document;
const scriptEl = document.body.querySelector('script');

document.documentElement.children[1].removeChild(scriptEl);

const unbundledHTML = dom.serialize();

fs.writeFileSync(file, unbundledHTML, 'utf8');
