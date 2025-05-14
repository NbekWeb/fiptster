import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layouts/Main.vue";
import Earn from "@/pages/Earn.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      children: [
        {
          path: "",
          name: "Earn",
          component: Earn,
        },
        {
          path: "user",
          name: "User",
          component: () => import("@/pages/User.vue"),
        },
        {
          path: "feed",
          name: "Feed",
          component: () => import("@/pages/Feed.vue"),
        },
        {
          path: "levels",
          name: "Levels",
          component: () => import("@/pages/Levels.vue"),
        },
      ],
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
