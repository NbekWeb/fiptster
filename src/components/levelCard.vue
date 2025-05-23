<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const dynamicCardStyle = {
  background: `
    linear-gradient(${props.data.bg1}, ${props.data.bg2}) padding-box,
    linear-gradient(180deg, ${props.data.border1}, ${props.data.border2}) border-box
  `,
};
</script>

<template>
  <div class="level-item">
    <div class="relative z-1 flex flex-col items-center">
      <div
        class="level-card px-8 flex items-center justify-center"
        :style="dynamicCardStyle"
      >
        <img :src="data.img" class="w-full h-full object-contain" />
      </div>
      <h3 class="mt-4 mb-0 font-semibold text-3xl">{{ data.name }}</h3>
      <span class="text-base opacity-60"> from {{ data.coin }} </span>
    </div>
  </div>
</template>
