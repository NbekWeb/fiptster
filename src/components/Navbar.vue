<script setup>
import earn from "./icons/earn.vue";
import earnDark from "./icons/earn2.vue";
import start from "./icons/start.vue";
import swap from "./icons/swap.vue";
import friends from "./icons/friends.vue";
import shop from "./icons/shop.vue";
import task from "./icons/task.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const currentPageName = computed(() => {
  return route.name?.toString();
});

function goTo(name) {
  router.push({ name });
}

const menus = [
  { name: "Earn", icon: earn },
  { name: "Feed", icon: start },
  { name: "Swap", icon: swap },
  { name: "Friends", icon: friends },
  { name: "Shop", icon: shop },
  { name: "Tasks", icon: task },
];
</script>
<template>
  <div
    class="grid bg-dark-280 text-white grid-cols-6 gap-0 w-full border px-2 py-1 border-t border-dark-500  text-min h-17"
  >
    <div
      v-for="(item, i) in menus"
      :key="i"
      @click="goTo(item.name)"
      class="rounded-lg flex flex-col h-full justify-center items-center gap-1 hover:cursor-pointer"
      :class="
        item.name == currentPageName
          ? 'bg-blue-500'
          : 'bg-transparent  opacity-40'
      "
    >
      <template v-if="item.name == 'Earn' && currentPageName != 'Earn'">
        <earnDark :is="item.icon" class="text-2xl" />
      </template>
      <template v-else>
        <component :is="item.icon" class="text-2xl" />
      </template>

      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
