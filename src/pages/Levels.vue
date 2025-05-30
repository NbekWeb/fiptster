<script setup>
import levelCard from "@/components/levelCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ref, onMounted, computed, watch } from "vue";
import { Navigation } from "swiper/modules";
import { levels } from "@/utils/levels";
import userCard from "@/components/userCard.vue";
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";

const activeIndex = ref(0);
const swiperRef = ref(null);
const authStore = useAuth();
const { grouped, user } = storeToRefs(authStore);
function onSlideChange(swiper) {
  activeIndex.value = swiper.activeIndex;
  console.log("Current slide index:", activeIndex.value);
}
const dynamicBlurStyle = computed(() => {
  return {
    background: levels[activeIndex.value]?.blurColor,
  };
});

const me = {
  name: "@itsmebro",
  coin: "30,613",
  place: 5,
};
const swiperInstance = ref(null);

function onSwiper(swiper) {
  swiperInstance.value = swiper;
  if (user.value?.profile_level) swiper.slideTo(user.value.profile_level);

  swiper.slideTo(user.value.profile_level);
}
watch(
  () => user.value?.profile_level,
  (newLevel) => {
    if (swiperInstance.value) {
      swiperInstance.value.slideTo(newLevel);
    }
  },
  { immediate: true }
);

onMounted(() => {
  authStore.getGrouped();
});
</script>
<template>
  <div class="h-auto">
    <div class="flex flex-col items-center text-white relative">
      <div class="blur" :key="activeIndex" :style="dynamicBlurStyle"></div>

      <Swiper
        :modules="[Navigation]"
        :ref="swiperRef"
        @swiper="onSwiper"
        :slides-per-view="1"
        :space-between="20"
        navigation
        pagination
        class="w-full !py-8 !min-h-max !overflow-x-hidden !max-w-[100vw]"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(item, i) in levels" :key="i">
          <levelCard :data="item" />
        </SwiperSlide>
      </Swiper>
      <div class="min-h-max flex flex-col w-full px-4">
        <div class="flex flex-col items-start w-full gap-1 relative z-10">
          <span class="text-base font-semibold"> Me </span>
          <userCard :data="me" />
        </div>
        <div class="flex flex-col items-start w-full gap-1 mt-4">
          <span class="text-base font-semibold"> Top 100 Earners </span>
          <div class="flex flex-col gap-2 w-full pb-2">
            <template v-for="i in 100">
              <userCard :data="{ ...me, place: i }" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
