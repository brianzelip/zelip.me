const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const file = process.argv[2];
const html = fs.readFileSync(file).toString(); // buffer.toString()

const dom = new JSDOM(html);

const document = dom.window.document;

const scriptEl = document.body.querySelector('script');

console.log('body PRE body.removeChild()', document.body.innerHTML);

document.documentElement.children[1].removeChild(scriptEl);

console.log('body POST body.removeChild()', document.body.innerHTML);

const unbundledHTML = dom.serialize();

console.log('unbundledHTML::::', unbundledHTML);
/*
final string =

<doctype>
<html>

*/
