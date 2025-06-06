<script setup>
import wrapper from "@/components/wrapper.vue";
import { ref, onMounted, watch } from "vue";
import MiniCard from "@/components/MiniCard.vue";
import coin from "@/components/icons/coin.vue";
import cash from "@/components/icons/cash.vue";
import { TonConnectUI } from "@tonconnect/ui";
import useAuth from "@/stores/auth.pinia";
import { storeToRefs } from "pinia";
import chevron from "@/components/icons/chevron.vue";
import { formatNumber } from "@/utils/numFormat";

const selectedLanguage = ref("English");
const isOpen = ref(false);

const isWalletConnected = ref(null);

const notification = ref(true);
const connecting = ref(false);
const auth = useAuth();
const { user } = storeToRefs(auth);

const tonConnectUI = ref(null);

const sound = ref(true);

watch(
  () => user.value?.is_sound,
  (val) => {
    sound.value = val ?? true;
  },
  { immediate: true }
);

const languageOptions = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Russian", value: "Russian" },
];

function goTg() {
  window.open("https://t.me/warburg1", "_blank");
}

function toggleSound() {
  auth.toggleSound({ sound: sound.value }, () => {
    user.value.is_sound = !user.value.is_sound;
  });
}
watch(notification, (val) => {
  localStorage.setItem("push", val.toString());
});
onMounted(() => {
  tonConnectUI.value = new TonConnectUI({
    manifestUrl: "https://fiptster.vercel.app/tonconnect-manifest.json",
    buttonRootId: "ton-connect-button",
  });
  const storedPush = localStorage.getItem("push");
  notification.value = storedPush !== null ? storedPush === "true" : true;

  if (tonConnectUI.value.connector) {
    const walletInfo = tonConnectUI.value.connector.wallet;
    isWalletConnected.value = walletInfo;
    // console.log("Ulangan wallet:", tonConnectUI.value?.connector);
  }
});
</script>
<template>
  <wrapper>
    <template #top>
      <div class="max-h-max w-full flex justify-center gap-2 items-center">
        <img
          :src="user.avatar ? user.avatar : '@/assets/img/user.png'"
          class="w-8.5 h-8.5 object-cover min-h-8.5 rounded-full"
        />
      </div>
    </template>
    <template #main>
      <div class="w-full text-white h-full overflow-y-auto">
        <h3 class="text-center text-xl font-semibold">
          {{ user?.username ? `@${user.username}` : user.first_name }}
        </h3>
       
        <div class="flex flex-col gap-2">
          <MiniCard>
            <div class="flex justify-between items-center w-full">
              <span> Total FIPTp Earned </span>
              <div
                class="h-10 flex px-5 gap-2 items-center bg-dark-220 rounded-md"
              >
                <coin class="text-15" />
                <span
                  >{{
                    formatNumber(
                      user?.user_profile?.coin ? user?.user_profile?.coin : 0,
                      "integer"
                    )
                  }}
                </span>
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
              <a-switch v-model:checked="sound" @change="toggleSound" />
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
              <span> Total Watch Time </span>
              <div class="h-10 flex px-5 items-center bg-dark-220 rounded-md">
                10,000 Hours
              </div>
            </div>
          </MiniCard>
          <MiniCard>
            <div class="flex justify-between items-center w-full">
              <span> Connect Wallet</span>

              <button id="ton-connect-button"></button>
            </div>
          </MiniCard>
        </div>
      </div>
    </template>
  </wrapper>
</template>
