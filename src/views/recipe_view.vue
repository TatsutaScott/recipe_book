<template>
  <div>
    <p v-if="error">{{ error }}</p>

    <div v-else-if="recipe">
      <h1>{{ recipe.title }}</h1>

      <h2>Ingredients</h2>
      <ul>
        <li v-for="i in recipe.ingredients" :key="i">{{ i }}</li>
      </ul>

      <h2>Steps</h2>
      <ol>
        <li v-for="s in recipe.steps" :key="s">{{ s }}</li>
      </ol>
    </div>

    <p v-else>Loading…</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipe = ref(null)
const error = ref(null)

async function loadRecipe(slug) {
  recipe.value = null
  error.value = null

  try {
    const res = await fetch(`/src/static/${slug}.json`)
    if (!res.ok) throw new Error('Recipe not found')
    recipe.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

watch(
  () => route.params.slug,
  (slug) => loadRecipe(slug),
  { immediate: true },
)
</script>

<style scoped></style>
