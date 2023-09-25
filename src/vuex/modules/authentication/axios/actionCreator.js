import { Notification } from "ant-design-vue";
import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";
import { useRouter } from "vue-router";

const router = useRouter();
const state = () => ({
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  success: false,
  error: null,
  token: "",
});

const actions = {
  async login({ commit }, data) {
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
  async logOut({ commit }) {
    try {
      commit("logoutBegin");
      localStorage.removeItem("accessToken");
      commit("logoutSuccess", null);
    } catch (err) {
      console.error("Logout Error:", err);
      commit("logoutErr", err.response.data.message);
    }
  },
  async signup({ commit }, data) {
    try {
      commit("signupBegin");
      const response = await DataService.post(urls.SIGN_UP_USER, data);

      if (response.status === 200) {
        commit("signupSuccess");
      }
    } catch (err) {
      commit("signupErr", err);
    }
  },
  async validateEmailInitiate({ commit }, data) {
    try {
      commit("validateBegin");
      const response = await DataService.post(
        urls.VALIDATE_EMAIL_INITIATE,
        data
      );
      if (response.status === 200) {
        commit("validateSuccess", response.data.data);
      }
    } catch (err) {
      commit("validateErr", err);
    }
  },
  async validateEmailComplete({ commit }, data) {
    try {
      commit("validateBegin");
      const response = await DataService.post(
        urls.VALIDATE_EMAIL_COMPLETE,
        data
      );

      if (response.status === 200) {
        commit("validateSuccess");
      }
    } catch (err) {
      commit("validateErr", err);
    }
  },
  async forgotPassword({ commit }, data) {
    try {
      commit("forgotBegin");
      const response = await DataService.post(
        `${urls.CHANGE_PASSWORD_INITIATE}?EmailAddress=${data.EmailAddress}`,
        {}
      );

      if (response.status === 200) {
        commit("forgotSuccess");

        router.push("/auth/reset-password");
      }
    } catch (err) {
      commit("forgotErr", err);
    }
  },
  async resetPassword({ commit }, data) {
    try {
      commit("resetBegin");
      const response = await DataService.post(
        urls.CHANGE_PASSWORD_COMPLETE,
        data
      );

      if (response.status === 200) {
        commit("resetSuccess");

        router.push("/auth/login");
      }
    } catch (err) {
      commit("resetErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
