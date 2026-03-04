<template>
  <div ref="root" class="dropdown" :class="{ open: isOpen, disabled }">
    <button class="dropdown_button" type="button" @click="toggle">
      <span class="dropdown_value">{{ selectedLabel || placeholder }}</span>
    </button>

    <div v-if="isOpen" class="dropdown_menu" role="listbox">
      <div v-for="group in groupedOptions" :key="group.type" class="dropdown_group">
        <div class="dropdown_group_label">{{ group.type }}</div>

        <button
          v-for="opt in group.options"
          :key="opt.value"
          type="button"
          class="dropdown_item"
          :class="{ active: isSelected(opt.value) }"
          @click="select(opt.value)"
        >
          <span class="dropdown_label">{{ opt.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },

  // Accept either:
  // { cornmeal: { label, grams, type }, honey: { ... } }
  // OR
  // { oz: 28, lb: 450, g: 1 }
  items: { type: Object, required: true },

  placeholder: { type: String, default: "Select…" },
  disabled: { type: Boolean, default: false },

  uncategorizedLabel: { type: String, default: "Other" },

  // Optional: if true, don't show category headers when there's only one group
  hideSingleGroupHeader: { type: Boolean, default: true },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const root = ref(null);

const normalizedValue = computed(() =>
  typeof props.modelValue === "string" ? props.modelValue : ""
);

// 🔧 Normalize object -> array [{value, label, type}]
const flatOptions = computed(() => {
  const obj = props.items ?? {};

  return Object.entries(obj).map(([value, data]) => {
    const isRichObject = data && typeof data === "object" && !Array.isArray(data);

    // If data is a number (or string) like 28, label defaults to the key: "oz"
    if (!isRichObject) {
      return {
        value,
        label: String(value),
        type: props.uncategorizedLabel,
        raw: data, // keep the original value if you ever want it
      };
    }

    // Rich object: { label, type, ... }
    return {
      value,
      label: data?.label ?? String(value),
      type: data?.type ?? props.uncategorizedLabel,
      raw: data,
    };
  });
});

const groupedOptions = computed(() => {
  const map = new Map();

  for (const opt of flatOptions.value) {
    const type = opt.type || props.uncategorizedLabel;
    if (!map.has(type)) map.set(type, []);
    map.get(type).push(opt);
  }

  // sort options within each group by label
  for (const [type, opts] of map.entries()) {
    opts.sort((a, b) => String(a.label).localeCompare(String(b.label)));
    map.set(type, opts);
  }

  const groups = Array.from(map.entries())
    .sort((a, b) => String(a[0]).localeCompare(String(b[0])))
    .map(([type, options]) => ({ type, options }));

  // Optional UX: if everything is "Other", you might not want a header
  if (props.hideSingleGroupHeader && groups.length === 1) {
    return [{ type: "", options: groups[0].options }];
  }

  return groups;
});

const selectedLabel = computed(() => {
  const found = flatOptions.value.find((o) => o.value === normalizedValue.value);
  return found?.label ?? "";
});

const toggle = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const isSelected = (value) => normalizedValue.value === value;

function select(value) {
  emit("update:modelValue", value);
  isOpen.value = false;
}

function onClickOutside(e) {
  const el = root.value;
  if (!el) return;
  if (!el.contains(e.target)) isOpen.value = false;
}

onMounted(() => document.addEventListener("pointerdown", onClickOutside));
onBeforeUnmount(() => document.removeEventListener("pointerdown", onClickOutside));
</script>

<style lang="scss" scoped>
@use "@/static/styles/global" as *;

.dropdown {
  position: relative;
  display: inline-block;

  button {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0.5;
    button {
      cursor: not-allowed;
    }
  }
}

.dropdown_button {
  display: inline-flex;
  gap: 0.35rem;
  border: none;
  background: transparent;
  padding: 0;
}

.dropdown_value {
  font-family: $font-title;
  font-size: $font-size-subheading;
  color: $color_text_light;
  transition: 0.25s;
  outline: $color_gray dashed 2px;
  padding: 0 10px;
}

.dropdown_menu {
  position: absolute;
  top: 3em;
  left: 0;
  z-index: 50;

  background: $color_bg_hilite;
  border-radius: 5px;
  padding: 0.25rem;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  max-height: 320px;
  overflow: auto;
}

.dropdown_group {
  padding: 0.25rem 0;
}

.dropdown_group_label {
  font-family: $font-basic;
  font-size: 0.8rem;
  opacity: 0.8;
  padding: 0.25rem 0.35rem;
  user-select: none;
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

.dropdown_item.active {
  outline: 2px solid $color_gray;
}
</style>
