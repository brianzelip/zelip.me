# zelip.me

Brian Zelip's home page.

This iteration follows [my most recent GitHub Pages and jekyll powered home page](https://github.com/brianzelip/brianzelip.github.io). This new version looks the same as the jekyll site, but is written in javascript and [hosted on netlify](https://zelip.netlify.com).

I [tried using Gridsome](https://github.com/brianzelip/zelip.me/tree/1cff5c6bd92147537625aeb78f0ecf3065a386d3), but couldn't get it to work with markdown in the way that I want. I've been happier working with one less abstraction layer.

[mdx](https://mdxjs.com) isn't ready for Vue yet.

The environment of this version is based around Parcel. The stack is:

- [Parcel](https://parceljs.org), bundler environment
- [Vue](https://vuejs.org), component-driven development
- [parcel-plugin-markdown-string](https://github.com/jaywcjlove/parcel-plugin-markdown-string), markdown files to strings
- [markdown-it](https://github.com/markdown-it/markdown-it), render markdown in javascript
- [parcel-plugin-prerender](https://github.com/ABuffSeagull/parcel-plugin-prerender), prerender the vue app into a static site
- [parcel-plugin-purgecss](https://github.com/cprecioso/parcel-plugin-purgecss), ship the minimum css
