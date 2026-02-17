<template>
  <div id="steps_container">
    <div class="subsection_container" v-for="section in props.directions" :key="section">
      <h2 class="subsection_title">{{ section.section_title }}</h2>
      <ol>
        <li class="step basic-text" v-for="step in section.steps" :key="step">
          <div class="basic-text" v-if="step.note">{{ step.text }}</div>
          <div class="note basic-text" v-if="step.note">{{ step.note }}</div>
          <div class="basic-text" v-else>{{step}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({directions: Array});
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#steps_container{
  @include section;
}

.step{
  padding: 0.25em 0.5em;
  border-radius: 5px;
}

.step:hover{
  @include hover;
}
</style>
