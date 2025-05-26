<script setup>
import youtube from "@/assets/img/yt.svg";
import facebook from "@/assets/img/facebook.svg";
import x from "@/assets/img/x.svg";
import instagram from "@/assets/img/insta.svg";
import telegram from "@/assets/img/tg.svg";
import coin from "@/components/icons/coin.vue";
import chevron from "./icons/chevron.vue";
import { formatNumber } from "@/utils/numFormat";
import { ref, computed } from "vue";
import closeIcon from "./icons/close.vue";
const open = ref(false);

function onClose() {
  open.value = false;
}
function toggleOpen() {
  open.value = true;
}
const channelImages = {
  Youtube: youtube,
  Telegram: telegram,
  Facebook: facebook,
  Instagram: instagram,
};

const channelImage = computed(
  () => channelImages[props.item.channel_type] || x
);

function goTask(link) {
  if (link) {
    window.open(link, "_blank");
  }
}

function check(uuid) {}

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: "youtube",
  },
});
</script>
<template>
  <div
    class="py-2 task px-4 bg-dark-320 rounded-10 flex items-center justify-between w-full"
  >
    <div class="flex gap-4">
      <img :src="channelImage" class="w-12 h-auto object-contain" />
      <div class="flex flex-col gap-1">
        <span class="text-lg">{{ item.channel_name }} </span>
        <span class="text-sm font-semibold flex gap-2 items-center">
          <coin class="text-xl" />
          {{ formatNumber(item?.channel_coin, "abbreviate") }}
        </span>
      </div>
    </div>
    <chevron class="text-2xl text-white/30" @click="toggleOpen" />
    <a-drawer
      title=" "
      placement="bottom"
      class="!bg-dark-200"
      :closable="false"
      :open="open"
      @close="onClose"
      height="auto"
    >
      <div class="text-white flex flex-col gap-4 items-center relative w-full">
        <div
          @click="onClose"
          class="absolute text-dark-400 -top-3 -right-3 w-7 h-7 rounded-full bg-white opacity-35 flex items-center justify-center text-xl"
        >
          <closeIcon />
        </div>
        <img :src="channelImage" class="w-25 h-auto object-contain mx-auto" />
        <span class="text-3xl font-semibold text-center">
          {{ item.channel_name }}
        </span>
        <p class="w-2/3 text-center">Lorem ipsum dolor sit amet consectetur</p>
        <button
          @click="goTask(item.channel_link)"
          class="h-12 flex items-center text-base font-semibold px-10 rounded-10 border-none outline-none hover:opacity-90 bg-blue-500"
        >
          {{ type === "youtube" ? " Watch video" : "Follow" }}
        </button>
        <div
          v-if="type == 'youtube'"
          class="rounded-2xl py-2 flex flex-col items-center px-4 bg-dark-320"
        >
          <h2 class="text-2xl font-medium">Secret Code</h2>
          <p class="px-6 text-center text-sm">
            To claim your reward, paste the secret code below
          </p>
          <div class="flex flex-col gap-4">
            <a-input placeholder="Insert Keyword ..." class="task-inp" />
            <button
              @click="check(item.uuid)"
              class="h-12 w-full flex justify-center items-center text-base font-semibold px-10 rounded-10 border-none outline-none hover:opacity-90 bg-blue-500"
            >
              Claim
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2.5" v-else>
          <coin class="text-2xl" />
          <div class="bg-grey-600 py-1 px-2.5 rounded">+{{ formatNumber(item.channel_coin) }}</div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<style scoped></style>
