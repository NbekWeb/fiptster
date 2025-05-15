<script setup>
import start from "./icons/start.vue";
import stopIcon from "./icons/stop.vue";
import muted from "./icons/muted.vue";
import chevron from "./icons/chevron.vue";
import audioIcon from "./icons/audio.vue";
import comment from "./comment.vue";
import send from "./icons/send.vue";
import { ref } from "vue";
import actions from "@/components/actions.vue";

const open = ref(false);
const commentText = ref("");

function onClose() {
  open.value = false;
}
function openCom() {
  open.value = true;
}

function autoResizeTextarea(e) {
  const textarea = e.target;
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}
</script>
<template>
  <div class="overflow-y-hidden h-full w-full relative">
    <actions @openComment="openCom"/>
    <video class="w-full object-cover h-full" autoplay muted loop playsinline>
      <source src="@/assets/video/v1.mp4" type="video/mp4" />
    </video>
    <div
      class="absolute bottom-7.5 left-0 w-full flex pl-6 pr-4 z-10 text-white"
    >
      <div class="flex items-center gap-6 w-full">
        <div class="flex-grow flex flex-col gap-1.5">
          <div class="flex justify-between w-full items-center text-7">
            <span class="flex items-center gap-0.5">
              You've watched 10/20 videos <chevron />
            </span>
            <span class="opacity-50"
              >Watch 10 more videos to earn 100k FIPTp !</span
            >
          </div>
          <div class="relative w-full h-2.5 bg-dark-300 rounded-xl">
            <div
              class="absolute top-0 left-0 w-1/2 h-full rounded-xl bg-blue-500 border-[0.5px] border-dark-555"
            ></div>
          </div>
        </div>
        <div class="flex items-center gap-2 text-2xl">
          <div class="text-xl">
            <stop-icon />
          </div>
          <div>
            <audio-icon />
          </div>
        </div>
      </div>
    </div>
    <a-drawer
      title=" "
      placement="bottom"
      :closable="false"
      :open="open"
      @close="onClose"
    >
      <h3 class="text-dark-220 font-semibold text-sm text-center">
        35059 Comments
      </h3>
      <div class="flex flex-col gap-3 pb-13">
        <comment v-for="i in 10" :key="i" />
      </div>

      <div class="fixed bottom-0 pb-4 left-0 bg-transparent px-6 w-full">
        <div
          class="min-h-9 py-2 h-auto w-full bg-white rounded-10 flex items-center px-3.5 gap-5"
        >
          <textarea
            v-model="commentText"
            placeholder="Type your comment...."
            rows="1"
            @input="autoResizeTextarea"
            class="flex-grow text-sm border-none outline-none px-1 resize-none overflow-hidden bg-transparent"
          />
          <div
            class="h-7 w-7 flex items-center justify-center text-base text-white bg-blue-500 rounded"
          >
            <send />
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
