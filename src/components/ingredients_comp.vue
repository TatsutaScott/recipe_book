<template>
  <div class="subsection" v-for="section in props.ingredients" :key="section">
    <h2 class="subsection_title" v-if="section.section_title">{{section.section_title}}</h2>
    <div class="ingredient_container" v-for="ingredient in section.ingredients" :key="ingredient">
      <div class="ingredient">
        <span>{{ingredient.name}}</span>
        <span v-if="ingredient.unit">{{ `${formatNumber(ingredient.amount)} ${ingredient.unit}`}}</span>
        <span v-else>{{ `${formatNumber(ingredient.amount)}`}}</span>
      </div>
      <div class="ingredient_note" v-if="ingredient.note">{{ ingredient.note }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { formatNumber } from '@/scripts/util';
const props = defineProps({ingredients: { type: Array}});
</script>

<style>
.ingredient{
  display: grid;
  grid-template-columns: 5fr 1fr;
  font-family: Neue_Montreal;
  font-size: 11pt;
}

.ingredient_container{
  padding: 0.125em 0.75em ;
  border-radius: 5px;
}
.ingredient_container:hover{
  background-color: rgba(225, 225, 255, 0.5);
}

.subsection_title{
  font-family: Neue_Montreal;
  font-size: 14pt;
}

.ingredient_note{
  font-family: Neue_Montreal;
  color:gray;
  font-style: italic;
  font-size: 11pt;
  margin-left: 1em;
}
</style>
