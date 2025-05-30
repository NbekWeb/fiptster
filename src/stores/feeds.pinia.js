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
    getFeeds(params, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/");
      api({
        url: "feeds/feeds/",
        method: "GET",
        params,
      })
        .then(({ data }) => {
          if (data.length == 0) {
            message.error("This category is currently empty!");
          } else {
            this.feeds = data;
          }

          callback(data.length);
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/");
        });
    },
    shareFeed(id, callback) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/id");
      api({
        url: `feeds/feeds/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/id");
        });
    },
    getFeed(id, callback) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/id");
      api({
        url: `feeds/feeds/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          callback(data);
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/id");
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
    likeVideo(uuid, callback) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/like/");
      api({
        url: `feeds/feeds/likes/${uuid}/`,
        method: "GET",
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/like/");
        });
    },
    likeComment(uuid, callback) {
      const core = useCore();
      core.loadingUrl.add("comments");
      api({
        url: `feeds/feeds/comments/like/${uuid}/`,
        method: "POST",
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("comments");
        });
    },
    disLikeComment(uuid, callback) {
      const core = useCore();
      core.loadingUrl.add("comments");
      api({
        url: `feeds/feeds/comments/dislike/${uuid}/`,
        method: "DELETE",
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("comments");
        });
    },

    dislikeVideo(uuid, callback) {
      const core = useCore();
      core.loadingUrl.add("feeds/feeds/like/");
      api({
        url: `feeds/feeds/dislike/${uuid}/`,
        method: "DELETE",
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("feeds/feeds/like/");
        });
    },
    sendComment(id, data, callback) {
      const core = useCore();
      core.loadingUrl.add("comments");
      api({
        url: `/feeds/feeds/comments/${id}/`,
        method: "POST",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("comments");
        });
    },
  },
});

export default useFeed;
