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
  // const initData =
  //   "query_id=AAEF26U9AgAAAAXbpT3C20dF&user=%7B%22id%22%3A5329246981%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22Najmiddinov%22%2C%22username%22%3A%22Rare_Oligarch%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FGTjzweWw22rKKoIgBxPWYzXbv9dkO9ufpeBr_2IyPoHmmeFc6dQLS9ixvnOKCJyb.svg%22%7D&auth_date=1748249612&signature=e471XL-uOO3WH2i1DmBxhyo0jRCvnyKqBf2BKUJCt8-c4GdGWQBSrXd0Gc7gAReyDcjYVsgMtcObnZ2IP9xzCA&hash=37fa9ca6491483a55a4b3094953635e17d2b058ec61b8703af0303f1825eb489";
  console.log(initData);

  auth.postLogin({ initData }, () => {
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
