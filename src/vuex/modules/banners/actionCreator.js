import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  total: 0,
  banner: null,
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
  token: "",
});

const actions = {
  async addBanner({ commit }, { description, formData, status }) {
    try {
      commit("addBegin");
      const response = await DataService.post(
        `${urls.CREATE_BANNER}?description=${description}&status=${status}`,
        formData
      );

      if (response.status === 200) {
        commit("addSuccess");
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async editBanner({ commit }, { description, formData, status }) {
    try {
      commit("ediBegin");
      const response = await DataService.put(
        `${urls.UPDATE_BANNER}?description=${description}&status=${status}`,
        formData
      );

      if (response.status === 200) {
        commit("editSuccess");
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async getBanners({ commit }, { pageNumber, pageSize, status, description }) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_BANNERS}?pageNumber=${pageNumber}&pageSize=${pageSize}&description=${description}&status=${status}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
  async getBanner({ commit }, data) {
    try {
      commit("getBegin");
      const response = await DataService.get(`${urls.GET_BANNER}?data=${data}`);
      if (response.status === 200) {
        commit("getSuccess", response.data);
      }
    } catch (err) {
      commit("getErr", err);
    }
  },
  async updateBanner({ commit }, data) {
    try {
      commit("editBegin");
      const response = await DataService.put(`${urls.UPDATE_BANNER}`, data);
      if (response.status === 200) {
        commit("editSuccess", response.data);
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async deleteBanner({ commit }, data) {
    try {
      commit("deleteBegin");
      const response = await DataService.delete(
        `${urls.DELETE_BANNER}?id=${data}`
      );
      if (response.status === 200) {
        commit("deleteSuccess", response.data);
      }
    } catch (err) {
      commit("deletetErr", err);
    }
  },
  async statusBanner({ commit }, { id, status }) {
    try {
      commit("editBegin");
      const response = await DataService.put(
        `${urls.UPDATE_BANNER_STATUS}?id=${id}&status=${status}`
      );
      if (response.status === 200) {
        commit("editSuccess", response.data);
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
