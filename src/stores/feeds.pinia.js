import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useFeed = defineStore("feeds", {
  state: () => ({
    categries: [],
    feeds: [],
  }),
  actions: {
    getFeedsCategory(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("feeds/categories/");
      api({
        url: "feeds/categories/",
        method: "GET",
      })
        .then(({ data }) => {
          this.categries = data;
          callback(data);
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/categories/");
        });
    },
    getFeeds(params) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/");
      api({
        url: "feeds/feeds/",
        method: "GET",
        params,
      })
        .then(({ data }) => {
          this.feeds = data;
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/");
        });
    },
    checktask(id, callback = () => {}, secret_code = "") {
      const core = useCore();
      core.loadingUrl.add("account/channels/");
      const params = {};
      if (secret_code) {
        params.secret_code = secret_code;
      }
      api({
        url: `account/channels/check/${id}/`,
        method: "GET",
        params,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          console.log(error.response.data.msg);
          if (error.response.data.msg) {
            message.error(error.response.data.msg);
          }
        })
        .finally(() => {
          core.loadingUrl.delete("account/channels/");
        });
    },
    likeVideo(data) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/like/");
      api({
        url: "feeds/feeds/like/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          message.success("Video liked successfully");
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/like/");
        });
    },
  },
});

export default useFeed;
