<template>
  <div id="weight_conversion_container">
      <number v-model="fromAmount"  @update:modelValue="onFromAmountChange" :min="0" />
      <adv_dropdown v-model="fromUnit" :items="filteredUnits" />
      <span class="sentence-text"> of </span>
      <adv_dropdown v-model="ingredient" :items="ingredients" />
      <span class="sentence-text"> is equal to </span>
      <number v-model="toAmount" @update:modelValue="onToAmountChange" :min="0" />
      <adv_dropdown v-model="toUnit" :items="filteredUnits" />
      <span class="sentence-text">.</span>
  </div>
</template>

<script setup>
// import dropdown from '@/components/dropdown_comp.vue';
import adv_dropdown from './adv_dropdown_comp.vue';
import number from '@/components/number_comp.vue';
import { ref, watch } from 'vue';
import {  ingredient_conversion } from '@/scripts/conversions';
import ingredients from '@/assets/data/ingredient_conversions.json';
import units from '@/assets/data/units.json';


const fromUnit = ref("unit");
const fromAmount = ref('1');

const toUnit = ref("unit");
const toAmount = ref('1');

const ingredient = ref('ingredient')

const lastEdited = ref("from"); //tracks which direction to convert from
const filteredUnits = Object.fromEntries(
  // eslint-disable-next-line no-unused-vars
  Object.entries(units).filter(([_, value]) => value.type !== "temperature")
);
function onFromAmountChange(val) {
  lastEdited.value = "from";
  fromAmount.value = val;
}
function onToAmountChange(val) {
  lastEdited.value = "to";
  toAmount.value = val;
}

function recompute() {
  if(fromUnit.value === "unit" || toUnit.value === "unit" || ingredient.value === "ingredient") return;
  if (lastEdited.value === "from") {
    toAmount.value = ingredient_conversion(ingredient.value, fromUnit.value, toUnit.value, fromAmount.value);
  } else {
    fromAmount.value = ingredient_conversion(ingredient.value, toUnit.value, fromUnit.value, toAmount.value);
  }
}

// Recompute when either side changes OR units change.
watch([fromAmount, fromUnit, toUnit], () => { if (lastEdited.value === "from") recompute(); });
watch([toAmount, toUnit, fromUnit], () => { if (lastEdited.value === "to") recompute(); });

recompute(); // Initial compute
</script>

<style lang="scss" scoped>
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#weight_conversion_container{
  @include row($gap:7pt);
  flex-wrap: wrap;
  background-color: white;
  .sentence-text{
    font-size: $font-size-subtitle;
    font-family: $font-basic;
    color: $color_text_base;
  }
}
</style>
