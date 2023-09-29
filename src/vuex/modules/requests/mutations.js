export default {
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
  getBegin(state) {
    state.getloading = true;
    state.error = null;
    state.getsuccess = false;
  },
  getSuccess(state, data) {
    state.getloading = false;
    state.getsuccess = true;
    state.request = data;
  },
  getErr(state, err) {
    state.getloading = false;
    state.error = err;
    state.getsuccess = false;
  },
  fetchBegin(state) {
    state.fetchloading = true;
    state.error = null;
    state.fetchsuccess = false;
  },
  fetchSuccess(state, { data, totalCount }) {
    state.fetchloading = false;
    state.fetchsuccess = true;
    state.data = data;
    state.total = totalCount;
  },
  fetchErr(state, err) {
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
