<template>
  <input
    ref="inputEl"
    class="number_input"
    :value="displayValue"
    type="text"
    inputmode="decimal"
    :placeholder="placeholder"
    @input="onInput"
    @blur="onBlur"
  />
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";

const extraPx = 10;
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  placeholder: { type: String, default: "" },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
});

const emit = defineEmits(["update:modelValue"]);

const inputEl = ref(null);
const internal = ref(String(props.modelValue ?? ""));

const displayValue = computed(() => internal.value);

function sanitize(value) {
  // Keep only digits and dots
  value = value.replace(/[^\d.]/g, "");

  // Keep only the first dot
  const firstDot = value.indexOf(".");
  if (firstDot !== -1) {
    // remove any additional dots
    value =
      value.slice(0, firstDot + 1) + value.slice(firstDot + 1).replace(/\./g, "");
  }

  // Now clamp decimals to 2
  const [intPart, decPart = ""] = value.split(".");
  if (firstDot !== -1) {
    return intPart + "." + decPart.slice(0, 2);
  }
  return intPart;
}

function onInput(e) {
  let val = sanitize(e.target.value);
  internal.value = val;

  const num = parseFloat(val);
  if (!isNaN(num)) {
    emit("update:modelValue", num);
  }

  resize();
}

function onBlur() {
  let num = parseFloat(internal.value);

  if (isNaN(num)) num = 0;

  // Clamp
  num = Math.min(Math.max(num, props.min), props.max);

  // Round to 2 decimals
  num = Math.round(num * 100) / 100;

  // Display nicely (no trailing zeros)
  internal.value = String(num).includes(".")
    ? num.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")
    : String(num);

  emit("update:modelValue", num);
  resize();
}

function resize() {
  const input = inputEl.value;
  if (!input) return;

  const span = document.createElement("span");
  span.style.font = getComputedStyle(input).font;
  span.textContent = internal.value || props.placeholder || "0";

  document.body.appendChild(span);

  const px =span.offsetWidth + extraPx;
  input.style.width = `${px}px`;

  document.body.removeChild(span);
}

watch(
  () => props.modelValue,
  async (val) => {
    internal.value = String(val ?? "");
    await nextTick();
    resize();
  }
);

onMounted(async () => {
  await nextTick();
  resize();
});
</script>

<style lang="scss" scoped>
@use '@/static/styles/global' as *;

.number_input {
  font-family: $font-title;
  font-size: $font-size-subheading;
  color: $color_text_light;
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: $color_gray dashed 2px;
  text-align: center;
}
</style>
