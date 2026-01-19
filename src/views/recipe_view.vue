<template>
  <div>
    <p v-if="error">{{ error }}</p>

    <div v-else-if="recipe">
      <h1 id="title">{{ recipe.title.english }}</h1>

      <h2 class="subTitle">Ingredients</h2>
      <ul>
        <li class="ingredient" v-for="i in recipe.ingredients" :key="i">{{ i }}</li>
      </ul>

      <h2 class="subTitle">Steps</h2>
      <ol>
        <li class="step" v-for="s in recipe.steps" :key="s">{{ s }}</li>
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

//load recipe data
async function loadRecipe(slug) {
  recipe.value = null
  error.value = null

  try {
    const res = await fetch(`/src/static/recipes/${slug}.json`)
    if (!res.ok) throw new Error('Recipe not found')
    recipe.value = await res.json()
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

<style scoped>
@font-face {
  font-family: 'Migra_bold';
  src: url(@/assets/fonts/PPMigra-Extrabold.otf) format('opentype');
}

@font-face {
  font-family: 'Neue_Montreal';
  src: url(@/assets/fonts/PPNeueMontreal-Medium.otf) format('opentype');
}

#title {
  font-size: 24pt;
  font-family: Migra_bold;
}

.subTitle {
  font-family: Migra_bold;
}

.ingredient,
.step {
  font-family: Neue_Montreal;
}
</style>
