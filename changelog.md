# changelog

This document started at v0.1.0 on branch `markdown`.

The initial work on master branch included:

- initializing gridsome project
- stripping away gridsome default content
- bringing in the `<header>` from zelip.me

1. Add prose content to site build pipeline via markdown

- starting point: v0.1.0
- starting branch: markdown
- ending point: v0.2.0
- see README.md for reasons behind this
- steps:
  - got rid of all the gridsome stuff, kept the vue components and logic
  - got DIY markdown in vue working

2. Port existing zelip.me UI to this repo

- starting point: v0.2.1
- starting branch: port-existing-site
- ending point: v0.3.0
- steps:
  - modify the components already here in the repo

Note: I don't like how I had to create the extra div wrapper for the markdown content. What then happens, is the styles for the markdown content have to go to the parent div for the markdown content to inherit. That's wack.

3. CSS

- starting point v0.3.0
- ending point: v0.4.0
- starting branch: css
- steps:
  - thought about making my own stylesheet of _only_ the styles needed on this project, but I don't really want to put that work into it right now.
  - I'd like to try [Purgecss](https://www.purgecss.com/), via [parcel-plugin-purgecss](https://github.com/cprecioso/parcel-plugin-purgecss)
  - this means that my repo will be heavy on css (via the basscss stuff), but that's alright. At least the shipped document size will be as small as possible.

**CSS module thoughts: _Atomic css in the component, es6 import, bundler era_**

- every individual class is exported from its source file, something like:

  ```js
  // padding.js

  const p0 = { padding: 0}
  const p1 = { padding: 0.5rem}
  const p2 = { padding: 1rem}
  const p3 = { padding: 2rem}
  const p4 = { padding: 4rem}

  export { p0, p1, p2, p3, p4 };
  ```

  The code example above is not scalable, and isn't a smart use of js!
  Much refactoring should happen to make this creation of a style palette
  more automated and dynamic. Something more akin to:

  > the export default is a function that takes in some value
  > provided by the developer during component development.

- there can be groups of classes that can be installed together, ie: flexbox
- the overall css library can be installed via npm
- the library and/or individual classes and/or groups of classes
  can be es6 imported

---

Follow up for CSS branch work after diving into Purgecss, etc.

The parcel-plugin-purgecss worked! Ultimately, it was as easy as:

1. `npm i -D parcel-plugin-purgecss`
2. create purgecss.config.js and point it at the sources of markup and styles, ie:

```js
// purgecss.config.js
module.exports = {
  content: ['index.html', 'src/**/*.vue'],
  css: ['src/css/main.css']
};
```

I brought in all css files locally, and creted a main.css file that imports all the actual goods. Parcel handles this beautifully! It didn't even install any new deps when it ran into:

```css
/* main.css */
@import './basscss.css';
@import './zelip.me.css';
@import './font-awesome.css';
```

After this branch gets merged w/ master, I'm sure the percentage of css content in the repo is going to skyrocket. **Because of this, I still want to work on componentized css!**

4. Programmatically remove the bundle loaded via `<script>` in dist/index.html

- starting point: v0.4.0
- ending poing: v0.5.0
- starting branch: unbundle
- steps:

Here is the general idea:

after `parcel build index.html`, feed dist/index.html into a function that returns it with the `<script>` element removed (parcel loads the bundle js file (even though _there is no javascript in use on the page_)

this implies:

- a js program that can be ran from CLI, ie: `node removeElement.js`
- the `build` script gets updated to something like:

```json
{
  "build": "rm -rf dist .cache && parcel build index.html && node removeElement.js dist/index.html"
}
```

removeElement.js does the following:

1. finds file to remove element from based on argument (dist/index.html)
2. removes element from file
3. saves file

---

4. Point custom domain at netlify

- starting point: v0.5.0
- ending point: v1.0.0
- starting branch: domain
- steps:
  - change pointers in godaddy
  - deprecate brianzelip.github.io

Netlify custom domain set up resources:

1. [Custom Domains](https://www.netlify.com/docs/custom-domains/)
2. [To WWW or not WWW](https://www.netlify.com/blog/2017/02/28/to-www-or-not-www/)
3. [Manual DNS Configuration for Root and WWW Custom Domains](https://www.netlify.com/docs/custom-domains/#manual)

- This screenshot was particulary useful for configuring Godaddy DNS:

![Godaddy DNS records panel](https://cdn.netlify.com/ea7e82783411b2f0cdf69136d492cb69215470c0/a1706/img/blog/godaddy-dns-records.png)

Here is the documentation for the records that I added to my Goadaddy DNS config for this branch work:

```tsv
CNAME	www	zelip.netlify.com	1 Hour

A	@	104.198.14.52	1 Hour
```
