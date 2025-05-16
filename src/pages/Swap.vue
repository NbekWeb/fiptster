<script setup>
import wrapper from "@/components/wrapper.vue";
import info from "@/components/info.vue";
import coin from "@/components/icons/coin.vue";
import swapicon from "@/components/icons/swap.vue";
import { ref } from "vue";

const open = ref(false);

function confirmOpen() {
  open.value = true;
}

function onClose() {
  open.value = false;
}

const data = [
  {
    title: "FIPTp",
    content: "507.98 K",
    logo: true,
  },
  {
    title: "FIPT",
    content: "507.98 K",
    logo: true,
  },
  {
    title: "Conversion Rate",
    content: "80%",
    logo: true,
    info: "Lorem Ipsum dolor cop Lorem Ipsum dolor,  Lorem Ipsum dolor",
  },
];
</script>
<template>
  <wrapper type="swap">
    <template #top> </template>
    <template #main>
      <div class="text-white w-full">
        <div class="grid grid-cols-3 gap-2">
          <info v-for="(item, i) in data" :key="i" :data="item" />
        </div>
        <div
          class="w-full rounded-10 bg-dark-300 py-5 mt-2.5 flex flex-col items-center gap-1"
        >
          <h3 class="text-xl font-bold mb-0">Swap</h3>
          <span class="font-semibold text-xs opacity-80"
            >Convert your FIPTp to FIPT
          </span>
        </div>
        <div class="mt-5 py-2.5 px-3 bg-dark-300 rounded-10">
          <div>
            <span>From</span>
            <div
              class="rounded-10 bg-dark-280 px-3 py-5 flex justify-between mt-2.5"
            >
              <div class="flex flex-col gap-4">
                <span class="font-semibold text-base">0.00</span>
                <span class="text-xs opacity-80">Balance: 508,981 FIPTp</span>
              </div>
              <div
                class="px-2 py-2.5 max-h-max bg-liner-dark rounded-10 text-xs font-semibold flex items-center gap-1"
              >
                <coin class="text-sm" />
                FIPTp
              </div>
            </div>
          </div>
          <swapicon class="text-xl mx-auto my-5" />
          <div>
            <div class="flex items-center justify-between">
              <span>To</span>
              <div class="flex items-center gap-1 text-xs">
                Rate: 1 FIPTp = 0.2 FIPT
                <a-dropdown :trigger="['click']" placement="bottom" class="">
                  <a class="ant-dropdown-link" @click.prevent>
                    <img
                      src="@/assets/img/info.svg"
                      class="opacity-50 w-3.75 h-auto object-contain"
                    />
                  </a>
                  <template #overlay>
                    <div class="max-w-16 swap">
                      Lorem Ipsum dolor cop Lorem Ipsum dolor, Lorem Ipsum dolor
                    </div>
                  </template>
                </a-dropdown>
              </div>
            </div>
            <div
              class="rounded-10 bg-dark-280 px-3 py-5 flex justify-between mt-2.5"
            >
              <div class="flex flex-col gap-4">
                <span class="font-semibold text-base">0.00</span>
                <span class="text-xs opacity-80">Balance: 508,981 FIPT</span>
              </div>
              <div
                class="px-2 py-2.5 max-h-max bg-liner-dark rounded-10 text-xs font-semibold flex items-center gap-1"
              >
                <coin class="text-sm" />
                FIPT
              </div>
            </div>
          </div>
          <button
            @click="confirmOpen"
            class="bg-blue-500 rounded-10 mt-5 w-full h-15 text-base font-semibold flex items-center justify-center"
          >
            Swap
          </button>
        </div>
        <a-drawer
          title=" "
          placement="bottom"
          :closable="false"
          :open="open"
          @close="onClose"
          height="auto"
          class="swap-drawer"
        >
          <div class="text-white">
            <h3 class="text-3xl font-medium text-center">
              Confirm Transaction
            </h3>
            <div class="pl-5 text-sm flex items-center gap-4 mt-3">
              <img src="@/assets/img/check.svg" class="w-4 h-auto" />
              Account 1
            </div>
            <p class="font-inter text-center text-base font-bold mb-4 mt-2">
              Swap: 100,000 FIPTp 100FIPT
            </p>
            <div class="grid gap-5 grid-cols-2 h-12">
              <button
                @click="onClose"
                class="text-black font-medium bg-white text-base items-center justify-center h-full rounded-10"
              >
                Cancel
              </button>
              <button
                @click="onClose"
                class="text-white bg-blue-500 font-medium text-base flex items-center justify-center h-full rounded-10"
              >
                Confirm
              </button>
            </div>
            <p class="text-sm text-center pb-5 text-grey-600 mt-4 leading-4">
              Be sure to check the service address before connecting the wallet.
            </p>
          </div>
        </a-drawer>
      </div>
    </template>
  </wrapper>
</template>
<style scoped>
.bg-liner-dark {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(78, 73, 73, 0.2) 100%
  );
}
</style>
