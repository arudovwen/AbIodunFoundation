import axios from "axios";
import { Notification } from "ant-design-vue";
import { getItem } from "../../utility/localStorageControl";

const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT;

const authHeader = () => ({
  Authorization: `Bearer ${getItem("accessToken")}`,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getItem("accessToken")}`,
    "Content-Type": "application/json",
  },
});

class DataService {
  static get(path = "") {
    return client({
      method: "GET",
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static delete(path = "", data = {}) {
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = "", data = {}) {
    return client({
      method: "PUT",
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }
}

// axios interceptors
client.interceptors.request.use((config) => {
  // Modify the request before execution
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = {
    ...headers,
    Authorization: `Bearer ${getItem("accessToken")}`,
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (response) {
      if (response.status === 500) {
        Notification.error({
          message: "Error",
          description: response.data.message,
          duration: 5000,
        });
      } else if (response.status === 401) {
        Notification.error({
          message: "Error",
          description: "Token expired",
        });

        localStorage.clear();
        window.location.href = `/auth/login?redirect_from=${window.location.href}`;
      } else if (response.status > 399 && response.status < 500) {
        Notification.error({
          message: "Error",
          description: response.data.message,
         
          duration: 5000,
        });
      
        if (
          response.data.message.includes("Your profile has not been activated")
        ) {
        
          const email = JSON.parse(originalRequest.data).username;
          console.log("🚀 ~ file: dataService.js:111 ~ email:", email)
          window.location.href = `/auth/validate-email/${encodeURIComponent(
            email
          )}`;
        }
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  }
);

export { DataService };
