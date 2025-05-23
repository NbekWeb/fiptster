<script setup>
import wrapper from "@/components/wrapper.vue";
import shopCard from "@/components/shopCard.vue";
import shopItemDrawer from "@/components/shopItemDrawer.vue";
import { ref } from "vue";

const selectedType = ref("All");

const drawerRef = ref();

function openDrawer() {
  drawerRef.value?.openDrawer();
}
function changeType(type) {
  selectedType.value = type;
}
const types = ["All", "Clothing", "Accessories", "NFTs"];
</script>
<template>
  <wrapper type="full">
    <template #main>
      <div class="text-white h-full overflow-y-auto">
        <div
          class="w-full bg-dark-300 text-xs font-semibold mb-4 h-10 rounded-10 p-1 grid grid-cols-4"
        >
          <span
            v-for="(item, i) in types"
            :key="i"
            class="h-full flex items-center justify-center rounded"
            :class="selectedType == item && 'bg-blue-500'"
            @click="changeType(item)"
          >
            {{ item }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <shopCard v-for="i in 10" :key="i" @open="openDrawer" />
        </div>
      </div>
      <shopItemDrawer ref="drawerRef" />
    </template>
  </wrapper>
</template>
<style scoped></style>
