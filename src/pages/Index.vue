<template>
  <Layout>
    <main class="sm-mt3 md-mt4 sm-mb4 narrow-container white">
      <div class="flex flex-column">
        <p class="h2 p1 m0 fw-200">{{ bio }}</p>
      </div>
    </main>
  </Layout>
</template>

<script>
const MarkdownIt = require("markdown-it");

import Bio from "../content/bio.md";

const md = new MarkdownIt();

export default {
  computed: {
    bio() {
      return md.render(Bio);
    }
  }
};
</script>
