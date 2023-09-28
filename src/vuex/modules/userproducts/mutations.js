export default {
  fetchSuccess(state, data) {
    state.loading = false;
    state.success = true;
    state.data = data;
  },
  fetchErr(state, err) {
    state.loading = false;
    state.error = err;
    state.success = false;
  },
  deleteBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  deleteSuccess(state, data) {
    state.loading = false;
    state.success = true;
    state.data = data;
  },
  deleteErr(state, err) {
    state.loading = false;
    state.error = err;
    state.success = false;
  },
  editBegin(state) {
    state.loading = true;
    state.error = null;
    state.success = false;
  },
  editSuccess(state, data) {
    state.loading = false;
    state.success = true;
    state.data = data;
  },
  editErr(state, err) {
    state.loading = false;
    state.error = err;
    state.success = false;
  },
};
