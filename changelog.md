# changelog

This document started at v0.1.0 on branch `markdown`.

The initial work on master branch included:

- initializing gridsome project
- stripping away gridsome default content
- bringing in the `<header>` from zelip.me

## 1. Add prose content to site build pipeline via markdown

- starting point: v0.1.0
- starting branch: markdown
- ending point: v0.2.0
- see README.md for reasons behind this
- steps:
  - got rid of all the gridsome stuff, kept the vue components and logic
  - got DIY markdown in vue working

## 2. Port existing zelip.me UI to this repo

- starting point: v0.2.1
- starting branch: port-existing-site
- ending point: v0.3.0
- steps:
  - modify the components already here in the repo

Note: I don't like how I had to create the extra div wrapper for the markdown content. What then happens, is the styles for the markdown content have to go to the parent div for the markdown content to inherit. That's wack.

## 3. CSS

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

## 4. Programmatically remove the bundle loaded via `<script>` in dist/index.html

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

## 5. Point custom domain at netlify

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

## 6. Refactor font-awesome from css/webfonts to svg/vue components

- starting point: v1.0.0
- ending point: v1.1.0
- branch: fa-upgrade
- steps:
  - follow the [vue-awesome docs](https://github.com/Justineo/vue-awesome)
  - will need to use the fontawesome token for their private npm registry
    - this requires use of netlify's environment variables that i'll have to look into
  - included looking into the [.npmrc file](https://docs.npmjs.com/files/npmrc) and environment variables
  - set up netlify build environment variable for font awesome pro token
  - solved the npm config bug by [changing the env variable syntax in the npm config file](https://stackoverflow.com/a/48728994/2145103), via commit #a34a7b0.
    - Also, see my [!SO answer to the same question](https://stackoverflow.com/a/55441931/2145103) I had!!
    - Also see [this gist guidance](https://stackoverflow.com/a/55441931/2145103) as a result of my work on this branch.
  - Once the font awesome svg in js, and vue-fontawesome, and npm installing from private repo is all set up, the next thing to do is optimize perf by interveing in the css that fontawesome-svg-core auto injects into the dom. See [the api docs](https://fontawesome.com/how-to-use/with-the-api/setup/configuration).

### Analysis of the perf impact of refactoring font awesome usage

#### zelip.me, master branch, behind fa-upgrade branch

- html: 2.03kb
- css: 5.59kb
- jpg: 62.32kb
- fa-light.woff2: 153.38kb
- fa-brands.woff2: 73.05kb
  - **Total: 296.37**

#### fa-upgrade branch, before fa API config autoAddCss

- html: 12.69kb (gained 10.66)
- css: 3.16kb (lost 2.43)
- jpg: 62.32kb
- webfonts (lost 226.43)
  - **Total: 78.17**

##### Difference with master, pre-fa API config, and considering webfonts

**_Difference: 218.2kb, or 73.6% reduction_**

The difference is:

- increased html (+10.66kb): because swapping one line element `<i>` for multi-line `<svg>` and injecting css into `<head>`, to a tune off PLUS 10.66

- decreased css (-2.43kb): because deletion of css and webfonts dependency, and new svg in js font-awesome styles injected into dom not stylesheet

- deleted webfonts (-226.43kb): because deletion of css and webfonts dependency

##### Difference with master, pre-fa API config, and NOT considering webfonts

- master branch total, no webfonts: 69.94
- fa-upgrade branch total: 78.17

  - **_difference: gained 8.23kb_**

So, not considering web fonts, master is better. And yes, web fonts get cached, so after initial load, the fonts are cached. But, first impression matters, cause how many folks will be going to _this_ site. (A different site may be a very different matter, tought for the future.) And yes, mobile matters. So the webfonts loss is great. But, I'm going to find a way to remove more css soon, so stay tuned!

#### fa-upgrade branch, after fa API config autoAddCss

- html: 5.65kb
- css: 3.35kb
- jpg: 62.32kb
- webfonts (lost 226.43)
  - **Total: 71.32**

##### Difference with master, post-fa API config, and considering webfonts

- master total = 296.37
- this branch point total = 71.32

**_Difference: 225.05kb, or 75.9% reduction_**

- increased html (+3.62kb): because swapping one line element `<i>` for multi-line `<svg>`, and no injected styles in the `<head>`

- decreased css (-2.24kb): because deletion of css and webfonts dependency, and added styles to css via main.css

- deleted webfonts (-226.43kb): because deletion of css and webfonts dependency

##### Difference with master, post-fa API config, and NOT considering webfonts

- master branch total, no webfonts: 69.94
- fa-upgrade branch total: 71.32

  - **_difference: gained 1.38kb_**

So, the difference for desktop being a gain of 1.38kb, while the loss for mobile being over 100kb, IS SO AWESOME!

##### Difference with fa-upgrade pre-fa API config and fa-upgrade post-fa API config

- fa-upgrade pre-fa API config total: 78.17
- fa-upgrade post-fa API config total: 71.32

  - **_difference: lost 6.85kb_**

So, redirecting the fa auto injected css from the dom to a stylesheet where purgecss has access to it IS SO AWESOME!

#### Analysis conclusion

| resource | master | fa-upgrade pre-API config | fa-upgrade post-API config |
| -------- | ------ | ------------------------- | -------------------------- |
| html     | 2.03   | 12.69                     | 5.65                       |
| css      | 5.59   | 3.16                      | 3.35                       |
| jpg      | 62.32  | 62.32                     | 62.32                      |
| woff2a   | 153.38 | 0                         | 0                          |
| woff2b   | 73.05  | 0                         | 0                          |

\* all numbers in kb

### On configuring Purgecss for font awesome, or, On getting fa-svg-core and vue-fontawesome together to play nicely with purgecss

this branch added the following to purgecss.config.js:

```js
{
  whitelistPatterns: [/svg-inline--fa/, /fa-w-14$/, /fa-w-16$/],
  keyframes: true
}
```

**The reason for the file update**

I thought this branch's work was complete, until I looked at the branch preview and found that the FA styles were not being applied to the FA icons (that is, the icons were rendered, but the icons were YUUUGE). Inspecting the built css file, sure enough, the only FA-specific styles that made it to production were a pair of @keyframes.

I tried a bunch of adjustments, but nothing worked.

Then I finally read the [Purgecss configuration docs](https://www.purgecss.com/configuration).

- `keyframes: true`, eleminates any unused keyframes
- `whitelistPatterns: [/svg-inline--fa/, /fa-w-14$/, /fa-w-16$/]`, gets the four styles needed to render my use of FA

## 7. Fix build failure

- starting point: v1.1.0
- ending point: v1.1.1
- branch: fix-install-bug

I ran into a Netlify build failure when I published the above v1.1.0 work.

I struggled quite a bit and pivoted to two repos ([first](https://github.com/brianzelip/fa-pro-netlify-test), [second](https://github.com/brianzelip/npm-private-mods-test)) to finally figure the somewhat mundane solution.

**tl;dr**: create shell-based persistant environment variables, and use the curly braces variable syntax in .npmrc for local dev and Netlify builds 🍻

## 8. Refactor Basscss from local file to project dependency

- starting point: v1.1.1
- ending point: v1.2.0
- branch: basscss

steps:

1. delete src/css/basscss
2. install basscss@7.1.1
3. update main.css
