<template>
  <div class="nav_container">
    <a class="link" href="/"><span class="material-icons">home</span></a>
    <a class="link" href="/TOC"><span class="material-icons">menu</span></a>
  </div>
</template>

<script setup></script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.nav_container {
  @include section;
  width: auto;
  display: flex;
  justify-content: space-between;
}

.link {
  padding: 0.5em;
  border-radius: 10px;
  color: $color_text_base;
  transition: all 0.5s;
  line-height: 10pt;
}

.link:hover {
  @include hover;
}
</style>
