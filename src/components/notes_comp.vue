<template>
  <div id="notes_container">
    <div class="note_div" v-for="(note, index) in props.notes" :key="note" >
      <span class="note_title basic-text"><strong>{{ note.title || `※${index}`}}</strong></span>
      <span class="basic-text">{{ note.text || note }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({notes: { type: Array}});
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#notes_container{
  @include section;
  @include column($gap:0.5em);
}

.note_div{
  display: grid;
  grid-template-columns: 1fr 5fr;
  justify-content:start;
  gap: 1em;
  padding: 0.25rem 0.25rem;
}

.note_div:hover{
  @include hover;
  border-radius: 5px;

}

.note_title{
  text-align: right;
}
</style>
