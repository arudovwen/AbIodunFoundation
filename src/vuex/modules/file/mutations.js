export default {
  uploadBegin(state) {
    state.loading = true;
    state.success = false;
  },

  uploadSuccess(state, data) {
    state.loading = false;
    state.data = data;
    state.success = true;
  },

  uploadErr(state, err) {
    state.loading = false;
    state.error = err;
    state.success = false;
  },
};
