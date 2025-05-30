<script setup>
import coin from "./icons/coin.vue";
import gold from "@/assets/img/gold.png";
import silver from "@/assets/img/silver.png";
import bronze from "@/assets/img/bronze.png";
import { placements } from "ant-design-vue/es/vc-tour/placements";
import { formatNumber } from "@/utils/numFormat";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const coins = [gold, silver, bronze];
</script>
<template>
  <div
    class="w-full relative z-1 text-lg flex items-center justify-between py-2.5 px-4 bg-dark-280 rounded-2xl"
  >
    <div class="flex gap-4 h-full text-sm">
      <img src="@/assets/img/user2.png" class="h-14 w-auto object-contain" />
      <div class="flex flex-col gap-2.5 ">
        <span>
         @{{ data?.name }}
        </span>
        <div class="flex gap-2 items-center">
          <coin class="text-xl" />
          <span class="opacity-60">{{ formatNumber(data?.coin, "abbreviate")  }}</span>
        </div>
      </div>
    </div>
    <span class="opacity-60" v-if="data?.place > 3">
      {{ data?.place }}
    </span>
    <div v-else class="flex items-center gap-4">
      <img :src="coins[data.place - 1]" />
      <span class="opacity-60">
        {{ data?.place }}
      </span>
    </div>
  </div>
</template>
