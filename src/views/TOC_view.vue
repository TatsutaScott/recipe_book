<template>
  <h1 class="title">Recipes</h1>
  <div id="thumb_container">
    <recipe_thumb
      v-for="recipe in recipe_index" :key="recipe"
      :id="recipe.id"
      :title="recipe.title"
      :tags="recipe.tags"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import recipe_thumb from "@/components/recipe_thumb_comp.vue";

const recipe_index = ref([]);

onMounted(async () => {
  const base = import.meta.env.BASE_URL; // usually "/"
  recipe_index.value = await fetch(`${base}recipes-index.json`).then((r) => r.json());
});

</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#thumb_container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>
