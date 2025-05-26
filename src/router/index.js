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
        {
          path: "swap",
          name: "Swap",
          component: () => import("@/pages/Swap.vue"),
        },
        {
          path: "friends",
          name: "Friends",
          component: () => import("@/pages/Friends.vue"),
        },
        {
          path: "shop",
          name: "Shop",
          component: () => import("@/pages/Shop.vue"),
        },
        {
          path: "tasks",
          name: "Tasks",
          component: () => import("@/pages/Tasks.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/Login.vue"),
    }
  ],
});

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("access_token");

  if (to.name === "login") {
    return next();
  }

  if (accessToken) {
    return next();
  } else {
    return next({
      name: "login",
    });
  }
});

export default router;
