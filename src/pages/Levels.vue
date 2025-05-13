<script setup>
import levelCard from "@/components/levelCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ref, onMounted, computed } from "vue";
import { Navigation } from "swiper/modules";
import { levels } from "@/utils/levels";

const activeIndex = ref(0);
function onSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex;
  console.log("Current slide index:", activeIndex.value);
}
const dynamicBlurStyle = computed(() => {
  return {
    background: `${levels[activeIndex.value]?.blurColor}`,
  };
});
</script>
<template>
  <div class="flex justify-center text-white relative">
    <div class="blur" :style="dynamicBlurStyle"></div>

    <Swiper
      :modules="[Navigation]"
      :slides-per-view="1"
      :space-between="20"
      navigation
      pagination
      class="w-full max-w-4xl !py-8"
      @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="(item, i) in levels" :key="i">
        <levelCard
          :data="item"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
