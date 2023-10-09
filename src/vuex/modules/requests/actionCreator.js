import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  reqData: [],
  total: 0,
  request: null,
  requestReq: null,
  loading: false,
  success: false,
  addloading: false,
  addsuccess: false,
  getloading: false,
  getsuccess: false,
  getreqloading: false,
  getreqsuccess: false,
  fetchsuccess: false,
  fetchloading: false,
  fetchreqsuccess: false,
  fetchreqloading: false,
  editsuccess: false,
  editloading: false,
  deletesuccess: false,
  deleteloading: false,
  error: null,
});

const actions = {
  async getUserProducts({ commit }, { pageNumber, name, pageSize }) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_USER_PRODUCT}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
  async getUserProductRequirements(
    { commit },
    { pageNumber, name, pageSize, userproductId }
  ) {
    try {
      commit("fetchReqBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_USER_PRODUCT_REQUIREMENT}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&userproductId=${userproductId}`
      );
      if (response.status === 200) {
        commit("fetchReqSuccess", response.data);
      }
    } catch (err) {
      commit("fetchReqErr", err);
    }
  },
  async getUserProductById({ commit }, id) {
    try {
      commit("getBegin");
      const response = await DataService.get(
        `${urls.GET_USER_PRODUCT_BY_ID}?id=${id}`
      );
      if (response.status === 200) {
        commit("getSuccess", response.data.data);
      }
    } catch (err) {
      commit("getErr", err);
    }
  },
  async getUserProductRequirementById({ commit }, id) {
    try {
      commit("getReqBegin");
      const response = await DataService.get(
        `${urls.GET_USER_PRODUCT_REQUIREMENT_BY_ID}?id=${id}`
      );
      if (response.status === 200) {
        commit("getReqSuccess", response.data.data);
      }
    } catch (err) {
      commit("getReqErr", err);
    }
  },
  async updateUserProduct({ commit }, data) {
    try {
      commit("editBegin");
      const response = await DataService.put(`${urls.UPDATE_USER_PRODUCT}`, {
        ...data,
        id: data.prodId,
      });
      if (response.status === 200) {
        const res = await DataService.put(
          urls.UPDATE_USER_PRODUCT_REQUIREMENT,
          { ...data, id: data.reqId }
        );
        if (res.status === 200) {
          commit("editSuccess", res.data.data);
        }
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async updateUserProductRequirement({ commit }, data) {
    try {
      commit("editBegin");
      const response = await DataService.put(
        `${urls.UPDATE_USER_PRODUCT_REQUIREMENT}, ${data}`
      );
      if (response.status === 200) {
        commit("editSuccess", response.data.data);
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async addUserProductRequirement({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(
        urls.CREATE_USER_PRODUCT_REQUIREMENT,
        data
      );
      if (response.status === 200) {
        commit("addSuccess", response.data.data);
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async addUserProduct({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(urls.CREATE_USER_PRODUCT, data);
      if (response.status === 200) {
        const res = await DataService.post(
          urls.CREATE_USER_PRODUCT_REQUIREMENT,
          { ...data, userProductId: response.data.data }
        );
        if (res.status === 200) {
          commit("addSuccess", res.data.data);
        }
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
