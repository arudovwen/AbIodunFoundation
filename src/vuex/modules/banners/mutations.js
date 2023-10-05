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
  getSuccess(state) {
    state.getloading = false;
    state.getsuccess = true;
  },
  getErr(state, err) {
    state.getloading = false;
    state.error = err;
    state.getsuccess = false;
  },
  bannerBegin(state) {
    state.bannerloading = true;
    state.error = null;
    state.bannersuccess = false;
  },
  bannerSuccess(state, { data, totalCount }) {
    state.bannerloading = false;
    state.bannersuccess = true;
    state.data = data;
    state.total = totalCount;
  },
  bannerErr(state, err) {
    state.bannerloading = false;
    state.error = err;
    state.bannersuccess = false;
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
