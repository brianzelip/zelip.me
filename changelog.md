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
