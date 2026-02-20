<template>
  <div id="title_container">
    <h1 id="main_title" class="title">A Collection of Recipes</h1>
  </div>
</template>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#main_title{
  text-align: center;
}

#title_container{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
