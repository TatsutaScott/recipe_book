<template>
  <div class="ingredients_container">
    <div class="subsection_container" v-for="section in props.ingredients" :key="section">
      <h2 class="subsection_title" v-if="section.section_title">{{section.section_title}}</h2>
      <p class="note" v-if="section.note">{{ section.note }}</p>
      <div class="ingredient_container">
        <div class="ingredient" v-for="ingredient in section.ingredients" :key="ingredient">
          <div class="ingredient-name-container">
            <span class="basic-text">{{ingredient.name}}</span>
            <span class="note" v-if="ingredient.note">{{ ingredient.note }}</span>
          </div>
          <div class="connecting-line"></div>
          <span class="basic-text ingredient-amount" v-if="ingredient.unit">{{ `${formatNumber(ingredient.amount)} ${ingredient.unit}`}}</span>
          <span class="basic-text ingredient-amount" v-else>{{ `${formatNumber(ingredient.amount)}`}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { formatNumber } from '@/scripts/util';
const props = defineProps({ingredients: { type: Array}});
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.ingredients_container{
  @include section;
  width: 100%;
}

.ingredient{
  @include row($justify: space-between);
  padding: 0.125em 0.5em;
  border-radius: 5px;
  transition: 0.5s;
}

.ingredient:hover{
  @include hover;
}

.ingredient_container{
  padding: 0.5em 0;
}

.ingredient-name-container{
  @include column($align: start, $gap: 0);
}

.connecting-line{
 background-color: $color_gray;
 width: 100%;
 flex: 1;
 height: 1px;
}
</style>
