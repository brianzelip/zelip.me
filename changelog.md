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

## 9. Slim down local (non-dependency) css files

- starting point: v1.2.0
- ending point: v1.2.1
- branch: slim-css

steps:

- remove some of the unused css classes from design explorations
- remove some long meta comments in meta.css

## 10. Migrate GH-Pages sub directory projects to Netlify

While migrating my home page to netlify has been great fun, the downside that I did not anticipate is that there is no longer access to all the projects I had publicaly available as sub directories to zelip.me, ie: zelip.me/talks.

I've spent a lot of time trying to make this as automated as possible, but the reality is, there's lots of hands-on work ahead of me now that I've decided to move my home page to netlify.

(Maybe it's time to move back to GH Pages - hope my GH Actions beta invite gets accepted!)

Here's the main stuff that needs to happen for this:

- point each GH repo settings to netlify
- configure each new netlify site
- move all project code into a root level dir with the name of the project, ie: 'talks/', for zelip.me/talks/
- update all asset links to $PROJECTNAME/$ASSET/, whereas before it was, \$ASSET/
- update the \_redirects file in zelip.me

There's no branch name on this entry, because in order to debug \_redirects, the work needs to be available at zelip.me, which is necessarily the master branch. Same thing is true with the changes I'm making to github.com/brianzelip/talks - all work related to this is on the master branch, which is another strike against netlify in this regard.

HOWEVER...

I've been putting more thought into this dilemma, and I'm coming to side with Netlify. Here's why...

Ultimately, Netlify gives me more control over _publishing_.

Not only can I create the GH project pages effect (albeit with extra convolusions, but these convolusions are the price to pay for the above mentioned more control), but I can also create sub domains to zelip.me for projects outside the scope of sub directories, ie:

- talks is in sub dir scope
- groceries is in sud domain scope

Another big point - when using GH pages, I don't really have a grasp on what all is published behind brianzelip.github.io. This is to say, there's no easy way of looking up which GH repos I've configured to be GH Pages-enabled.

Using Netlify, however, provides such a list (\_redirects) as a byproduct of the covolutedness. I have to be EXPLICIT in documentation about what projects are published at zelip.me, this makes \_redirects be a kind of log of what is currently published to my site, since, in order to publish something extra, I have to configure it via \_redirecs. Not so with GH Pages - I have no clue what all is available at brianzelip.github.io/\*, even though I can trust that it is there.

Being explicit about things brings you another step closer to automation. So, yes, go forward with Netlify.

Ultimately, in going with Netlify, I'm being _more_ explicit about _my_ build processes, and my projects. I didn't have to be so before via GH, which is a benefit, but also a drawback in the sense of the personal growth that I've experienced in just the last month in trying to get this new system for a personal site set up. ie: In being explicit, and logging things, and even in taking one or two more steps that I did with GH (like createing a root directory for each project that contains the real project files, ie: talks/talks, and changing all asset links to /talks/...), I'm gaining much more in flexibility, capacity (serve apps!), and control.

**This means I need to create a netlify-theory repo!**

Now I get to explicitly plan out what I want available via my personal site:

- home page
- talks list
- cv doc
- blog list
- software projects list

## 11. Change avatar

- starting point: v1.2.1
- ending point: v1.2.2
- branch: update-avatar
- steps: swap out old headshot pic with new pic

## [1.2.3] - 2019-06-09

### Meta

- branch: security-fix

### Updated

- package*: Run npm audit fix to fix 14 vulnerabilities
- changeloge.md: Started with keep a changelog entry syntax