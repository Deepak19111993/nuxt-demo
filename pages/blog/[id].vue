<template>
  <div class="blog-detail-wrapper">
    <h1>Blog Detail Page {{ $route.params.id }}</h1>
    <button @click="funClick">button</button>
  </div>
</template>

<script setup>
const route = useRoute();

// console.log("route", route);

const funClick = () => {
  console.log("funClick", route);
  navigateTo("/blog");
};
</script>

<style lang="scss">
.blog-detail-wrapper {
  padding: 0 10%;
}
</style>