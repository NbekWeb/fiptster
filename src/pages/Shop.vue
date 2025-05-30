<script setup>
import wrapper from "@/components/wrapper.vue";
import shopCard from "@/components/shopCard.vue";
import shopItemDrawer from "@/components/shopItemDrawer.vue";
import ConnectWallet from "@/components/ConnectWallet.vue";
import Shipping from "@/components/Shipping.vue";
import { ref, onMounted } from "vue";
import useMarket from "@/stores/market.pinia";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";

const market = useMarket();
const selectedType = ref("-1");
const { products } = storeToRefs(market);

const drawerRef = ref();
const connectRef = ref();
const shippingRef = ref();

function openDrawer(id) {
  market.getProduct(id, () => {
    drawerRef.value?.openDrawer();
  });
}
function openWallet() {
  connectRef.value?.openWallet();
}
function goBack() {
  drawerRef.value?.openDrawer();
}
function openShipping() {
  shippingRef.value?.openWallet();
}
function changeType(type) {
  market.getProducts({ category: type }, (data) => {
    if (data?.length == 0) {
      message.info("Comming soon!");
    } else {
      selectedType.value = type;
    }
  });
}
const types = ref([
  {
    name: "All",
    uuid: "-1",
  },
]);

onMounted(() => {
  market.getShopCategory((res) => {
    types.value = [
      {
        name: "All",
        uuid: "-1",
      },
      ...res.map((item) => ({
        name: item.name,
        uuid: item.uuid,
      })),
    ];
  });
  market.getProducts();
});
</script>
<template>
  <wrapper type="full">
    <template #main>
      <div class="text-white h-full overflow-y-auto">
        <div
          class="w-full min-w-full bg-dark-300 text-xs font-semibold mb-4 h-10 rounded-10 p-1 grid grid-cols-4"
        >
          <span
            v-for="(item, i) in types"
            :key="i"
            class="h-full min-w-max flex items-center justify-center rounded"
            :class="selectedType == item.uuid && 'bg-blue-500'"
            @click="changeType(item.uuid)"
          >
            {{ item?.name }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <shopCard
            v-for="item in products"
            :key="item.uuid"
            :data="item"
            @open="openDrawer(item.uuid)"
          />
        </div>
      </div>
      <shopItemDrawer ref="drawerRef" @goNext="openShipping"  />
      <Shipping ref="shippingRef" @back="goBack" />
      <ConnectWallet ref="connectRef" />
    </template>
  </wrapper>
</template>
<style scoped></style>
