<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "main",
  },
});
</script>
<template>
  <div
    class="w-full h-[calc(100dvh-80px)] border border-dark-200 overflow-y-hidden"
  >
    <div
      class="h-25 w-full flex p-2.5 text-white"
      :class="type == 'main' ? ' bg-liner ' : ' bg-liner2 '"
    >
      <slot name="top" />
    </div>
    <div
      class="border-t-2 border-blue-500 rounded-t-50 px-5 pt-7 pb-5 flex bg-dark-200 relative h-[calc(100%-52px)] overflow-y-hidden"
      :class="type == 'main' ? ' -mt-12 ' : type == 'full' ? '-mt-24 h-full' : ' -mt-16 '"
    >
      <slot name="main" />
    </div>
  </div>
</template>
<style scoped>
.bg-liner {
  background: linear-gradient(180deg, #212429 6.09%, #3599ea 164.78%);
}
.bg-liner2 {
  background: linear-gradient(180deg, #3599ea 0%, #212429 80%);
}
</style>
