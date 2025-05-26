import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useTask = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    getTasks(callback=() => {}) {
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
  },
});

export default useTask;
