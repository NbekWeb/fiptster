<script setup>
import { ref } from "vue";
import selectingCard from "@/components/selectingCard.vue";
import coin from "@/components/icons/coin.vue";
import closeIcon from "./icons/close.vue";

const open = ref(false);
function onClose() {
  open.value = false;
}
function openWallet() {
  open.value = true;
}

defineExpose({
  openWallet,
});
</script>
<template>
  <a-drawer
    title=" "
    placement="bottom"
    class="!bg-dark-200"
    :closable="false"
    :open="open"
    @close="onClose"
    height="auto"
  >
    <div class="text-white flex flex-col gap-4 items-center relative">
      salom Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laboriosam temporibus corporis tempore laudantium iusto similique eos, sit illum nostrum ullam praesentium esse, maxime tenetur id odio dolor repellendus! Libero!
    </div>
  </a-drawer>
</template>
<style scoped></style>
