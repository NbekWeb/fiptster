import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    grouped: [],
  }),
  actions: {
    postLogin(data, callback) {
      api({
        url: "account/auth/telegram/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          callback();
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {});
    },
    getUser(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "account/profile/",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
          callback();
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
    getGrouped() {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "account/profile/grouped/",
        method: "GET",
      })
        .then(({ data }) => {
          this.grouped = data;
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
    addCoin(data, callback) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "account/profile/coin_updated/",
        method: "PATCH",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("user");
        });
    },
  },
});

export default useAuth;
