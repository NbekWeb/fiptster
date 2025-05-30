<script setup>
import coin from "./icons/coin.vue";
import { formatNumber } from "@/utils/numFormat";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>
<template>
  <div
    class="flex min-h-12 h-12 rounded-10 justify-between items-center bg-dark-300 px-1 py-2 text-xs"
  >
    <div class="flex items-center gap-1">
      <img
        :src="data.invited_user?.avatar"
        class="w-5 h-5 rounded-full object-cover"
      />
      <span class="font-semibold"> @{{ data.invited_user?.username }} </span>
    </div>
    <div class="flex items-center px-0.5 py-2 rounded bg-dark-220 gap-2">
      <coin class="text-base" />
      <span class="font-semibold">
        {{ formatNumber(+data.invited_user?.user_profile?.coin) }}</span
      >
    </div>
  </div>
</template>
<style scoped></style>
