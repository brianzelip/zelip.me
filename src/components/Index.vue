<template>
  <Layout>
    <TheHeader></TheHeader>
    <TheBio></TheBio>
  </Layout>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import TheBio from "../components/TheBio.vue";

export default {
  components: {
    TheHeader,
    TheBio
  }
};
</script>
