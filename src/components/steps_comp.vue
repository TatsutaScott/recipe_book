<template>
  <div class="steps_container" v-for="section in props.directions" :key="section">
    <h2 class="subsection_title">{{ section.section_title }}</h2>
  <ol >
    <li v-for="step in section.steps" :key="step">
      <div class="step" v-if="step.note">
        <span>{{ step.text }}</span>
        <span class="note" >{{ step.note }}</span>
      </div>
      <div class="step" v-else>{{step}}</div>
    </li>
  </ol>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({directions: Array});
</script>

<style>
.steps_container{
  padding: 0;
  margin: 0;
}

.step{
  display: flex;
  flex-direction: column;
  font-family: Neue_Montreal;
  font-size: 11pt;
}

.step:hover{
  background-color: rgba(225, 225, 255, 0.5);
}

.note{
  font-style: italic;
  color:"gray";
  padding-left: 2em;
}

li{
  font-family: Neue_Montreal;
  font-size: 11pt;
  padding-bottom: 0.5em;
}

.subsection_title{
  font-family: Neue_Montreal;
  font-size: 14pt;
}
</style>
