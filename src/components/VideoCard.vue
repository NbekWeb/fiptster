<script setup>
import start from "./icons/start.vue";
import stopIcon from "./icons/stop.vue";
import mutedIcon from "./icons/muted.vue";
import chevron from "./icons/chevron.vue";
import audioIcon from "./icons/audio.vue";
import comment from "./comment.vue";
import send from "./icons/send.vue";
import { ref, defineExpose, watch, onBeforeUnmount, onMounted } from "vue";
import actions from "@/components/actions.vue";
import useVideo from "@/stores/video.pinia";
import useFeed from "@/stores/feeds.pinia";
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";

const videoPinia = useVideo();
const feedPinia = useFeed();
const authPinia = useAuth();
const { muted, videosCount } = storeToRefs(videoPinia);
const { user } = storeToRefs(authPinia);

const open = ref(false);
const videoRef = ref(null);
const isPlaying = ref(true);
const commentText = ref("");
const emit = defineEmits(["videoEnded"]);

const onEnded = (val) => {
  if (val) {
    emit("videoEnded");
  }
  toggleVideoPlayback();
};

function toggleVideoPlayback() {
  if (!videoRef.value) return;

  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }

  isPlaying.value = !isPlaying.value;
}

function onClose() {
  open.value = false;
}
function openCom() {
  open.value = true;
}
function toggleMute() {
  videoPinia.toggleMute();
}

function autoResizeTextarea(e) {
  const textarea = e.target;
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}
defineExpose({
  videoRef,
});
const props = defineProps({
  current: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});
watch(
  () => props.current,
  (newVal) => {
    if (!newVal && videoRef.value) {
      videoRef.value.pause();
      isPlaying.value = false;
    } else {
      videoRef.value.play();
      isPlaying.value = true;
    }
    videoRef.value.currentTime = 0;
  }
);
onBeforeUnmount(() => {
  if (videoRef.value) {
    videoRef.value.currentTime = 0;
    videoRef.value.pause();
  }
});

function sendComment() {
  feedPinia.sendComment(props.data.uuid, { text: commentText.value }, () => {
    feedPinia.getFeed(props.data.uuid, (data) => {
      props.data.comment_list = data.feed_comment_list;
      commentText.value = "";
    });
  });
}
</script>
<template>
  <div class="overflow-y-hidden h-full w-full relative">
    <actions @openComment="openCom" :data="data" />

    <video
      @ended="() => onEnded(data.type === 'advertisement')"
      class="w-full object-cover h-full"
      autoplay
      ref="videoRef"
      :muted="muted"
      playsinline
    >
      <source :src="data?.video_file" type="video/mp4" />
    </video>
    <div
      class="absolute bottom-7.5 left-0 w-full flex pl-6 pr-4 z-10 text-white"
    >
      <div class="flex items-center gap-6 w-full">
        <div class="flex-grow flex flex-col gap-1.5">
          <div class="flex justify-between w-full items-center text-7">
            <span class="flex items-center gap-0.5">
              You've watched {{ videosCount }}/20 videos <chevron />
            </span>
            <span class="opacity-50"
              >Watch 10 more videos to earn 100k FIPTp !</span
            >
          </div>
          <div class="relative w-full h-2.5 bg-dark-300 rounded-xl">
            <div
              :style="{ width: (videosCount / 20) * 100 + '%' }"
              class="absolute top-0 left-0 h-full rounded-xl bg-blue-500 border-[0.5px] border-dark-555"
            ></div>
          </div>
        </div>
        <div class="flex items-center gap-2 text-2xl">
          <div class="text-xl" @click="toggleVideoPlayback">
            <start v-if="!isPlaying" />
            <stop-icon v-else />
          </div>

          <div @click="toggleMute">
            <audio-icon v-if="!muted" />
            <muted-icon v-else />
          </div>
        </div>
      </div>
    </div>
    <div
      @click="toggleMute"
      v-if="muted"
      class="absolute z-20 top-1/2 text-white flex items-center justify-center left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-dark-350/50 text-4xl"
    >
      <audio-icon v-if="!muted" />
      <muted-icon v-else />
    </div>
    <div
      @click="toggleVideoPlayback"
      v-else-if="!isPlaying"
      class="absolute z-20 top-1/2 text-white flex items-center justify-center left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-dark-350/50 text-4xl"
    >
      <start v-if="!isPlaying" />
      <stop-icon v-else />
    </div>
    <a-drawer
      title=" "
      placement="bottom"
      :closable="false"
      :open="open"
      @close="onClose"
    >
      <h3
        v-if="data.comment_list.length > 1"
        class="text-dark-220 font-semibold text-sm text-center"
      >
        {{ data.comment_list.length }} Comments
      </h3>
      <div class="flex flex-col gap-3 pb-13">
        <comment v-for="(item, i) in data.comment_list" :key="i" :data="item" />
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
            @click="sendComment"
            class="h-7 w-7 flex items-center justify-center text-base text-white bg-blue-500 rounded"
          >
            <send />
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
