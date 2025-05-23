<script setup>
import coin from "./icons/coin.vue";

const props = defineProps({
  title: String,
  price: Number,
  coinAmount: [String, Number],
  imageSrc: String,
});
function openDrawer() {
  emit("open");
}
const emit = defineEmits(["open"]);
</script>
<template>
  <div
    @click="openDrawer"
    class="pt-8 px-3 pb-3.5 bg-dark-300 rounded-2xl flex flex-col items-center gap-2"
  >
    <img src="@/assets/img/cloth.png" class="w-full h-22 rounded-10" />
    <span class="text-xs font-bold"> FIPT Hoodie Blue </span>
    <div class="pt-2 border-t border-dark-310 w-full">
      <div class="pt-3 w-full flex justify-between text-sm">
        <div
          class="flex font-semibold items-center pr-2 border-r h-5.5 border-dark-310"
        >
          $50
        </div>
        <div class="flex items-center gap-2">
          <coin class="text-2xl" />
          <span class="font-bold"> 4M </span>
        </div>
      </div>
    </div>
  </div>
</template>
