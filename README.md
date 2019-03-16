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
