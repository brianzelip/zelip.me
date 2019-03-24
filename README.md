# zelip.me

Brian Zelip's home page. Rewritten in [Vue.js](https://github.com/vuejs/vue) using [Gridsome](https://github.com/gridsome/gridsome).

## About this branch

branch name: final-state-on-master-v0.1.0-with-gridsome-working

After struggling with getting markdown imported into a vue template on the `markdown` branch, I started a new work space to figure out using markdown in vue templates.

This lead to looking at jsx in vue render function, and to mdx. That small bit of work lead to lots of research into lower-level topics than I'm used to working on, namely: hacking on mdx's vue loading package to make mdx work for vue, ASTs, and prerendering.

Whereas the best my markdown-vue could do at the time was use imported markdown in a vue template, as any other data/computed property, there was still a large js bundle file inserted into the final static output html. Instead of working to try and figure out how to leverage a lower-level build system to not include that js file in the final output, I'm going to run my own middleware between building for deployment and deployment that will remove the script element that imports the js bundle before pushing to master.

**This repo represents the final work on the master branch where gridsome was working for everything except the bio statement.**

The other repo, `final-state-on-markdown-v0.1.0-with-not-gridsome-working`, represents the final work on the markdown branch where work was in progress to get gridsome import markdown for use in a template. This work was not going well, which lead to the new repository markdown-vue, which didn't go so well, so now we're back full circle to making a static site out of vue templates with a small jr dev hack for the sake of performance.
