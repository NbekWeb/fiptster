<script setup>
import globus from "./icons/globus.vue";
import heart from "./icons/heart.vue";
import comment from "./icons/comment.vue";
import share from "./icons/share.vue";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { formatNumber } from "@/utils/numFormat";
import useFeed from "@/stores/feeds.pinia";
import { computed } from "vue";

const emit = defineEmits(["openComment"]);
const feedPinia = useFeed();
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const like = computed(() => props.data?.feed_is_liked);
const animate = ref(false);

const handleOpenComment = () => {
  emit("openComment");
};

function togggle() {
  props.data.feed_is_liked = !props.data.feed_is_liked;
  animate.value = true;
  setTimeout(() => {
    animate.value = false;
  }, 300);
}

const toggleLike = () => {
  if (!props.data.feed_is_liked) {
    feedPinia.likeVideo(props.data?.uuid, () => {
      togggle();
      props.data.feed_like_count++;
    });
  } else {
    feedPinia.dislikeVideo(props.data?.uuid, () => {
      togggle();
      props.data.feed_like_count--;
    });
  }
};

const handleShare = async () => {
  feedPinia.shareFeed(props.data.uuid, () => {
    props.data.send_feed++;
  });
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.data.name,
        text: props.data.description,
        url: window.location.href,
      });
    } catch (error) {
      console.warn("Share canceled or failed:", error);
    }
  } else {
    alert("Your browser doesn't support the Share API.");
  }
};

function goSourse(link) {
  window.open(link, "_blank");
}
</script>

<template>
  <div
    class="flex text-3xl flex-col w-12 absolute bottom-25 items-center text-white z-10 right-2.5 gap-6"
  >
    <div
      @click="goSourse(data?.feeds_source)"
      class="flex rounded-full items-center justify-center w-full h-12 bg-blue-500"
    >
      <globus />
    </div>
    <div class="flex flex-col items-center hover:cursor-pointer">
      <heart
        @click="toggleLike"
        :class="[like ? 'text-red-600' : '', animate ? 'animate-like' : '']"
      />
      <span class="text-sm font-medium">{{
        formatNumber(data?.feed_like_count, "abbreviate")
      }}</span>
    </div>
    <div class="flex flex-col items-center hover:cursor-pointer">
      <comment @click="handleOpenComment" />
      <span class="text-sm font-medium">{{
        formatNumber(data?.comment_list.length, "abbreviate")
      }}</span>
    </div>
    <div class="flex flex-col items-center hover:cursor-pointer">
      <share @click="handleShare" />
      <span class="text-sm font-medium">{{
        formatNumber(data.send_feed, "abbreviate")
      }}</span>
    </div>
  </div>
</template>
<style scoped></style>
