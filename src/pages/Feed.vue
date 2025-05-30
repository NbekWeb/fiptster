<script setup>
import VideoCard from "@/components/VideoCard.vue";
import { onBeforeRouteLeave } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import tab from "@/components/tab.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import useFeed from "@/stores/feeds.pinia";
import useVideo from "@/stores/video.pinia";

const currentIndex = ref(0);
const feedPinia = useFeed();
const videoPinia = useVideo();
const { feeds } = storeToRefs(feedPinia);
const swiperRef = ref(null);
const tabRef = ref(null);

const onSlideChange = (swiper) => {
  if (videoPinia.videosCount < swiper.activeIndex + 1) {
    videoPinia.videosCount = swiper.activeIndex + 1;
  }
  currentIndex.value = swiper.activeIndex;

  swiperRef.value.allowTouchMove =
    feeds.value?.[swiper.activeIndex]?.type !== "advertisement";
};

const handleVideoEnded = () => {
  swiperRef.value.allowTouchMove = true;
  feeds.value[currentIndex.value].type = "reels";
  const isLastSlide = swiperRef.value.activeIndex === feeds.value.length - 1;

  if (!isLastSlide) {
    swiperRef.value?.slideNext();
  } else {
    tabRef.value?.getFeed(() => {
      currentIndex.value = 0;
      swiperRef.value?.slideTo(0, 0);
      videoPinia.videosCount = 1;
    });
  }
};
onBeforeRouteLeave(() => {
  if (swiperRef.value) {
    const videos = swiperRef.value.el.querySelectorAll("video");
    videos.forEach((video) => {
      video.pause();
      video.src = ""; 
      video.load();
    });
  }
});
</script>
<template>
  <div
    class="h-full flex flex-col max-h-[calc(100dvh-80px)] relative min-h-[calc(100dvh-80px)]"
  >
    <tab ref="tabRef" />

    <Swiper
      direction="vertical"
      slides-per-view="1"
      space-between="0"
      class="h-full w-screen flex-grow"
      @slideChange="onSlideChange"
      @swiper="(swiper) => (swiperRef = swiper)"
    >
      <SwiperSlide v-for="(item, i) in feeds" :key="i">
        <VideoCard
          :current="i == currentIndex"
          :data="item"
          @videoEnded="handleVideoEnded"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>
