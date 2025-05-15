<script setup>
import { ref } from "vue";
import heart from "./icons/heart.vue";
import heartLine from "./icons/heart-line.vue";
const like = ref(false);
const animate = ref(false);

const toggleLike = () => {
  like.value = !like.value;
  animate.value = true;
  setTimeout(() => {
    animate.value = false;
  }, 300);
};
</script>
<template>
  <div class="flex items-start gap-2 text-dark-220 text-xs">
    <img src="@/assets/img/user.png" class="w-8 rounded-full" />
    <div class="flex flex-col">
      <h4 class="text-sm font-semibold my-2">TugiyemMakelar</h4>
      <div class="flex gap-5">
        <p class="mb-0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
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
          <span class="text-min font-medium leading-3">50K</span>
        </div>
      </div>
    </div>
  </div>
</template>
