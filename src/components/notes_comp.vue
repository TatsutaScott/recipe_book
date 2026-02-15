<template>
  <div class="note_container">
    <div v-for="(note, index) in props.notes" :key="note">
      ※{{index}}: {{ note }}
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

</style>
