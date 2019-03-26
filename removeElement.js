const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const file = process.argv[2];
const html = fs.readFileSync(file).toString(); // buffer.toString()

const dom = new JSDOM(html);
const document = dom.window.document;

const title = document.querySelector('title').innerHTML;

// console.log(`file:\t\t`, file);
// console.log(`html:\n`, html);
// console.log(`dom:\n`, dom);
console.log(`title:\t`, title);
