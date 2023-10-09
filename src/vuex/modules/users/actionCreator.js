import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  roles:[],
  total: 0,
  avatar: null,
  user: null,
  profile: null,
  loading: false,
  addloading: false,
  deleteloading: false,
  changeloading: false,
  avatarloading: false,
  profileloading: false,
  success: false,
  addsuccess: false,
  deletesuccess: false,
  changesuccess: false,
  avatarsuccess: false,
  profilesuccess: false,
  error: null,
});

const actions = {
  async getRoles({ commit }) {
   
     
      const response = await DataService.get(
        `${urls.ADMIM_GET_ALL_ROLES}`
      );
      if (response.status === 200) {
        commit("rolesSuccess", response.data);
      }
     
  },
  async getUsers({ commit }, { pageNumber, pageSize, name, email, mobileNo }) {
    try {
      commit("fetchBegin");
      const response = await DataService.get(
        `${urls.ADMIM_GET_ALL_USERS}?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&email=${email}&mobileNo=${mobileNo}`
      );
      if (response.status === 200) {
        commit("fetchSuccess", response.data);
      }
    } catch (err) {
      commit("fetchErr", err);
    }
  },
  async getUserById({ commit }, id) {
    try {
      commit("profileBegin");
      const response = await DataService.get(
        `${urls.GET_USER_BY_ID}?UserId=${id}`
      );
      if (response.status === 200) {
        commit("profileSuccess", response.data.data);
      }
    } catch (err) {
      commit("profileErr", err);
    }
  },
  async getUserByEmail({ commit }, email) {
    try {
      commit("profileBegin");
      const response = await DataService.get(
        `${urls.GET_USER_BY_EMAIL}?UserEmail=${email}`
      );
      if (response.status === 200) {
        commit("profileSuccess", response.data.data);
      }
    } catch (err) {
      commit("profileErr", err);
    }
  },
  async getUserProfile({ commit }, email) {
    try {
      commit("profileBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_USERS}?UserEmail=${email}`
      );
      if (response.status === 200) {
        commit("profileSuccess", response.data.data);
      }
    } catch (err) {
      commit("profileErr", err);
    }
  },
  async getUserAvatar({ commit }, UserId) {
    try {
      commit("avatarBegin");
      const response = await DataService.get(
        `${urls.GET_USER_AVATAR}?UserId=${UserId}`
      );
      if (response.status === 200) {
        commit("avatarSuccess", response.data.data);
      }
    } catch (err) {
      commit("avatarErr", err);
    }
  },
 
  async getUserByUsername({ commit }, Username) {
    try {
      commit("profileBegin");
      const response = await DataService.get(
        `${urls.GET_USER_BY_NAME}?Username=${Username}`
      );
      if (response.status === 200) {
        commit("profileSuccess", response.data.data);
      }
    } catch (err) {
      commit("profileErr", err);
    }
  },

  async addUser({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(urls.CREATE_ADMIN, data);
      if (response.status === 200) {
        commit("addSuccess");
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async disableUser({ commit }, data) {
    try {
      commit("deleteBegin");
      const response = await DataService.delete(
        `${urls.DISABLE_USER}?UserId=${data}`
      );
      if (response.status === 200) {
        commit("deleteSuccess");
      }
    } catch (err) {
      commit("deleteErr", err);
    }
  },
  async enableUser({ commit }, data) {
    try {
      commit("deleteBegin");
      const response = await DataService.put(
        `${urls.ENABLE_USER}?UserId=${data}`
      );
      if (response.status === 200) {
        commit("deleteSuccess");
      }
    } catch (err) {
      commit("deleteErr", err);
    }
  },
  async changePassword({ commit }, data) {
    try {
      commit("changeBegin");
      const response = await DataService.post(urls.CHANGE_PASSWORD, data);

      if (response.status === 200) {
        commit("changeSuccess");
      }
    } catch (err) {
      commit("changeErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
