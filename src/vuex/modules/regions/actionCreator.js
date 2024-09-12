import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  total: 0,
  region: null,
  addloading: false,
  addsuccess: false,
  getloading: false,
  getsuccess: false,
  regionsuccess: false,
  regionloading: false,
  editsuccess: false,
  editloading: false,
  deletesuccess: false,
  deleteloading: false,
  error: null,
  token: "",
});

const actions = {
  async addRegion({ commit }, payload) {
    try {
      commit("addBegin");
      const response = await DataService.post(`${urls.CREATE_REGION}`, payload);

      if (response.status === 200) {
        commit("addSuccess");
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async editRegion({ commit }, payload) {
    try {
      commit("editBegin");
      const response = await DataService.put(`${urls.UPDATE_REGION}`, payload);

      if (response.status === 200) {
        commit("editSuccess");
      }
    } catch (err) {
      commit("editErr", err);
    }
  },
  async getRegions({ commit }, payload) {
    try {
      commit("regionBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_REGIONS}?${new URLSearchParams(payload)}`
      );
      if (response.status === 200) {
        commit("regionSuccess", response.data);
      }
    } catch (err) {
      commit("regionErr", err);
    }
  },
  async getRegion({ commit }, data) {
    try {
      commit("getBegin");
      const response = await DataService.get(
        `${urls.GET_REGION_BY_ID}?id=${data}`
      );
      if (response.status === 200) {
        commit("getSuccess", response.data);
      }
    } catch (err) {
      commit("getErr", err);
    }
  },
  async updateRegion({ commit }, data) {
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
  async deleteRegion({ commit }, data) {
    try {
      commit("deleteBegin");
      const response = await DataService.delete(
        `${urls.DELETE_REGION}?id=${data}`
      );
      if (response.status === 200) {
        commit("deleteSuccess", response.data);
      }
    } catch (err) {
      commit("deletetErr", err);
    }
  },
  async statusRegion({ commit }, { id, status }) {
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
