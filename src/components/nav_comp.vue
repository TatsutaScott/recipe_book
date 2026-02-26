<template>
  <div class="nav_container">
    <a class="link icon" href="/"><span class="material-icons">home</span></a>
    <a class="link icon" href="/help"><span class="material-icons">help</span></a>
    <a class="link icon" href="/tools"><span class="material-icons">calculate</span></a>
    <a class="link icon" href="/TOC"><span class="material-icons">article</span></a>
  </div>
</template>

<script setup></script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.nav_container {
  @include section;
  width: 100%;
  max-width: 1000px;
  @include row($justify: space-between, $align: center);
  background-color: $color_bg;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 5px;
}

.link {
  padding: 0.5em;
  border-radius: 10px;
  color: $color_text_base;
  transition: all 0.5s;
  line-height: 10pt;
}

.icon{
  color:$color_text_accent;
}

.link:hover {
  @include hover;
}
</style>
