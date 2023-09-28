import { createWebHistory, createRouter } from "vue-router";
import adminRoutes from "./AdminRoutes";
import authRoutes from "./authRoutes";
import store from "@/vuex/store";

const routes = [
  {
    name: "Admin",
    path: "/",
    component: () =>
      import(/* webpackChunkName: "admin" */ "@/layout/withAdminLayout.vue"),
    children: [...adminRoutes],
    meta: { auth: false },
  },
  {
    name: "Auth",
    path: "/auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/layout/withAuthLayout.vue"),
    children: [...authRoutes],
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0); // reset scroll position to top of page

  if (to.meta.auth && store.state.auth.accessToken) {
    next({ to: "/" });
  } else if (!to.meta.auth && !store.state.auth.accessToken) {
    next({ name: "login" });
  } else {
    if (to.meta.admin) {
      if (store.state.auth.userData.userRole === "admin") {
        next();
      } else {
        next({ to: "/" });
      }
    } else {
      next();
    }
  }
});

export default router;
