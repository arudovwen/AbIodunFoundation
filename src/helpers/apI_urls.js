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
  GET_ADDIOTIONAL_FIELDS: "/Product/GetDynamicFieldsByProductDetailId",
  // Transaction
  CREATE_TRANSACTION: "/Transaction/CreateTransaction",
  GET_TRANSACTION_BY_ID: "/Transaction/GetTransactionById",
  GET_ALL_TRANSACTIONS: "/Transaction/GetAllTransactions",
  UPDATE_TRANSACTION: "/Transaction/SetTransactionStatus",

  // UserManagement
  GET_USER_PROFILE: "/api/UserManagement/GetUserProfile",
  GET_USER_BY_ID: "/api/UserManagement/GetUserbyId",
  GET_USER_BY_NAME: "/api/UserManagement/GetUserbyName",
  GET_USER_BY_EMAIL: "/api/UserManagement/GetUserbyEmail",
  GET_ALL_USERS: "/api/UserManagement/GetAllUsers",
  SIGN_UP_USER: "/api/UserManagement/SignUp",
  GET_USER_AVATAR: "/api/UserManagement/GetUserAvatar",
  UPDATE_USER_PROFILE: "/api/UserManagement/UpdateUserProfile",

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
  UPDATE_USER_PRODUCT: "/UserProduct/UpdateUserProduct",
  DELETE_USER_PRODUCT: "/UserProduct/DeleteUserProduct",
  GET_USER_ADDITIONAL_FIELDS:
    "/UserProduct/GetDynamicFieldsByUserProductDetailId",
  GET_ADMIN_STATS: "stats/getadminstats",
  GET_CUSTOMER_STATS: "stats/getcustomerstats",

  // Regions

  CREATE_REGION: "/UserRegion/CreateRegion",
  UPDATE_REGION: "/UserRegion/UpdateRegion",
  GET_REGION_BY_ID: "/UserRegion/GetRegionById",
  GET_ALL_REGIONS: "/UserRegion/GetAllRegions",
  DELETE_REGION: "/UserRegion/Delete",

  ASSIGN_REQUEST: "/UserProduct/AssignRequestToRM",
  REQUEST_DOCUMENTS: "/UserProduct/RequestDocuments"
};
