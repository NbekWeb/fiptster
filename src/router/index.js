import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layouts/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
  ],
});

//   router.beforeEach((to, from, next) => {
//     const accessToken = localStorage.getItem("access_token");

//     // document.title = to.meta.title || "Авторизоваться";

//     if (to.name === "login" || to.name === 'regis' || to.name === 'vklogin') {
//       return next();
//     }

//     if (accessToken) {
//       return next();
//     } else {
//       return next({
//         name: "login"
//       });
//     }
//   });

export default router;
