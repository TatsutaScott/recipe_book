<template>
  <div id="title">
    <div id="name">
      <h1 id="title_en">{{ props.title.en }}</h1>
      <h2 v-if="lang != 'en'" id="title_fo" :class="lang">{{ props.title[lang] }}</h2>
    </div>
    <div id="details">
      <span v-if="props.time.active">Active: {{ formatTime(props.time.active) }}</span>
      <span v-if="props.time.passive">Passive: {{ formatTime(props.time.passive) }}</span>
      <span v-if="props.time.active && props.time.passive">Total: {{ formatTime(addTimes(props.time.active, props.time.passive)) }}</span>
      <span v-else>Time: {{ formatTime(props.time) }}</span>
      <span v-if="props.servings">Makes: {{ format_servings(props.servings) }}</span>
      <span v-if="props.date">Date: {{ formatDate(props.date) }}</span>
      <span v-if="props.source.title">Source: {{ props.source.title }} by {{ props.source.author }}</span>
      <a v-else :href="props.source" id="source">Original Recipe Here</a>
    </div>
    <div id="tags_container">
      <span>Tags:</span>
      <span class="tag" v-for="tag in props.tags" :key="tag">{{tag}}</span>
    </div>
  </div>
</template>

<script setup scss>
import { computed, defineProps } from 'vue'
import { formatDate, formatTime, addTimes} from '@/scripts/util';
const props = defineProps({
  title: {
    en: String,
    ja: String,
    lang: String
  },
  tags: Array,
  servings:{
    amount: Number,
    unit: String
  },
  source: String,
  date:String,
  time:{
    active: {
      duration: Number,
      unit: String
    },
    passive: {
      duration:Number,
      unit: String
    }
  }
});

const lang = computed(() => props.title.lang)

const format_servings = (servings) => {
  const { amount, unit } = servings
  const plural = amount > 1
  return `${amount} ${unit}${plural ? 's' : ''}`
}
</script>

<style scoped>

#title {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}

#title_en {
  font-size: 24pt;
  font-family: Migra_bold;
  color: blue;
}

#title_fo {
  font-size: 16pt;
  color: gray;
  font-family: Migra_bold;
}

#source {
  padding: 0.25em;
  color: blue;
  width: auto;
  border: 1px blue dashed;
  font-size: 10pt;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-family: Neue_Montreal;
}

#source:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

#details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em 1em;
  border-top: 1px gray solid;
  border-bottom: 1px gray solid;
  font-family: Neue_Montreal;
  font-size: 10pt;
  padding: 0.5em 0px;
}

#name {
  display: flex;
  justify-content: flex-start;
  gap: 0.5em;
  align-items: baseline;
  h1,
  h2 {
    margin: 0;
  }
}

#tags_container{
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 0.25em;
  padding: 0.25em 0;
}

.tag{
  font-family: Neue_Montreal;
  color: gray;
  font-size: 11pt;
  padding: 0.25em;
  border: 1pt dashed gray;
  border-radius: 5px;
}
</style>
