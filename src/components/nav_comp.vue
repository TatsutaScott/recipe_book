<template>
  <div class="nav_container">
    <a class="link" href="/"><span class="material-icons">home</span></a>
    <a class="link" href="/TOC"><span class="material-icons">menu</span></a>
  </div>
</template>

<script setup></script>

<style scoped>
.nav_container {
  width: auto;
  display: flex;
  justify-content: space-between;
}

.link {
  padding: 0.5em;
  border-radius: 10px;
  color: black;
  transition: all 0.5s;
  line-height: 10pt;
}

.link:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>
