<script setup>
import globus from "./icons/globus.vue";
import heart from "./icons/heart.vue";
import comment from "./icons/comment.vue";
import share from "./icons/share.vue";
import { ref } from "vue";
import { message } from "ant-design-vue";

const emit = defineEmits(["openComment"]);

const like = ref(false);
const animate = ref(false);

const handleOpenComment = () => {
  emit("openComment");
};


const toggleLike = () => {
  like.value = !like.value;
  animate.value = true;
  setTimeout(() => {
    animate.value = false;
  }, 300);
};

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check this out!",
        text: "I found something interesting for you.",
        url: window.location.href,
      });
      console.log("Shared successfully");
    } catch (error) {
      console.warn("Share canceled or failed:", error);
    }
  } else {
    alert("Your browser doesn't support the Share API.");
  }
};

</script>

<template>
  <div
    class="flex text-3xl flex-col w-12 absolute bottom-25 items-center text-white z-10 right-2.5 gap-6"
  >
    <div
      class="flex rounded-full items-center justify-center w-full h-12 bg-blue-500"
    >
      <globus />
    </div>
    <div class="flex flex-col items-center hover:cursor-pointer">
      <heart
        @click="toggleLike"
        :class="[like ? 'text-red-600' : '', animate ? 'animate-like' : '']"
      />
      <span class="text-sm font-medium">50K</span>
    </div>
    <div class="flex flex-col items-center hover:cursor-pointer">
      <comment @click="handleOpenComment" />
      <span class="text-sm font-medium">200</span>
    </div>
    <div class="flex flex-col items-center hover:cursor-pointer">
      <share @click="handleShare"/>
      <span class="text-sm font-medium">35K</span>
    </div>
  </div>
</template>
<style scoped>

</style>
