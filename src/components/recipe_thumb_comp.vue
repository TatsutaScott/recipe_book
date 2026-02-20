<template>
  <a class="recipe_thumb"  :href="`/recipe/${props.id}`">
     <div class="recipe_name">
      <h1 class="thumb_title">{{ props.title.en }}</h1>
      <h2 v-if="props.title.lang != 'en'" class="thumb_alt_title" :class="lang">{{ props.title[props.title.lang] }}</h2>
    </div>
    <div id="tags_container">
      <span class="tag" v-for="tag in props.tags" :key="tag">{{tag}}</span>
    </div>
  </a>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  id: String,
  title:Object,
  tags: Array
});
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.recipe_thumb {
  @include dashed-rounded;
  background-color: $color_bg;
  padding: 0.5em;
  transition: 0.5s;
}

.recipe_thumb:hover{
  @include hover;
  background-color: $color_bg_hilite;
}

.recipe_name {
  @include row;
  flex-wrap: wrap;
}

#tags_container{
  @include row;
  padding: 0.25em 0;
}

.thumb_title{
  font-family: $font-title;
  color: $color_text_accent;
  font-size:  clamp($font-size-body, 10vh, $font-size-subheading);

}

.thumb_alt_title{
  font-family:$font-title;
  color: $color_text_light;
   font-size:  clamp($font-size-caption, 2vh, $font-size-subtitle);
}
</style>
