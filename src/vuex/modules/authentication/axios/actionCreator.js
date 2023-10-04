import { Notification } from "ant-design-vue";
import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

function getRedirectFrom(url) {
  try {
    // Create a URL object from the input URL
    const parsedUrl = new URL(url);

    // Get the query parameters as a URLSearchParams object
    const queryParams = parsedUrl.searchParams;

    // Get the value of the 'redirect_from' parameter
    const redirectFrom = queryParams.get('redirect_from');

    return redirectFrom;
  } catch (error) {
    // Handle invalid URL or other errors
    console.error('Error parsing URL:', error);
    return null;
  }
}
const state = () => ({
  accessToken: localStorage.getItem("accessToken") || null,
  avatar: localStorage.getItem("avatar") || null,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  loading: false,
  success: false,
  loginsuccess: false,
  logoutsuccess: false,
  validatebeginsuccess: false,
  validateendsuccess: false,
  forgotsuccess: false,
  resetsuccess: false,
  error: null,
  token: "",
});

const actions = {
  async login({ commit }, data) {
    try {
      commit("loginBegin");
      const response = await DataService.post(urls.LOGIN, data);

      if (response.status === 200) {
        const accessToken = response.data.data.token;
        const userData = response.data.data.user;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userData", JSON.stringify(userData));
        commit("loginSuccess", accessToken);
        Notification.success({
          description: "Login successful",
        });
        // window.location.replace("/");
      }
    } catch (err) {
      commit("loginErr", err);
    }
  },
  async logOut({ commit }) {
    try {
      commit("logoutBegin");
      localStorage.clear();

      if (getRedirectFrom(window.location.search)) {
        window.location.href = getRedirectFrom(window.location.search);
      } else {
        window.location.href = "/auth/login";
      }
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
      commit("validateInitiateBegin");
      const response = await DataService.post(
        urls.VALIDATE_EMAIL_INITIATE,
        data
      );
      if (response.status === 200) {
        commit("validateInitiateSuccess", response.data.message);
      }
    } catch (err) {
      commit("validateInitiateErr", err);
    }
  },
  async validateEmailComplete({ commit }, data) {
    try {
      commit("validateEndBegin");
      const response = await DataService.post(
        urls.VALIDATE_EMAIL_COMPLETE,
        data
      );

      if (response.status === 200) {
        commit("validateEndSuccess");
      }
    } catch (err) {
      commit("validateEndErr", err);
    }
  },
  async forgotPassword({ commit }, data) {
    try {
      commit("forgotBegin");
      const response = await DataService.post(
        urls.CHANGE_PASSWORD_INITIATE,
        data
      );

      if (response.status === 200) {
        commit("forgotSuccess", response.data.message);
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
      }
    } catch (err) {
      commit("resetErr", err);
    }
  },
  async updateAvatar({ commit }, data) {
    try {
      commit("updateAvatar", data);
    } catch (err) {
      commit("avatarErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
