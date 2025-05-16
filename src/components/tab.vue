<script setup>
import { ref } from "vue";
const tabs = ["Teasing", "Seductive", "Live", " Unveiled"];

const selected = ref("Teasing");

function changeSelect(val) {
  selected.value = val;
}
</script>
<template>
  <div class="flex absolute top-6 z-10 w-full  text-white text-sm">
    <div class="mx-5 w-full  flex">
      <div
        class="bg-blue-500/40 rounded h-10 flex justify-between w-full p-1 flex-grow"
      >
        <span
          @click="changeSelect(item)"
          v-for="(item, i) in tabs"
          :key="i"
          class="transition-all duration-300 hover:cursor-pointer rounded h-full flex items-center font-semibold px-4"
          :class="selected == item && 'bg-blue-500'"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>
