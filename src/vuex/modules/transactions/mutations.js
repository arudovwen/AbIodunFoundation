export default {
  updateBegin(state) {
    state.updateloading = true;
    state.error = null;
    state.updatesuccess = false;
  },
  updateSuccess(state) {
    state.updateloading = false;
    state.updatesuccess = true;
  },
  updateErr(state, err) {
    state.updateloading = false;
    state.error = err;
    state.updatesuccess = false;
  },
  addBegin(state) {
    state.addloading = true;
    state.error = null;
    state.addsuccess = false;
  },
  addSuccess(state) {
    state.addloading = false;
    state.addsuccess = true;
  },
  addErr(state, err) {
    state.addloading = false;
    state.error = err;
    state.addsuccess = false;
  },
  transactionBegin(state) {
    state.getloading = true;
    state.error = null;
    state.getsuccess = false;
  },
  transactionSuccess(state, data) {
   
    state.getloading = false;
    state.getsuccess = true;
    state.transaction = data
  },
  transactionErr(state, err) {
    state.getloading = false;
    state.error = err;
    state.getsuccess = false;
  },
  fetchTrxBegin(state) {
    state.fetchloading = true;
    state.error = null;
    state.fetchsuccess = false;
    state.data = [];
  },
  fetchTrxSuccess(state, { data, totalCount }) {
    state.fetchloading = false;
    state.fetchsuccess = true;
    state.data = data;
    state.total = totalCount;
  },
  fetchTrxErr(state, err) {
    state.fetchloading = false;
    state.error = err;
    state.fetchsuccess = false;
  },
  deleteBegin(state) {
    state.deleteloading = true;
    state.error = null;
    state.deletesuccess = false;
  },
  deleteSuccess(state) {
    state.deleteloading = false;
    state.deletesuccess = true;
  },
  deleteErr(state, err) {
    state.deleteloading = false;
    state.error = err;
    state.deleteuccess = false;
  },
  editBegin(state) {
    state.editloading = true;
    state.error = null;
    state.editsuccess = false;
  },
  editSuccess(state) {
    state.editloading = false;
    state.editsuccess = true;
  },
  editErr(state, err) {
    state.editloading = false;
    state.error = err;
    state.editsuccess = false;
  },
};
