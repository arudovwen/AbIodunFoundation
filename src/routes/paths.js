export const paths = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/view/pages/DashboardPage.vue"
      ),
  },


  {
    name: "transactions",
    path: "/transactions",
    component: () =>
      import(
        /* webpackChunkName: "transactions" */ "@/view/pages/TransactionsPage.vue"
      ),
  },
 
  {
    name: "airtime & data",
    path: "/airtime-and-data",
    component: () =>
      import(/* webpackChunkName: "airtime-and-data" */ "@/view/pages/AirtimeAndData.vue"),
  },
  {
    name: "apply for grant",
    path: "/apply-for-grant",
    component: () =>
      import(/* webpackChunkName: "apply-for-grant" */ "@/view/pages/ApplyGrant.vue"),
  },
  {
    name: "transfers",
    path: "/transfers",
    component: () =>
      import(/* webpackChunkName: "transfers" */ "@/view/pages/Transfers.vue"),
  },
  {
    name: "request-product",
    path: "/product-management/products/request-product",
    component: () =>
      import(/* webpackChunkName: "transfers" */ "@/view/pages/RequestProduct.vue"),
  },
  {
    path: "/page",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/view/pages/settings/Settings.vue"
      ),
    children: [
      {
        path: "profile-settings",
        name: "profile-settings",
        component: () =>
          import(
            /* webpackChunkName: "Profile" */ "@/view/pages/settings/overview/Profile.vue"
          ),
      },
      {
        path: "profile-settings/profile",
        name: "set-profile",
        component: () =>
          import(
            /* webpackChunkName: "Profile" */ "@/view/pages/settings/overview/Profile.vue"
          ),
      },
      {
        path: "profile-settings/account",
        name: "set-account",
        component: () =>
          import(
            /* webpackChunkName: "Account" */ "@/view/pages/settings/overview/Account.vue"
          ),
      },
      {
        path: "profile-settings/password",
        name: "set-password",
        component: () =>
          import(
            /* webpackChunkName: "Password" */ "@/view/pages/settings/overview/Password.vue"
          ),
      },
      {
        path: "profile-settings/social",
        name: "set-social",
        component: () =>
          import(
            /* webpackChunkName: "Social" */ "@/view/pages/settings/overview/SocialProfile.vue"
          ),
      },
      {
        path: "profile-settings/notification",
        name: "set-notification",
        component: () =>
          import(
            /* webpackChunkName: "Notification" */ "@/view/pages/settings/overview/Notification.vue"
          ),
      },
      {
        path: "profile-settings/banners",
        name: "set-banners",
        component: () =>
          import(
            /* webpackChunkName: "Banners" */ "@/view/pages/settings/overview/Banner.vue"
          ),
      },
    ],
  },

  {
    path: "/user-management",
    name: "user-management",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/view/pages/UserManagement.vue"
      ),
    children: [
      {
        name: "users",
        path: "users",
        component: () =>
          import(/* webpackChunkName: "users" */ "@/view/pages/UsersPage.vue"),
      },
      {
        name: "administrators",
        path: "administrators",
        component: () =>
          import(
            /* webpackChunkName: "admins" */ "@/view/pages/AdminsPage.vue"
          ),
      },
    ],
  },
  {
    path: "/product-management",
    name: "product-management",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/view/pages/ProductManagement.vue"
      ),
    children: [
      {
        name: "products",
        path: "products",
        component: () =>
        import(
          /* webpackChunkName: "products" */ "@/view/pages/ProductsPage.vue"
        ),
      },
      {
        name: "product",
        path: "/product/:id",
        component: () =>
          import(/* webpackChunkName: "product" */ "@/view/pages/ProductPage.vue"),
      },
      {
        name: "requests",
        path: "requests",
        component: () =>
          import(
            /* webpackChunkName: "admins" */ "@/view/pages/RequestPage.vue"
          ),
      },
    ],
  },
];
