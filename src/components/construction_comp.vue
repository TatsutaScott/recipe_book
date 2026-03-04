<template>
  <div id="help_container">
    <span id="construction_icon" class="icon material-icons">construction</span>
    <h1 class="title">under construction</h1>
  </div>
</template>

<style lang="scss" >
@use '@/static/styles/global' as *;

#construction_icon{
  font-size: 4em;
}

#help_container{
  @include column;
}
</style>
