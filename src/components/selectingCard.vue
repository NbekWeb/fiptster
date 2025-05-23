<script setup>
import { ref } from "vue";

const selected = ref("xs");
const sizes = ["xs", "s", "m", "l", "xl"];

function changeType(type) {
  selected.value = type;
}
</script>
<template>
  <div
    class="w-full bg-dark-300 text-xs font-semibold mb-4 h-10 rounded-10 p-1 grid grid-cols-5"
  >
    <span
      v-for="(item, i) in sizes"
      :key="i"
      class="h-full flex items-center justify-center rounded"
      :class="selected == item && 'bg-blue-500'"
      @click="changeType(item)"
    >
      {{ item }}
    </span>
  </div>
</template>
<style scoped></style>
