export default {
  updateStatusBegin(state) {
    state.updatestatusloading = true;
    state.error = null;
    state.updatestatussuccess = false;
  },
  updateStatusSuccess(state) {
    state.updatestatusloading = false;
    state.updatestatussuccess = true;
  },
  updateStatusErr(state, err) {
    state.updatestatusloading = false;
    state.error = err;
    state.updatestatussuccess = false;
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
  getBegin(state) {
    state.getloading = true;
    state.error = null;
    state.getsuccess = false;
  },
  getSuccess(state, { data }) {

    state.getloading = false;
    state.getsuccess = true;
    state.region = data;
  },
  getErr(state, err) {
    state.getloading = false;
    state.error = err;
    state.getsuccess = false;
  },
  regionBegin(state) {
    state.regionloading = true;
    state.error = null;
    state.regionsuccess = false;
    state.data = [];
  },
  regionSuccess(state, { data, totalCount }) {
    state.regionloading = false;
    state.regionsuccess = true;
    state.data = data;
    state.total = totalCount;
  },
  regionErr(state, err) {
    state.regionloading = false;
    state.error = err;
    state.regionsuccess = false;
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
