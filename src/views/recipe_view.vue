<template>
  <div>
    <p v-if="error">{{ error }}</p>

    <div v-else-if="recipe">
      <title_comp
        :title="recipe.title"
        :source="recipe.source"
        :time="recipe.time"
        :servings="recipe.servings"
        :date="recipe.date"
        :tags="recipe.tags"
      />

      <h2 class="subtitle">Ingredients</h2>
      <ingredients_comp :ingredients="recipe.ingredients"/>

      <h2 class="subtitle">Steps</h2>
        <steps_comp :directions="recipe.directions" />

      <h2 class="subtitle" v-if="recipe.notes">Notes</h2>
        <notes_comp :notes="recipe.notes" v-if="recipe.notes" />
    </div>
    <p v-else>Loading…</p>
  </div>
</template>

<script setup>
import title_comp from '@/components/title_comp.vue'
import ingredients_comp from '@/components/ingredients_comp.vue'
import steps_comp from '@/components/steps_comp.vue'
import notes_comp from '@/components/notes_comp.vue'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipe = ref(null)
const error = ref(null)

//load recipe data
async function loadRecipe(slug) {
  recipe.value = null
  error.value = null

  try {
    const res = await fetch(`/src/static/recipes/${slug}.json`)
    if (!res.ok) throw new Error('Recipe not found')
    recipe.value = await res.json()
  console.log(recipe.value)
  } catch (err) {
    error.value = err.message
  }
}

//load content
watch(
  () => route.params.slug,
  (slug) => loadRecipe(slug),
  { immediate: true },
)
</script>

<style lang="scss" >
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;
</style>
