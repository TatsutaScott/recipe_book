<template>
  <h1 class="title">Recipes</h1>
  <div class="tag_container">
  <span v-for="tag in all_tags" :key="tag"
      class="tag" :class="{ active: selected_tags.has(tag) }"
      @click="toggleTag(tag)"
      type="button"> {{ tag }} </span>
</div>
  <div id="thumb_container">
    <recipe_thumb
      v-for="recipe in filtered_recipes" :key="recipe"
      :id="recipe.id"
      :title="recipe.title"
      :tags="recipe.tags"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import recipe_thumb from "@/components/recipe_thumb_comp.vue";

const recipe_index = ref([]);
const selected_tags = ref(new Set()); // multi-select

const all_tags = computed(() => {
  const tagSet = new Set();

  recipe_index.value.forEach(recipe => {
    recipe.tags?.forEach(tag => {
      tagSet.add(tag);
    });
  });

  return [...tagSet].sort();
});

onMounted(async () => {
  const base = import.meta.env.BASE_URL; // usually "/"
  recipe_index.value = await fetch(`${base}recipes-index.json`).then((r) => r.json());
});

function toggleTag(tag) {
  const next = new Set(selected_tags.value); // clone so Vue reacts
  if (next.has(tag)) next.delete(tag);
  else next.add(tag);
  selected_tags.value = next;
}

const filtered_recipes = computed(() => {
  const chosen = [...selected_tags.value];
  if (chosen.length === 0) return recipe_index.value;

  // AND mode (swap in instead):
  return recipe_index.value.filter((recipe) => {
    const tags = recipe.tags ?? [];
    return chosen.every((t) => tags.includes(t));
  });
});
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.active{

  color:$color_text_light !important;
  border-color: $color_text_light !important;
}

#thumb_container{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tag_container{
  @include row;
  flex-wrap: wrap;
  @include section;
}
</style>
