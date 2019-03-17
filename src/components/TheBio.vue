<template>
  <main class="sm-mt3 md-mt4 sm-mb4 narrow-container white">
    <div class="flex flex-column">
      <p
        class="h2 p1 m0 fw-200"
        v-html="bio"
      ></p>
    </div>
  </main>
</template>

<script>
import Bio from "../content/bio.md";

export default {
  computed: {
    bio() {
      return Bio;
    }
  }
};
</script>
