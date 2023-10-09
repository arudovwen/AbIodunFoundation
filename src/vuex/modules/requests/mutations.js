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
  getReqBegin(state) {
    state.getreqloading = true;
    state.error = null;
    state.getreqsuccess = false;
  },
  getReqSuccess(state, data) {
    state.getreqloading = false;
    state.getreqsuccess = true;
    state.requestReq = data;
  },
  getReqErr(state, err) {
    state.getreqloading = false;
    state.error = err;
    state.getreqsuccess = false;
  },
  fetchBegin(state) {
    state.fetchloading = true;
    state.error = null;
    state.fetchsuccess = false;
    state.data = [];
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
  fetchReqBegin(state) {
    state.fetchreqloading = true;
    state.error = null;
    state.fetchreqsuccess = false;
    state.reqData = [];
  },
  fetchReqSuccess(state, { data, totalCount }) {
    state.fetchreqloading = false;
    state.fetchreqsuccess = true;
    state.reqData = data;
    state.total = totalCount;
  },
  fetchReqErr(state, err) {
    state.fetchreqloading = false;
    state.error = err;
    state.fetchreqsuccess = false;
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
