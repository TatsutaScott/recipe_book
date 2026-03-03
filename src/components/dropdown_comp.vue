<template>
  <div ref="root" class="dropdown" :class="{ open: isOpen }">
    <button
      class="dropdown_button" type="button" @click="toggle">
      <span class="dropdown_value">{{ selectedLabel || placeholder }}</span>
    </button>

    <div v-if="isOpen" class="dropdown_menu" role="listbox">
      <button
        v-for="opt in options" :key="opt.value"
        type="button"
        class="dropdown_item"
        :class="{ active: isSelected(opt.value) }"
        @click="select(opt.value)"
      >
        <span class="dropdown_label">{{ opt.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  options: { type: Array, required: true },
  placeholder: { type: String, default: "Select…" },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const root = ref(null);

const normalizedValue = computed(() =>
  typeof props.modelValue === "string" ? props.modelValue : ""
);

const selectedLabel = computed(() => {
  console.log(props.options)
  const found = props.options.find((o) => o.value === normalizedValue.value);
  return found?.label ?? "";
});

const toggle = () => isOpen.value = !isOpen.value;

const isSelected = (value) => normalizedValue.value === value;


function select(value) {
  emit("update:modelValue", value);
  toggle();
}

function onClickOutside(e) {
  const el = root.value;
  if (!el) return;
  if (!el.contains(e.target))  isOpen.value = 0;
}

onMounted(() => document.addEventListener("pointerdown", onClickOutside));
onBeforeUnmount(() => document.removeEventListener("pointerdown", onClickOutside));
</script>

<style lang="scss" scoped>
@use '@/static/styles/global' as *;
@use '@/static/styles/fonts.scss' as *;

.dropdown {
  position: relative;
  display: inline-block;

  button{
    cursor: pointer;
  }
}

.dropdown_button{
  display: inline-flex;
  gap: 0.35rem;

  border: none;
  background: transparent;
  padding: 0;
}
.dropdown_value{
  font-family: $font-title;
  font-size: $font-size-subheading;
  color: $color_text_light;
  transition: 0.25s;
  outline: $color_gray dashed 2px;
  padding: 0 10px;
}

.dropdown_value:hover{
  color:$color_text_light;
}

.dropdown_menu {
  position: absolute;
  top: 3em;
  left: 0;
  z-index: 50;

  background: $color_bg_hilite;
  border-radius: 5px;
  padding: 0.25rem;

  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}


.dropdown_item {
  width: 100%;

  padding: 0.2rem 0.3rem;
  background: transparent;
  text-align: left;
  font-family: $font-basic;
}

.dropdown_item:hover {
  background: $color_gray;
}
</style>
