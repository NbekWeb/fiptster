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
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.expand();
  }
  const tg = window.Telegram.WebApp;
    const initData = tg.initData;
  console.log(initData);
 
  //   auth.postLogin({ initData }, () => {
  //     router.push({ name: "Dashboard" });
  //   });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkOrientation);
});
</script>

<template>
  <div class="h-max bg-dark-200 min-h-dvh w-full">
    <div
      v-show="!verticalMode"
      class="fixed bg-dark-200 font-medium text-2xl text-white flex items-center justify-center z-50 text-center p-4 h-screen w-screen"
    >
      To continue using FIPT, please switch back to vertical mode.
    </div>
    <div v-show="verticalMode" class="w-full min-h-dvh">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
