import { DataService } from "@/config/dataService/dataService";
import mutations from "./mutations";
import { urls } from "@/helpers/apI_urls";

const state = () => ({
  data: [],
  allData: [],
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
  updateloading: false,
  updatesuccess: false,
  error: null,
});

const actions = {
  async getTransactions({ commit }, { pageNumber, description, pageSize, userId }) {
    try {
      commit("fetchTrxBegin");
      const response = await DataService.get(
        `${urls.GET_ALL_TRANSACTIONS}?pageNumber=${pageNumber}&pageSize=${pageSize}&description=${description}&userId=${userId}`
      );
     
      if (response.status === 200) {
        commit("fetchTrxSuccess", response.data);
      
      }
    } catch (err) {
      commit("fetchTrxErr", err);
    }
  },
  async getAllTransactions({ commit }, { pageNumber, description, pageSize, userId }) {
   
      const response = await DataService.get(
        `${urls.GET_ALL_TRANSACTIONS}?pageNumber=${pageNumber}&pageSize=${pageSize}&description=${description}&userId=${userId}`
      );
     
      if (response.status === 200) {
        commit("fetchAllSuccess", response.data);
      
      }
  
  },
  async getTransactionById({ commit }, id) {
    try {
      commit("transactionBegin");
      const response = await DataService.get(
        `${urls.GET_TRANSACTION_BY_ID}?id=${id}`
      );
   
      if (response.status === 200) {
        commit("transactionSuccess", response.data.data);
      }
    } catch (err) {
      commit("transactionErr", err);
    }
  },

  async addTransaction({ commit }, data) {
    try {
      commit("addBegin");
      const response = await DataService.post(urls.CREATE_TRANSACTION, data);
      if (response.status === 200) {
        commit("addSuccess", response.data.data);
      }
    } catch (err) {
      commit("addErr", err);
    }
  },
  async updateTransaction({ commit }, data) {
    try {
      commit("updateBegin");
      const response = await DataService.put(urls.UPDATE_TRANSACTION, data);
      if (response.status === 200) {
        commit("updateSuccess", response.data.data);
      }
    } catch (err) {
      commit("updateErr", err);
    }
  },
  
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
