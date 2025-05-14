<script setup>
import VideoCard from "@/components/VideoCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperCore from "swiper";
</script>
<template>
  <div class="h-full flex flex-col min-h-full max-h-[calc(100dvh-80px)]">
    <Swiper direction="vertical" slides-per-view="1" space-between="0" class="h-full w-screen">
      <SwiperSlide v-for="i in 5" :key="i">
        <VideoCard />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
