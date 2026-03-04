<template>
  <h1 class="title">Tools</h1>
  <div id="ingredient_conversion">
    <h2 class="subtitle">Ingredient Conversion</h2>
    <ingredient_conversion />
  </div>

  <div id="volume_conversion">
    <h2 class="subtitle">Volume Conversion</h2>
    <conversion type="volume" />
  </div>

  <div id="weight_conversion">
    <h2 class="subtitle">Weight Conversion</h2>
    <conversion type="weight" />
  </div>
  <div id="temperature_conversion">
    <h2 class="subtitle">Temperature Conversion</h2>
    <conversion type="temperature" />
  </div>
</template>

<script setup>
import conversion from '@/components/conversion_comp.vue';
import ingredient_conversion from '@/components/ingredient_conversion_comp.vue';
</script>

<style lang="scss" >
@use '@/static/styles/global' as *;

#ingredient_conversion_container,
#volume_conversion_container,
#weight_conversion_container,
#temp_conversion_container{
  @include section;
  padding: 2em;
}


</style>
