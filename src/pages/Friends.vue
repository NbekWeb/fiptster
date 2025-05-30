<script setup>
import wrapper from "@/components/wrapper.vue";
import check from "@/components/icons/check.vue";
import coin from "@/components/icons/coin.vue";
import copy from "@/components/icons/copy.vue";
import { message } from "ant-design-vue";
import { ref, onMounted } from "vue";
import refresh from "@/components/icons/refresh.vue";
import friendCard from "@/components/friendCard.vue";
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";
import { formatNumber } from "@/utils/numFormat";

const auth = useAuth();
const { user, referalls, points } = storeToRefs(auth);

const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check this out!",
        text: "I found something interesting for you.",
        url: `https://t.me/nbekbot/salom?startapp=${user.value.tg_id}`,
      });
      console.log("Shared successfully");
    } catch (error) {
      console.warn("Share canceled or failed:", error);
    }
  } else {
    alert("Your browser doesn't support the Share API.");
  }
};
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(
      `https://t.me/nbekbot/start?startapp=${user.value.tg_id}`
    );
    message.success("Link copied to clipboard!");
  } catch (error) {
    console.warn("Copy failed:", error);
    message.error("Failed to copy link.");
  }
};

function refreshReferall() {
  auth.getReferall();
}
onMounted(() => {
  refreshReferall();
  auth.getReferallPoint();
});
</script>
<template>
  <wrapper type="swap">
    <template #top> </template>
    <template #main>
      <div class="text-white w-full h-full flex flex-col">
        <h2 class="text-3xl font-bold mb-2 text-center">Invite friends!</h2>
        <h4 class="text-xs font-semibold mb-5 text-center">
          You and your friends will receive bonuses
        </h4>
        <div
          class="flex text-xs justify-between items-center bg-dark-300 rounded-10 p-1"
        >
          <div class="flex items-center gap-1 ml-2.5">
            Invite a friend
            <div
              class="w-4 h-4 rounded bg-blue-500 items-center flex justify-center"
            >
              <check class="text-min" />
            </div>
          </div>
          <div
            class="p-2 rounded-10 bg-dark-220 flex items-center gap-2 font-semibold"
          >
            <coin class="text-base" />
            +{{ formatNumber(+points, "abbreviate") }} for both of you
          </div>
        </div>
        <div class="flex gap-1.5 h-12.5 items-center my-2.5">
          <button
            @click="handleShare"
            class="h-full text-base font-semibold flex-grow bg-blue-500 rounded-10 flex items-center justify-center"
          >
            Invite Now!
          </button>
          <button
            @click="handleCopy"
            class="h-full w-12.5 bg-blue-500 rounded-10 flex items-center justify-center"
          >
            <copy class="text-xl" />
          </button>
        </div>
        <div class="flex-grow flex flex-col overflow-y-auto">
          <div class="flex justify-between items-center text-xs">
            <span class="font-bold">
              List of Friends
              {{ referalls.length > 0 ? `(${referalls.length})` : "" }}
            </span>
            <span class="text-xl" @click="refreshReferall">
              <refresh />
            </span>
          </div>
          <div class="flex flex-col gap-2 mt-2.5" v-if="referalls.length > 0">
            <friendCard v-for="(item, i) in referalls" :key="i" />
          </div>
          <span v-else class="font-medium text-base mt-5">
            No referrals yet. Share your link and start earning!
          </span>
        </div>
        <div class="flex justify-center mt-5">
          <button
            @click="handleShare"
            class="h-12.5 bg-blue-500 rounded-10 max-w-max px-7.5 flex items-center"
          >
            Invite more friends
          </button>
        </div>
      </div>
    </template>
  </wrapper>
</template>
<style scoped></style>
