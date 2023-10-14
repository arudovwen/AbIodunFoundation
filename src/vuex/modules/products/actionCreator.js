import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  total: 0,
  productD:null,
  product: null,
  loading: false,
  success: false,
  addloading: false,
  addsuccess: false,
  editsuccess: false,
  editloading: false,
  deletesuccess: false,
  deleteloading: false,
  error: null,
});

const actions = {
  async addProduct({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(urls.CREATE_PRODUCT, data);

      if (response.status === 200) {
        commit("addSuccess");
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async addProductDetail({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(
        urls.CREATE_PRODUCT_DETAILS,
        data
      );

      if (response.status === 200) {
        commit("addSuccess");
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async editProduct({ commit }, data) {
    try {
      commit("editBegin");
      const response = await DataService.put(urls.UPDATE_PRODUCT, data);

      if (response.status === 200) {
        commit("editSuccess");
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async editProductDetail({ commit }, data) {
    try {
      commit("editBegin");
      const response = await DataService.put(urls.UPDATE_PRODUCT_DETAILS, data);

      if (response.status === 200) {
        commit("editSuccess");
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async getProducts({ commit }, { pageNumber, pageSize, name }) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_PRODUCTS}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
  async getProductDetails(
    { commit },
    { pageNumber, pageSize, name, productId }
  ) {
    try {
      commit("fetchDetailBegin");
      const response = await DataService.get(
        `${urls.GET_PRODUCTS_WITH_DETAILS}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&productId=${productId}`
      );
      if (response.status === 200) {
        commit("fetchDetailSuccess", response.data);
      }
    } catch (err) {
      commit("fetchDetailErr", err);
    }
  },
  async getProduct({ commit }, id) {
    try {
      commit("getBegin");
      const response = await DataService.get(
        `${urls.GET_PRODUCT_BY_ID}?id=${id}`
      );
      if (response.status === 200) {
        commit("getSuccess", response.data);
      }
    } catch (err) {
      commit("getErr", err);
    }
  },
  async deleteProduct({ commit }, id) {
    try {
      commit("deleteBegin");
      const response = await DataService.delete(
        `${urls.DELETE_PRODUCT}?id=${id}`
      );
      if (response.status === 200) {
        commit("deleteSuccess", response.data);
      }
    } catch (err) {
      commit("deleteErr", err);
    }
  },
  async deleteProductDetail({ commit }, id) {
    try {
      commit("deleteBegin");
      const response = await DataService.delete(
        `${urls.DELETE_PRODUCT_DETAIL}?id=${id}`
      );
      if (response.status === 200) {
        commit("deleteSuccess", response.data);
      }
    } catch (err) {
      commit("deleteErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
