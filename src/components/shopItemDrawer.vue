<script setup>
import { ref } from "vue";
import selectingCard from "@/components/selectingCard.vue";
import coin from "@/components/icons/coin.vue";
import closeIcon from "./icons/close.vue";

const open = ref(false);
function onClose() {
  open.value = false;
}
function openDrawer() {
  open.value = true;
}

defineExpose({
  openDrawer,
});
</script>
<template>
  <a-drawer
    title=" "
    placement="bottom"
    class="!bg-dark-200"
    :closable="false"
    :open="open"
    @close="onClose"
    height="auto"
  >
    <div class="text-white flex flex-col gap-4 items-center relative">
      <div class="pr-10 flex flex-col items-center w-full gap-4">
        <div
          @click="onClose"
          class="absolute text-dark-400 -top-2 right-0 w-7 h-7 rounded-full bg-white opacity-35 flex items-center justify-center text-xl"
        >
          <closeIcon />
        </div>
        <img
          src="@/assets/img/cloth.png"
          class="w-full h-[180px] object-cover rounded-10"
        />
        <span class="font-bold text-3xl"> FIPT Hoodie Blue </span>
      </div>

      <span class="text-base font-medium">Select Size</span>
      <selectingCard />
      <div class="flex items-center justify-between font-bold text-2xl w-full">
        <span class="">Total:</span>
        <div class="flex items-center gap-0.5">
          <coin />
          4,000,000
        </div>
      </div>
      <button
        class="w-full h-12 bg-blue-500 rounded-10 flex items-center justify-center font-bold text-base"
      >
        Add to Cart
      </button>
    </div>
  </a-drawer>
</template>
<style scoped></style>
