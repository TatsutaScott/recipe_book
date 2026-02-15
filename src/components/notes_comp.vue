<template>
  <div class="note_container">
    <div v-for="(note, index) in props.notes" :key="note">
      <div class="note_div" v-if="note.title">
        <span>※{{index}}:</span>
        <span class="note_title">{{ note.title }}</span>
        <span>{{ note.text }}</span>
      </div>
      <div class="note_div" v-else>
        <span>※{{index}}:</span>
        <span>{{ note }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({notes: { type: Array}});
</script>

<style scoped>
.note_container{
  color:gray;
  font-family: Neue_Montreal;
  font-size: 11pt;
  font-style: italic;
}

.note_title{
  font-weight: bold;
    font-style: none;

}

.note_div{
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}
</style>
