import { createRouter, createWebHistory } from "vue-router";
import Main from "@/layouts/Main.vue";
import Earn from "@/pages/Earn.vue";
import Feed from "@/pages/Feed.vue";
import Shop from "@/components/icons/shop.vue";
import Friends from "@/pages/Friends.vue";
import Levels from "@/pages/Levels.vue";
import Swap from "@/pages/Swap.vue";
import User from "@/pages/User.vue";
import Login from "@/pages/Login.vue";
import Tasks from "@/pages/Tasks.vue";

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
          component: User,
        },
        {
          path: "feed",
          name: "Feed",
          component: Feed,
        },
        {
          path: "levels",
          name: "Levels",
          component: Levels,
        },
        {
          path: "swap",
          name: "Swap",
          component: Swap,
        },
        {
          path: "friends",
          name: "Friends",
          component: Friends,
        },
        {
          path: "shop",
          name: "Shop",
          component: Shop,
        },
        {
          path: "tasks",
          name: "Tasks",
          component: Tasks,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
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
