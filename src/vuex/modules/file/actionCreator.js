import mutations from "./mutations";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  loading: false,
  success: false,
  error: null,
});

const actions = {
  async uploadFile({ commit }, data) {
    try {
      commit("uploadBegin");
      const response = await DataService.post(
        `${urls.UPLOAD_FILE}?UserId=${data.userId}&FileType=${data.fileType}`,
        data.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type
          },
        }
      );
      if (response.status === 200) {
        const fileUrl = response.data.data;
        commit("uploadSuccess", fileUrl);
      }
    } catch (err) {
      commit("uploadErr", err);
    }
  },
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
