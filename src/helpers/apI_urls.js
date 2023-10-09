export const urls = {
  // Auth
  LOGIN: "/Auth/login",
  CHANGE_PASSWORD_INITIATE: "/Auth/ChangePasswordInitiate",
  CHANGE_PASSWORD_COMPLETE: "/Auth/ChangePasswordComplete",
  CHANGE_PASSWORD: "/Auth/ChangePasswordCompleteInside",
  VALIDATE_EMAIL_INITIATE: "/Auth/ValidateEmailInitiate",
  VALIDATE_EMAIL_COMPLETE: "/Auth/ValidateEmailComplete",

  // Admin
  CREATE_ADMIN: "/Admin/CreateAdmin",
  DISABLE_USER: "/Admin/DisableUser",
  ENABLE_USER: "/Admin/EnableUser",
  ADMIM_GET_ALL_USERS: "/Admin/GetAllUsers",
  ADMIM_GET_ALL_ROLES: "/Admin/GetUserRoles",

  //- Banner
  CREATE_BANNER: "/Banner/CreateBanner",
  GET_BANNER: "/Banner/GetBanner",
  GET_ALL_BANNERS: "/Banner/GetAllBanners",
  UPDATE_BANNER: "/Banner/UpdateBanner",
  CHANGE_BANNER_STATUS: "/Banner/ChangeBannerStatus",
  DELETE_BANNER: "/Banner/DeleteBanner",
  UPDATE_BANNER_STATUS: "/Banner/ChangeBannerStatus",

  // Files
  UPLOAD_FILE: "/Files/uploadfile",
  GET_FILE_BY_ID: "/Files/GetFileById",

  // Product
  CREATE_PRODUCT: "/Product/CreateProduct",
  CREATE_PRODUCT_DETAILS: "/Product/CreateProductDetails",
  UPDATE_PRODUCT: "/Product/UpdateProduct",
  UPDATE_PRODUCT_DETAILS: "/Product/UpdateProductDetails",
  GET_PRODUCT_BY_ID: "/Product/GetProductById",
  GET_ALL_PRODUCTS: "/Product/GetAllProducts",
  GET_PRODUCTS_WITH_DETAILS: "/Product/GetProductsWithDetails",
  DELETE_PRODUCT: "/Product/DeleteProduct",
  DELETE_PRODUCT_DETAIL: "/Product/DeleteProductDetail",

  // Transaction
  CREATE_TRANSACTION: "/Transaction/CreateTransaction",
  GET_TRANSACTION_BY_ID: "/Transaction/GetTransactionById",
  GET_ALL_TRANSACTIONS: "/Transaction/GetAllTransactions",
  UPDATE_TRANSACTION: "/Transaction/SetTransactionStatus",

  // UserManagement
  GET_USER_PROFILE: "/UserManagement/GetUserProfile",
  GET_USER_BY_ID: "/UserManagement/GetUserbyId",
  GET_USER_BY_NAME: "/UserManagement/GetUserbyName",
  GET_USER_BY_EMAIL: "/UserManagement/GetUserbyEmail",
  GET_ALL_USERS: "/UserManagement/GetAllUsers",
  SIGN_UP_USER: "/UserManagement/SignUpUser",
  GET_USER_AVATAR: "/UserManagement/GetUserAvatar",

  // UserProductRequirement
  CREATE_USER_PRODUCT_REQUIREMENT:
    "/UserProductRequirement/CreateUserProductRequirement",
  GET_USER_PRODUCT_REQUIREMENT_BY_ID:
    "/UserProductRequirement/GetUserProductRequirementById",
  GET_ALL_USER_PRODUCT_REQUIREMENT:
    "/UserProductRequirement/GetAllUserProductRequirement",
  UPDATE_USER_PRODUCT_REQUIREMENT:
    "/UserProductRequirement/UpdateUserProductRequirement",

  // UserProduct
  CREATE_USER_PRODUCT: "/UserProduct/CreateUserProduct",
  GET_USER_PRODUCT_BY_ID: "/UserProduct/GetUserProductById",
  GET_ALL_USER_PRODUCT: "/UserProduct/GetAllUserProduct",
  UPDATE_USER_PRODUCT: "/UserProduct/UpdateUserProductRequirement",
};
