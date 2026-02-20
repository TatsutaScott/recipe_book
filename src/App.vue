<template>
    <nav_comp />
    <main id="content">
      <RouterView />
    </main>
</template>

<script setup>
import nav_comp from './components/nav_comp.vue'
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#content{
  margin: 0.5em;
  padding: 1em;
  background-color: $color-bg;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  max-width: 1000px;
  width: auto;
}

</style>
