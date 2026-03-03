<template>
  <div class="conversion_container">
      <number v-model="fromAmount"  @update:modelValue="onFromAmountChange" :min="0" />
      <dropdown v-model="fromUnit" :options="filteredList" />

      <span class="sentence-text"> is equal to </span>
      <number v-model="toAmount" @update:modelValue="onToAmountChange" :min="0" />
      <dropdown v-model="toUnit" :options="filteredList" />
      <span class="sentence-text">.</span>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, computed } from 'vue';

import dropdown from '@/components/dropdown_comp.vue';
// import adv_dropdown from './adv_dropdown_comp.vue';
import number from '@/components/number_comp.vue';

import {  weight_conversion, temperature_conversion, volume_conversion } from '@/scripts/conversions';
import units from '@/assets/data/units.json';
import { filterByType,objectToArray} from '@/scripts/util';

const props = defineProps({type: String})

const fromUnit = ref("unit");
const fromAmount = ref('1');

const toUnit = ref("unit");
const toAmount = ref('1');

const lastEdited = ref("from"); //tracks which direction to convert from

function onFromAmountChange(val) {
  lastEdited.value = "from";
  fromAmount.value = val;
}
function onToAmountChange(val) {
  lastEdited.value = "to";
  toAmount.value = val;
}
function recompute() {
  if(fromUnit.value === "unit" || toUnit.value === "unit") return;

  if (lastEdited.value === "from") {
    toAmount.value = props.type === "weight" ? weight_conversion(fromUnit.value, toUnit.value, fromAmount.value)
    : props.type === "volume" ? volume_conversion(fromUnit.value, toUnit.value, fromAmount.value)
    : temperature_conversion(fromUnit.value, toUnit.value, fromAmount.value);
  } else {
    fromAmount.value = props.type === "weight" ? weight_conversion(toUnit.value, fromUnit.value, toAmount.value)
    : props.type === "volume" ? volume_conversion(toUnit.value, fromUnit.value, toAmount.value)
    : temperature_conversion(toUnit.value, fromUnit.value, toAmount.value);
  }
}

// Recompute when either side changes OR units change.
watch([fromAmount, fromUnit, toUnit], () => { if (lastEdited.value === "from") recompute(); });
watch([toAmount, toUnit, fromUnit], () => { if (lastEdited.value === "to") recompute(); });

const filteredList = computed(() => objectToArray(filterByType(units, props.type)));
recompute(); // Initial compute
</script>

<style lang="scss" scoped>
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.conversion_container{
  @include row($gap:7pt);
  flex-wrap: wrap;
  background-color: white;
  padding: 1em;
  margin: 1em 0;
  .sentence-text{
    font-size: $font-size-subtitle;
    font-family: $font-basic;
    color: $color_text_base;
  }
}
</style>
