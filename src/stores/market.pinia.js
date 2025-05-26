import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import { message } from "ant-design-vue";
import useCore from "./core.pinia";

const useMarket = defineStore("market", {
  state: () => ({
    shopCategory: [],
    products: [],
    product: {},
  }),
  actions: {
    getShopCategory(callback) {
      const core = useCore();
      core.loadingUrl.add("market/categories/");
      api({
        url: "market/categories/",
        method: "GET",
      })
        .then(({ data }) => {
          this.shopCategory = data;
          callback(data);
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("market/categories/");
        });
    },
    getProducts(params = {}, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("market/markets/");
      api({
        url: "market/markets/",
        method: "GET",
        params,
      })
        .then(({ data }) => {
          if (data?.results.length !== 0) {
            this.products = data?.results;
          }
          callback(data?.results);
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("market/markets/");
        });
    },
    getProduct(id, callback) {
      const core = useCore();
      core.loadingUrl.add("market/markets/");
      api({
        url: `market/markets/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          this.product = data;
          callback();
        })
        .catch((error) => {
          message.error("Что-то пошло не так!");
        })
        .finally(() => {
          core.loadingUrl.delete("market/markets/");
        });
    },
  },
});

export default useMarket;
