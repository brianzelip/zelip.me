const fs = require('fs');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const file = process.argv[2];
const html = fs.readFileSync(file).toString(); // buffer.toString()

const document = new JSDOM(html).window.document;
const doctype = document.doctype;

const scriptEl = document.body.querySelector('script');

console.log('body PRE body.removeChild()', document.body.innerHTML);

document.documentElement.children[1].removeChild(scriptEl);

console.log('body POST body.removeChild()', document.body.innerHTML);

/*
final string =

<doctype>
<html>

*/
