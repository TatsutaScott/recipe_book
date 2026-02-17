<template>
  <div class="content">
    <nav_comp />
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import nav_comp from './components/nav_comp.vue'
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.content {
  padding: 1em;
  background-color: $color_bg;
}
</style>
