import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/utility/cleanObject";

const state = () => ({
  data: [],
  allData:[],
  total: 0,
  productD: null,
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
  prodloading: false,
  additionalsuccess:false,
  additionaldata:null,
  additionalloading:false,
  
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
  async getProducts({ commit }, data) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_PRODUCTS}?${new URLSearchParams(cleanObject(data))}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
   async getAllProducts({ commit }, data) {
   
      const response = await DataService.get(
        `${urls.GET_ALL_PRODUCTS}?${new URLSearchParams(cleanObject(data))}`
      );
      if (response.status === 200) {
        commit("fetchAllSuccess", response.data);
      }
   
  },
  async getProductDetails({ commit }, data) {
    try {
      commit("fetchDetailBegin");
      const response = await DataService.get(
        `${urls.GET_PRODUCTS_WITH_DETAILS}?${new URLSearchParams(
          cleanObject(data)
        )}`
      );
      if (response.status === 200) {
        commit("fetchDetailSuccess", response.data);
      }
    } catch (err) {
      commit("fetchDetailErr", err);
    }
  },
  async getProductAddionalField({ commit }, data) {
    try {
      commit("fetchAddBegin");
      const response = await DataService.get(
        `${urls.GET_ADDIOTIONAL_FIELDS}?${new URLSearchParams(
          cleanObject(data)
        )}`
      );
      if (response.status === 200) {
        commit("fetchAddSuccess", response.data);
      }
    } catch (err) {
      commit("fetchAddErr", err);
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
