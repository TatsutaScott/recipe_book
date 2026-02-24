<template>
  <div id="title_container">
    <div id="name_container">
      <h1 class="title">{{ props.title.en }}</h1>
      <h2 v-if="lang != 'en'" class="alt-title" :class="lang">{{ props.title[lang] }}</h2>
    </div>
    <div id="details_container">
      <span v-if="props.time.active" class="basic-text"><strong>Active:</strong> {{ formatTime(props.time.active) }}</span>
      <span v-if="props.time.passive" class="basic-text"><strong>Passive:</strong> {{ formatTime(props.time.passive) }}</span>
      <span v-if="props.time.active && props.time.passive" class="basic-text"><strong>Total:</strong> {{ formatTime(addTimes(props.time.active, props.time.passive)) }}</span>
      <span v-else class="basic-text"><strong>Time:</strong> {{ formatTime(props.time) }}</span>

      <span v-if="props.servings" class="basic-text"><strong>Makes:</strong> {{ format_servings(props.servings) }}</span>

      <span v-if="props.date" class="basic-text"><strong>Date:</strong> {{ formatDate(props.date) }}</span>

      <span v-if="props.source.title" class="basic-text"><strong>Source:</strong> {{ props.source.title }} by {{ props.source.author }}</span>
      <a v-else :href="props.source" id="source" class="basic-text">Original Recipe Here</a>
    </div>
    <div id="tags_container">
      <span class="basic-text"><strong>Tags:</strong> </span>
      <span class="tag" v-for="tag in props.tags" :key="tag">{{tag}}</span>
    </div>
  </div>
</template>

<script setup scss>
import { computed, defineProps } from 'vue'
import { formatDate, formatTime, addTimes} from '@/scripts/util';

const props = defineProps({
  title: {en: String, ja: String, lang: String },
  tags: Array,
  servings:{ amount: Number, unit: String },
  source: String,
  date:String,
  time:{
    active: { duration: Number, unit: String},
    passive: { duration:Number, unit: String}
  }
});

const lang = computed(() => props.title.lang)

const format_servings = (servings) => {
  const { amount, unit } = servings
  const plural = amount > 1
  return `${amount} ${unit}${plural ? 's' : ''}`
}
</script>

<style lang="scss">
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

#title_container {
  @include column($justify: start, $align: stretch);
  @include section;
}

#name_container {
  @include row($justify:start, $align: baseline);
  flex-wrap: wrap;
  width: 100%;
}

#details_container {
  @include row($justify: space-between);
  @include border($top: true, $bottom: true);
  width: 100%;
  flex-wrap: wrap;
  padding: 0.5em 0px;
}

#tags_container{
  @include row;
  width: 100%;
}

#source {
  @include dashed-rounded($color: $color-text-accent);
  padding: 0.25em;
  color: $color-text-accent;
  transition: 0.5s;
}

#source:hover {
  @include hover;
}


</style>
