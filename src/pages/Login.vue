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
  // const initData =
  //   "query_id=AAEF26U9AgAAAAXbpT0ksm6v&user=%7B%22id%22%3A5329246981%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22Najmiddinov%22%2C%22username%22%3A%22Rare_Oligarch%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FGTjzweWw22rKKoIgBxPWYzXbv9dkO9ufpeBr_2IyPoHmmeFc6dQLS9ixvnOKCJyb.svg%22%7D&auth_date=1748598413&signature=caVFVERSCl4jKbB5Gd6K5lTXR8QrworEvEyfNgeL3XIs0MaQyDwYc4GI-djfpXtv4VyR2lIyJiojejMRZjf8Aw&hash=19452765c1b0766e2d8291781458c9de83bbc96b29d69e5c4e1c5242c47ea23f";
  console.log(initData);

  auth.postLogin({ initData ,referral_code}, () => {
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
