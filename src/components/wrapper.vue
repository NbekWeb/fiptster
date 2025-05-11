<script setup></script>
<template>
  <div
    class="w-full h-[calc(100dvh-84px)] border border-dark-200 overflow-y-hidden"
  >
    <div class="h-25 bg-liner w-full flex p-2.5 text-white">
      <slot name="top" />
    </div>
    <div
      class="border-t-2 border-blue-500 rounded-t-50 px-7.5 pt-7 pb-5  flex bg-dark-200 relative h-[calc(100%-52px)] -mt-12 overflow-y-hidden"
    >
      <slot name="main" />
    </div>
  </div>
</template>
<style scoped>
.bg-liner {
  background: linear-gradient(180deg, #212429 6.09%, #3599ea 164.78%);
}
</style>
