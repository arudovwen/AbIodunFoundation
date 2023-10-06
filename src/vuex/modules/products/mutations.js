export default {
  fetchBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
    state.data = [];
  },
  fetchSuccess(state, { data, totalCount }) {
    state.loading = false;
    state.success = true;
    state.data = data;
    state.total = totalCount;
  },
  fetchErr(state, err) {
    state.loading = false;
    state.error = err;
    state.success = false;
  },
  getBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  getSuccess(state, { data }) {
    state.loading = false;
    state.success = true;
    state.product = data;
   
  },
  getErr(state, err) {
    state.loading = false;
    state.error = err;
    state.success = false;
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
    state.deletesuccess = false;
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
    state.loading = false;
    state.error = err;
    state.success = false;
  },
};
