<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { RouterView } from "vue-router";
import { ref } from "vue";

const verticalMode = ref(true);

function checkOrientation() {
  if (window.innerHeight < window.innerWidth) {
    verticalMode.value = false;
  } else {
    verticalMode.value = true;
  }
}

onMounted(() => {
  window.addEventListener("resize", checkOrientation);
  checkOrientation();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkOrientation);
});
</script>

<template>
  <div class="h-dvh bg-dark-200 overflow-y-hidden min-h-dvh w-full">
    <div
      v-if="!verticalMode"
      class="fixed  bg-dark-200 font-medium text-2xl text-white flex items-center justify-center z-50 text-center p-4 h-screen w-screen"
    >
      To continue using FIPT, please switch back to vertical mode.
    </div>
    <div v-else class="w-full min-h-dvh">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
