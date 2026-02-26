<template>
  <h1 class="title">Tools</h1>
  <div id="ingredient_conversion">
    <h2 class="subtitle">Ingredient Conversion</h2>
    <div id="ingredient_conversion_container">
      <span class="basic-text">12 </span>
      <span class="basic-text">Eggs </span>
      <span class="basic-text">is </span>
      <span class="basic-text">42 </span>
      <span class="basic-text">grams.</span>
    </div>
  </div>
  <div id="volume_conversion">
    <h2 class="subtitle">Volume Conversion</h2>
      <div id="volume_conversion_container">
        <span class="basic-text">12 </span>
        <span class="basic-text">Eggs </span>
        <span class="basic-text">is </span>
        <span class="basic-text">42 </span>
        <span class="basic-text">grams.</span>
      </div>
  </div>
  <div id="weight_conversion">
    <h2 class="subtitle">Weight Conversion</h2>
      <div id="weight_conversion_container">
        <span class="basic-text">12 </span>
        <span class="basic-text">Eggs </span>
        <span class="basic-text">is </span>
        <span class="basic-text">42 </span>
        <span class="basic-text">grams.</span>
      </div>
  </div>
  <div id="temperature_conversion">
    <h2 class="subtitle">Temperature Conversion</h2>
      <div id="temp_conversion_container">
        <span class="basic-text">12 </span>
        <span class="basic-text">Eggs </span>
        <span class="basic-text">is </span>
        <span class="basic-text">42 </span>
        <span class="basic-text">grams.</span>
      </div>
  </div>
</template>


<style lang="scss" >
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#ingredient_conversion_container,
#volume_conversion_container,
#weight_conversion_container,
#temp_conversion_container{
  @include section;
  padding: 2em;
}

</style>
