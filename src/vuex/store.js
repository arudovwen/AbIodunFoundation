import { createStore } from "vuex";
import themeLayout from "./modules/themeLayout/actionCreator";
import auth from "./modules/authentication/axios/actionCreator";
import users from "./modules/users/actionCreator";
import file from "./modules/file/actionCreator";
import transactions from "./modules/transactions/actionCreator";
import banners from "./modules/banners/actionCreator";
import products from "./modules/products/actionCreator";
import requests from "./modules/requests/actionCreator";
import headerSearchData from "./modules/headerSearch/actionCreator";

export default createStore({
  modules: {
    themeLayout,
    auth,
    headerSearchData,
    users,
    file,
    transactions,
    products,
    banners,
    requests
  },
});
