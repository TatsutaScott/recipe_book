<template>
  <div class="content">
    <nav_comp />
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import nav_comp from './components/nav_comp.vue'
</script>

<style scoped>
.content {
  padding: 1em;
  background-color: rgb(243, 244, 247);
  color: rgb(43, 43, 48);
}
</style>
