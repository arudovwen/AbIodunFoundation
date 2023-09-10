import { createStore } from 'vuex';
import themeLayout from './modules/themeLayout/actionCreator';
import auth from './modules/authentication/axios/actionCreator';
import headerSearchData from './modules/headerSearch/actionCreator';

export default createStore({
  modules: {
    themeLayout,
    auth,
    headerSearchData
  },
});
