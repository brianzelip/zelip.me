const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const file = process.argv[2];
const html = fs.readFileSync(file).toString(); // buffer.toString()

console.log('file:', file);
console.log('html', html);
