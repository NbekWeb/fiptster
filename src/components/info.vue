<script setup>
import coin from "./icons/coin.vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<template>
  <div
    class="flex flex-col rounded-lg bg-dark-300 p-2 items-center justify-center gap-1.5 h-12.5 text-min text-white"
  >
    <span class="text-blue-500 font-medium">
      {{ data?.title }}
    </span>
    <div class="flex items-center gap-1">
      <coin class="text-15" v-if="data.logo" />
      <span class="font-semibold">
        {{ data.content }}
      </span>
      <a-dropdown :trigger="['click']" v-if="!!data.info" placement="bottom">
        <a class="ant-dropdown-link" @click.prevent>
          <img
            src="@/assets/img/info.svg"
            class="opacity-50 w-3.75 h-auto object-contain"
          />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="3"> {{ data.info }}</a-menu-item>
          </a-menu></template
        >
      </a-dropdown>
    </div>
  </div>
</template>
