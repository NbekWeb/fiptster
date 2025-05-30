<script setup>
import VideoCard from "@/components/VideoCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import tab from "@/components/tab.vue";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import useFeed from "@/stores/feeds.pinia";

const currentIndex = ref(0);
const feedPinia = useFeed();
const { feeds } = storeToRefs(feedPinia);

const onSlideChange = (swiper) => {
  currentIndex.value = swiper.activeIndex;
};
</script>
<template>
  <div
    class="h-full flex flex-col max-h-[calc(100dvh-80px)] relative min-h-[calc(100dvh-80px)]"
  >
    <tab />

    <Swiper
      direction="vertical"
      slides-per-view="1"
      space-between="0"
      class="h-full w-screen  flex-grow"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, i) in feeds" :key="i">
        <VideoCard :current="i - 1 == currentIndex" :data="item" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
