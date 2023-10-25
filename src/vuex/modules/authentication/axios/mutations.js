export default {
  updateAvatar(state, data) {
    state.avatar = data;
  },
  loginBegin(state) {
    state.loading = true;
    state.error = null;
    state.loginsuccess = false;
  },
  loginSuccess(state, data) {
    state.loading = false;
    state.loginsuccess = true;
    state.login = data;
    state.accessToken = data;
  },
  loginErr(state, err) {
    state.loading = false;
    state.error = err;
    state.accessToken = null;
    state.loginsuccess = false;
  },
  logoutBegin(state) {
    state.loading = true;
    state.error = null;
    state.logoutsuccess = false;
  },
  logoutSuccess(state) {
    state.loading = false;
    state.login = false;
    state.accessToken = null;
    state.logoutsuccess = true;
  },
  logoutErr(state, err) {
    state.loading = false;
    state.error = err;
    state.logoutsuccess = false;
  },
  signupBegin(state) {
    state.loading = true;
    state.error = null;
    state.signupsuccess = false;
  },
  signupSuccess(state) {
    state.loading = false;
    state.signupsuccess = true;
  },
  signupErr(state, err) {
    state.loading = false;
    state.error = err;
    state.signupsuccess = false;
  },

  validateInitiateBegin(state) {
    state.validatebeginloading = true;
    state.error = null;
    state.validatebeginsuccess = false;
  },
  validateInitiateSuccess(state, data) {
    state.validatebeginloading = false;
    state.validatebeginsuccess = true;
    state.token = data;
  },
  validateInitiateErr(state, err) {
    state.validatebeginloading = false;
    state.error = err;
    state.validatebeginsuccess = false;
  },

  validateEndBegin(state) {
    state.validateendloading = true;
    state.error = null;
    state.validateendsuccess = false;
  },
  validateEndSuccess(state, data) {
    state.validateendloading = false;
    state.validateendsuccess = true;
    state.token = data;
  },
  validateEndErr(state, err) {
    state.validateendloading = false;
    state.error = err;
    state.validateendsuccess = false;
  },

  forgotBegin(state) {
    state.loading = true;
    state.error = null;
    state.forgotsuccess = false;
  },
  forgotSuccess(state, data) {
    state.loading = false;
    state.forgotsuccess = true;
    state.token = data;
  },
  forgotErr(state, err) {
    state.loading = false;
    state.error = err;
    state.forgotsuccess = false;
  },
  resetBegin(state) {
    state.loading = true;
    state.error = null;
    state.resetsuccess = false;
  },
  resetSuccess(state) {
    state.loading = false;
    state.resetsuccess = true;
  },
  resetErr(state, err) {
    state.loading = false;
    state.error = err;
    state.resetsuccess = false;
  },
};
