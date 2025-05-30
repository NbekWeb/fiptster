<script setup>
// import useAuth from "@/stores/auth.pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import useAuth from "@/stores/auth.pinia";

const auth = useAuth();
const router = useRouter();

onMounted(() => {
  const tg = window.Telegram.WebApp;
  const initData = tg.initData;

  const params = new URLSearchParams(initData);
  const referral_code = params.get("start_param") || "";
  console.log(initData);

  auth.postLogin({ initData, referral_code }, () => {
    router.push({ name: "Earn" });
  });
});
</script>
<template>
  <div
    class="min-h-dvh text-white overflow-y-hidden w-full flex items-center justify-center"
  >
    <a-spin :spinning="true" size="large"></a-spin>
  </div>
</template>
