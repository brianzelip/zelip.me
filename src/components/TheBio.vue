<template>
  <TheMain>
    <div class="flex flex-column">
      <div class="h2 p1 m0 fw-200" v-html="bio"></div>
    </div>
  </TheMain>
</template>

<script>
import MarkdownIt from "markdown-it";

import TheMain from "./TheMain.js";
import Bio from "../content/bio.md";

export default {
  components: {
    TheMain,
  },
  computed: {
    bio() {
      const md = new MarkdownIt();
      return md.render(Bio);
    },
  },
};
</script>
