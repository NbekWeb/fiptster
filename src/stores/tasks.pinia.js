import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useTask = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    getTasks(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("account/channels/");
      api({
        url: "account/channels/",
        method: "GET",
      })
        .then(({ data }) => {
          this.tasks = data;
          callback();
        })
        .catch((error) => {
          message.error(error);
        })
        .finally(() => {
          core.loadingUrl.delete("account/channels/");
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
        params
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
  },
});

export default useTask;
