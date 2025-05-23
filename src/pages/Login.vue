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
  //   const initData = tg.initData;
  const initData =
    "query_id=AAGQCL9TAgAAAJAIv1PvoD4H&user=%7B%22id%22%3A5699995792%2C%22first_name%22%3A%22Nodirbek%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Nbekweb%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fqlu4e0C7m9R4a9JJOI_9txwYeVVpFeO_bQj3XIHprSu9tWrCenk5Esr0KnHl8uDu.svg%22%7D&auth_date=1747991897&signature=MjQFTNCu2OWZCO1Z-YLcy4Dz_NQf0ANkzsETL25797sEXO67wkLBz8CuKFKJQDfk_MDrJMstR2BSZlakXR3iDA&hash=98410720b24ea221caa28eb6f48c69a5de46e53e60f6f8fe09e528d350c24c7f";
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
