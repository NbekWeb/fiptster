<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useFeed from "@/stores/feeds.pinia";
import { message } from "ant-design-vue";

const feedPinia = useFeed();
const { categries } = storeToRefs(feedPinia);
const tabs = ref([]);

const selected = ref("");

onMounted(() => {
  feedPinia.getFeedsCategory((data) => {
    tabs.value = data;
    selected.value = data[0]?.uuid || "";
    feedPinia.getFeeds({ category: data[0]?.uuid || "" });
  });
});

function changeSelect(val) {
  feedPinia.getFeeds({ category: val }, (i) => {
    if (i !== 0) {
      selected.value = val;
    }
  });
}

function getFeed(callback) {
  feedPinia.getFeeds({ category: selected.value }, (i) => {
    callback();
  });
}

defineExpose({
  getFeed,
});
</script>
<template>
  <div class="flex absolute top-6 z-10 w-full text-white text-sm">
    <div class="mx-5 w-full flex">
      <div
        class="bg-blue-500/40 rounded h-10 flex justify-between w-full p-1 flex-grow"
      >
        <span
          @click="changeSelect(item.uuid)"
          v-for="(item, i) in tabs"
          :key="i"
          class="transition-all duration-300 hover:cursor-pointer rounded h-full flex items-center font-semibold px-4 hover:cursor-pointer"
          :class="selected == item.uuid && 'bg-blue-500'"
        >
          {{ item?.name }}
        </span>
      </div>
    </div>
  </div>
</template>
