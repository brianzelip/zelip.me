# zelip.me

Brian Zelip's home page. Rewritten in [Vue.js](https://github.com/vuejs/vue) using [Gridsome](https://github.com/gridsome/gridsome).

# why Gridsome

The point is to use modern js tooling for my personal site, instead of jekyll or raw html.

The output of most of the tooling I'm currently enjoying, including Vue, is more intended for the web-as-application-platform.

Since the personal home page is a classic example of the web-as-document-platform, it's hard to justify using web-as-application-platform tooling over raw html or jekyll via github pages.

I've recently been considering organizing a new gh repo to hold the output build of some non-jekyll site builder; where one repo is the site source, and another repo is the site build, which is hosted on the www. In this regard, there could be some `deploy` npm script that builds the site then pushes the built dir to a particular repo.

However, after recently learning of [Gridsome](https://gridsome.org), a [Gatsbyjs](https://gatsbyjs.org)-like static site generator for Vue, I figured I'd try it.

This project doesn't intend to embrace one of the main features of Gridsome: that it generates an initial static site that hydrates into a full Vue application.

## extending Gridsome's user experience, or, a personal touch of web dev taste

I'd like to write some portions/content of the site in markdown. My bio line is a good example.

Instead of writing the raw html, like via index.html in brianzelip.github.io, or via a template literal in vue like in commit #dec9e0183, I'd like to write the bio in markdown, and **only** edit such a natural prose-writing environment when it comes to changing _textual/narrative/prose content_ of the site.

As a result, I think the direction I want to take includes a workflow something like the following:

1. write some content in markdown
2. import that content in a Vue component
3. transform the markdown into something the Vue `<template>` understands
4. inject the content into the Vue `<template>`

Some initial tools to consider for guidance might be [markdown-it](https://github.com/markdown-it/markdown-it) or [@gridsome/transformer-remark](https://gridsome.org/plugins/@gridsome/transformer-remark).

## About this branch as of v0.1.0

branch name: final-state-on-markdown-v0.1.0-with-not-gridsome-working

After struggling with getting markdown imported into a vue template on the `markdown` branch, I started a new work space to figure out using markdown in vue templates.

This lead to looking at jsx in vue render function, and to mdx. That small bit of work lead to lots of research into lower-level topics than I'm used to working on, namely: hacking on mdx's vue loading package to make mdx work for vue, ASTs, and prerendering.

Whereas the best my markdown-vue could do at the time was use imported markdown in a vue template, as any other data/computed property, there was still a large js bundle file inserted into the final static output html. Instead of working to try and figure out how to leverage a lower-level build system to not include that js file in the final output, I'm going to run my own middleware between building for deployment and deployment that will remove the script element that imports the js bundle before pushing to master.

**This repo represents the final work on the markdown branch where work was in progress to get gridsome import markdown for use in a template. This work was not going well, which lead to the new repository markdown-vue, which didn't go so well, so now we're back full circle to making a static site out of vue templates with a small jr dev hack for the sake of performance.**

The other repo, `final-state-on-master-v0.1.0-with-gridsome-working`, represents the final work on the master branch where gridsome was working for everything except the bio statement.
