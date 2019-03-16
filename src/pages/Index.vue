<template>
  <Layout>
    <main class="sm-mt3 md-mt4 sm-mb4 narrow-container white">
      <div class="flex flex-column">
        <p
          class="h2 p1 m0 fw-200"
          v-html="bio"
        ></p>
      </div>
    </main>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      bio: `Brian Zelip is a husband, father, and librarian. He runs the
          <a
            href="http://www.hshsl.umaryland.edu/services/ispace"
          >HS/HSL Innovation Space</a>, where he collaborates with library users to solve problems through
          design, 3D printing, and code.`
    };
  }
};
</script>
