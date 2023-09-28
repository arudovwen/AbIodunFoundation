import { Notification } from "ant-design-vue";
import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";


const state = () => ({
  data: [],
  loading: false,
  success: false,
  error: null,
  token: "",
});

const actions = {
  async addUserProduct({ commit }, data) {
    try {
      commit("loginBegin");
      const response = await DataService.post(urls.LOGIN, data);

      if (response.status === 200) {
        const accessToken = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        commit("loginSuccess", accessToken);
        Notification.success({
          description: "Login successful",
        });
        window.location.replace("/");
      }
    } catch (err) {
      commit("loginErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
