import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useSwap = defineStore("swap", {
  state: () => ({}),
  actions: {
    swap(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("user");
      api({
        url: "token_swap/token-swap/",
        method: "POST",
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

export default useSwap;
