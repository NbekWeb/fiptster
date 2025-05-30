<script setup>
import { ref, computed } from "vue";
import heart from "./icons/heart.vue";
import heartLine from "./icons/heart-line.vue";
import { formatNumber } from "@/utils/numFormat";
import useFeed from "@/stores/feeds.pinia";

const feedPinia = useFeed();
const like = computed(() => props.data?.comment_is_liked);
const animate = ref(false);

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

function toggle() {
  animate.value = true;

  setTimeout(() => {
    animate.value = false;
  }, 300);
  props.data.comment_is_liked = !props.data.comment_is_liked;
}

const toggleLike = () => {
  if (!props.data.comment_is_liked) {
    feedPinia.likeComment(props.data.uuid, () => {
      toggle();
      props.data.comment_like_count++;
    });
  } else {
    feedPinia.disLikeComment(props.data.uuid, () => {
      toggle();
      props.data.comment_like_count--;
    });
  }
};
</script>
<template>
  <div class="flex items-start gap-2 text-dark-220 text-xs">
    <img :src="data.user.avatar" class="w-8 h-8 object-cover rounded-full" />
    <div class="flex flex-col w-full">
      <h4 class="text-sm font-semibold my-2">{{ data.user?.first_name }}</h4>
      <div class="flex gap-5 w-full flex-grow">
        <p class="mb-0 flex-grow">
          {{ data.text }}
        </p>
        <div class="flex flex-col items-center text-xl">
          <heart
            v-if="like"
            @click="toggleLike"
            :class="[like ? 'text-red-600' : '', animate ? 'animate-like' : '']"
          />
          <heart-line
            v-else
            @click="toggleLike"
            :class="[like ? 'text-red-600' : '', animate ? 'animate-like' : '']"
          />
          <span
            v-if="data.comment_like_count > 0"
            class="text-min font-medium leading-3"
            >{{ formatNumber(data.comment_like_count, "abbreviate") }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
