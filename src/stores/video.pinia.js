import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useVideo = defineStore("video", {
  state: () => ({
    user: {},
    muted: true,
    videosCount: 1,
  }),
  actions: {
    toggleMute() {
      this.muted = !this.muted;
    },
    postLogin(data, callback) {
      api({
        url: "login/",
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
    getUser(callback) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "profile/",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
          callback(data.id);
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

export default useVideo;
