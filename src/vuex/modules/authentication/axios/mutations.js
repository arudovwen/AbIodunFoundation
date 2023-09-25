export default {
  loginBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  loginSuccess(state, data) {
    state.loading = false;
    state.success = true;
    state.login = data;
    state.accessToken = data; // Assuming 'accessToken' is a property in 'data'
  },
  loginErr(state, err) {
    state.loading = false;
    state.error = err;
    state.accessToken = null;
  },
  logoutBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  logoutSuccess(state) {
    state.loading = false;
    state.login = false;
    state.accessToken = null;
    state.success = true;
  },
  logoutErr(state, err) {
    state.loading = false;
    state.error = err;
  },
  signupBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  signupSuccess(state) {
    state.loading = false;
    state.success = true;
  },
  signupErr(state, err) {
    state.loading = false;
    state.error = err;
  },

  validateBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
    state.token = "";
  },
  validateSuccess(state, data) {
    state.loading = false;
    state.success = true;
    state.token = data;
  },
  validateErr(state, err) {
    state.loading = false;
    state.error = err;
  },
  forgotBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  forgotSuccess(state) {
    state.loading = false;
    state.success = true;
  },
  forgotErr(state, err) {
    state.loading = false;
    state.error = err;
  },
  resetBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  resetSuccess(state) {
    state.loading = false;
    state.success = true;
  },
  resetErr(state, err) {
    state.loading = false;
    state.error = err;
  },
};
