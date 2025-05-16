<script setup>
import VideoCard from "@/components/VideoCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import tab from "@/components/tab.vue";
import { ref } from "vue";

const currentIndex = ref(0);

const onSlideChange = (swiper) => {
  currentIndex.value = swiper.activeIndex;
};
</script>
<template>
  <div
    class="h-full flex flex-col min-h-full max-h-[calc(100dvh-80px)] relative"
  >
    <tab />

    <Swiper
      direction="vertical"
      slides-per-view="1"
      space-between="0"
      class="h-full w-screen"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="i in 5" :key="i">
        <VideoCard :current="i - 1 == currentIndex" :video="i%2"/>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
