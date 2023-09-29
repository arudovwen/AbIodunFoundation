import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  total: 0,
  request: null,
  loading: false,
  success: false,
  addloading: false,
  addsuccess: false,
  getloading: false,
  getsuccess: false,
  fetchsuccess: false,
  fetchloading: false,
  editsuccess: false,
  editloading: false,
  deletesuccess: false,
  deleteloading: false,
  error: null,
});

const actions = {
  async getRequests({ commit }, { pageNumber, name, pageSize }) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_USER_PRODUCT_REQUIREMENT}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
  async getRequestById({ commit }, id) {
    try {
      commit("getBegin");
      const response = await DataService.get(
        `${urls.GET_USER_PRODUCT_REQUIREMENT_BY_ID}?id=${id}`
      );
      if (response.status === 200) {
        commit("getSuccess", response.data.data);
      }
    } catch (err) {
      commit("getErr", err);
    }
  },
  async updateRequestBy({ commit }) {
    try {
      commit("editBegin");
      const response = await DataService.get(
        `${urls.UPDATE_USER_PRODUCT_REQUIREMENT}`
      );
      if (response.status === 200) {
        commit("editSuccess", response.data.data);
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async addRequest({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(urls.CREATE_USER_PRODUCT_REQUIREMENT, data);
      if (response.status === 200) {
        commit("addSuccess", response.data.data);
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
