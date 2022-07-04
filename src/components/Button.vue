<template>
  <div>
    <button
      class="btn"
      :class="{
        'btn-primary': !isDisabled,
        'btn-disabled': isDisabled,
        'btn-link': isLink,
      }"
      @click="$emit('on-click')"
    >
      <p>{{ labelFormatted }}</p>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { lowerAndCapitalize } from '../helpers/helper-string';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isLink: {
    type: Boolean,
    default: false,
  },
});

const labelFormatted = computed(() => lowerAndCapitalize(props.label));
</script>

<style lang="postcss" scoped>
.btn {
  @apply py-2
         px-4
         border border-transparent
         rounded-md
         text-sm;
}

.btn-primary {
  @apply text-white
         bg-purple-600
         hover:bg-purple-700
         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500;
}

.btn-link {
  @apply text-gray-900 bg-transparent hover:bg-purple-100;
}

.btn-disabled {
  @apply text-gray-500 bg-gray-200 cursor-default hover:bg-gray-200 focus:outline-none focus:ring-0;
}
</style>
