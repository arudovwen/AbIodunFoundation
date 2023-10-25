export default {
  adminStatBegin(state) {
    state.adminstatloading = true;
    state.adminstatsuccess = false;
    state.adminstaterror = null;
    state.stat = null;
  },

  adminStatSuccess(state, data) {
    state.adminstatloading = false;
    state.adminstatsuccess = true;
    state.stats = data;
  },

  adminStatErr(state, err) {
    state.adminstatloading = false;
    state.adminstaterror = err;
    state.adminstatsuccess = false;
  },

  rolesSuccess(state, data) {
    state.roles = data;
  },
  profileBegin(state) {
    state.profileloading = true;
    state.profilesuccess = false;
    state.profileerror = null;
  },

  profileSuccess(state, data) {
    state.profileloading = false;
    state.profilesuccess = true;
    state.profile = data;
  },

  profileErr(state, err) {
    state.profileloading = false;
    state.error = err;
    state.profilesuccess = false;
  },
  avatarBegin(state) {
    state.avatarloading = true;
    state.avatarsuccess = false;
  },

  avatarSuccess(state, data) {
    state.avatarloading = false;
    state.avatarsuccess = true;
    state.avatar = data;
  },

  avatarErr(state, err) {
    state.avatarloading = false;
    state.error = err;
    state.avatarsuccess = false;
  },

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
    state.editloading = false;
    state.error = err;
    state.editsuccess = false;
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
  changeBegin(state) {
    state.changeloading = true;
    state.error = null;
    state.changesuccess = false;
  },
  changeSuccess(state) {
    state.changeloading = false;
    state.changesuccess = true;
  },
  changeErr(state, err) {
    state.changeloading = false;
    state.error = err;
    state.changesuccess = false;
  },
};
