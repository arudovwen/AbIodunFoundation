import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  total: 0,
  transaction: null,
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
  async getRequests({ commit }, { pageNumber, description, pageSize }) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_REQUESTS}?pageNumber=${pageNumber}&pageSize=${pageSize}&description=${description}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
  async getRequestById({ commit }, id) {
    try {
      commit("profileBegin");
      const response = await DataService.get(
        `${urls.GET_REQUEST_BY_ID}?RequestId=${id}`
      );
      if (response.status === 200) {
        commit("profileSuccess", response.data.data);
      }
    } catch (err) {
      commit("profileErr", err);
    }
  },

  async addRequest({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(urls.CREATE_REQUEST, data);
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
