<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import useAuth from "@/stores/auth.pinia";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";

const auth = useAuth();
const core = useCore();
const { loadingUrl } = storeToRefs(core);

onMounted(() => {
  auth.getUser();
});
</script>
<template>
  <a-spin :spinning="loadingUrl.has('user')">
    <div class="h-full w-full flex pb-20">
      <RouterView />
      <div class="fixed bottom-0 left-0 w-full">
        <Navbar />
      </div>
    </div>
  </a-spin>
</template>
