<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div class="h-full w-full flex pb-20  ">
    <RouterView  />
    <div class="fixed bottom-0 left-0 w-full">
      <Navbar />
    </div>
  </div>
</template>
