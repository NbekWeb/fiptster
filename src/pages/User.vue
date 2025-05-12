<script setup>
import wrapper from "@/components/wrapper.vue";
import { ref,onMounted } from "vue";
import MiniCard from "@/components/MiniCard.vue";
import coin from "@/components/icons/coin.vue";
import cash from "@/components/icons/cash.vue";
import { TonConnectUI } from "@tonconnect/ui";

import chevron from "@/components/icons/chevron.vue";

const selectedLanguage = ref("English");
const isOpen = ref(false);
const sound = ref(false);
const notification = ref(true);
const connecting = ref(false);

const languageOptions = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Russian", value: "Russian" },
];

function goTg() {
  window.open("https://t.me/your_username", "_blank");
}

const connectWallet = () => {
  const tonConnectUI = new TonConnectUI({
    manifestUrl: "https://click-bit.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect-button",
  });

  tonConnectUI.connector
    .connect()
    .then((wallet) => {
      connecting.value = true;
    })
    .catch((err) => {
      connecting.value = false;
    });
};
onMounted(() => {
//   const tonConnectUI = new TonConnectUI({
//     manifestUrl: "https://click-bit.vercel.app/tonconnect-manifest.json",
//     buttonRootId: "ton-connect-button",
//   });

//   if (tonConnectUI.connector.connected) {
//     connecting.value = true;
//   }
});
</script>
<template>
  <wrapper>
    <template #top>
      <div class="max-h-max w-full flex justify-center gap-2 items-center">
        <img src="@/assets/img/user.png" class="w-8.5 h-auto object-contain" />
      </div>
    </template>
    <template #main>
      <div class="w-full text-white h-full overflow-y-auto">
        <h3 class="text-center text-xl font-semibold">@NbekDev</h3>
        <div class="flex flex-col gap-2">
          <MiniCard>
            <div class="flex justify-between items-center w-full">
              <span> Total FIPTp Earned </span>
              <div
                class="h-10 flex px-5 gap-2 items-center bg-dark-220 rounded-md"
              >
                <coin class="text-15" />
                <span>10,900,999 </span>
              </div>
            </div>
          </MiniCard>
          <MiniCard>
            <div class="w-full flex items-center justify-between">
              <span>Language</span>
              <a-select
                v-model:value="selectedLanguage"
                class="w-32"
                :options="languageOptions"
                @dropdownVisibleChange="isOpen = $event"
              >
                <template #suffixIcon>
                  <span
                    class="text-sm text-white transition-transform duration-200"
                    :class="isOpen ? '-rotate-90' : 'rotate-90'"
                  >
                    <chevron />
                  </span> </template
              ></a-select>
            </div>
          </MiniCard>
          <MiniCard>
            <div class="flex justify-between items-center w-full pr-4">
              <span> Sound </span>
              <a-switch v-model:checked="sound" />
            </div>
          </MiniCard>
          <MiniCard>
            <div class="flex justify-between items-center w-full pr-4">
              <span> Push Notifications </span>
              <a-switch v-model:checked="notification" />
            </div>
          </MiniCard>
          <MiniCard>
            <div class="flex justify-between items-center w-full pr-4">
              <span> Support</span>
              <span class="text-blue-500 text-base" @click="goTg">
                <chevron />
              </span>
            </div>
          </MiniCard>
          <MiniCard>
            <div class="flex justify-between items-center w-full">
              <span> Total FIPTp Earned </span>
              <div class="h-10 flex px-5 items-center bg-dark-220 rounded-md">
                10,000 Hours
              </div>
            </div>
          </MiniCard>
          <MiniCard>
            <div class="flex justify-between items-center w-full">
              <span> Total FIPTp Earned </span>
              <div
                @click="connectWallet"
                v-if="!connecting"
                class="h-10 flex w-10 justify-center text-xl items-center bg-dark-220 rounded-md"
              >
                <cash />
              </div>
              <button  id="ton-connect-button"></button>
            </div>
          </MiniCard>
        </div>
      </div>
    </template>
  </wrapper>
</template>
