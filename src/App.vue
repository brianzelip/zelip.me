<template>
  <div>
    <h1>Brian Zelip</h1>
    <div v-html="bio"></div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";

import Bio from "./content/bio.md";

export default {
  computed: {
    bio() {
      const md = new MarkdownIt();
      return md.render(Bio);
    }
  }
};
</script>

