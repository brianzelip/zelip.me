<template>
  <Layout>
    <div v-html="$page.bio.content"></div>
  </Layout>
</template>

<page-query>
query Bio () {}
</page-query>