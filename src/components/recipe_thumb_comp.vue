<template>
  <a class="recipe_thumb"  :href="`/recipe/${props.id}`">
     <div class="recipe_name">
      <h1 class="title_en">{{ props.title.en }}</h1>
      <h2 v-if="props.title.lang != 'en'" class="title_fo" :class="lang">{{ props.title[props.title.lang] }}</h2>
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

<style>

.recipe_thumb {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  text-decoration: none;
  padding: 0.5em;
  border: 1pt dashed gray;
  border-radius: 5px;
  background-color: white;
  transition: 0.5s;
}

.recipe_thumb:hover{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: rgba(225, 225, 255, 0.5);
}

.recipe_name {
  display: flex;
  justify-content: flex-start;
  gap: 0.5em;
  align-items: baseline;
  h1,
  h2 {
    margin: 0;
  }
}

.title_en {
  font-size: 24pt;
  font-family: Migra_bold;
  color: blue;
}

.title_fo {
  font-size: 16pt;
  color: gray;
  font-family: Migra_bold;
}

.tag{
  font-family: Neue_Montreal;
  color: gray;
  font-size: 11pt;
  padding: 0.25em;
  border: 1pt dashed gray;
  border-radius: 5px;
}

#tags_container{
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 0.25em;
  padding: 0.25em 0;
}
</style>
