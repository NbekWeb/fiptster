<script setup>
import { ref ,computed} from "vue";
import selectingCard from "@/components/selectingCard.vue";
import coin from "@/components/icons/coin.vue";
import closeIcon from "./icons/close.vue";
import useMarket from "@/stores/market.pinia";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/utils/numFormat";

const emit = defineEmits(["goNext"]);
const market = useMarket();
const { product } = storeToRefs(market);
const open = ref(false);
const selected = ref(null);
function onClose() {
  open.value = false;
}
function openDrawer() {
  open.value = true;
  selected.value = product.value.sizes?.[0] ?? null; 
}
function handleAddToCart() {
  onClose();
  emit("goNext");
}

function changeType(type) {
  selected.value = type;
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
          class="absolute text-dark-400 -top-3 -right-3 w-7 h-7 rounded-full bg-white opacity-35 flex items-center justify-center text-xl"
        >
          <closeIcon />
        </div>
        <img
          src="@/assets/img/cloth.png"
          class="w-full h-[180px] object-cover rounded-10"
        />
        <span class="font-bold text-3xl"> {{ product?.name }} </span>
      </div>

      <span class="text-base font-medium">Select Size</span>
      <div
        class="w-full bg-dark-300 text-xs font-semibold mb-4 h-10 rounded-10 p-1 grid"
        :class="`grid-cols-${product?.sizes.length}`"
      >
        <span
          v-for="(item, i) in product?.sizes"
          :key="i"
          class="h-full flex items-center justify-center rounded"
          :class="selected == item && 'bg-blue-500'"
          @click="changeType(item)"
        >
          {{ item }}
        </span>
      </div>
      <div class="flex items-center justify-between font-bold text-2xl w-full">
        <span class="">Total:</span>
        <div class="flex items-center gap-0.5">
          <coin />
          {{ formatNumber(product?.price_fiptp) }}
        </div>
      </div>
      <button
        @click="handleAddToCart"
        class="w-full h-12 bg-blue-500 rounded-10 flex items-center justify-center font-bold text-base"
      >
        Add to Cart
      </button>
    </div>
  </a-drawer>
</template>
<style scoped></style>
