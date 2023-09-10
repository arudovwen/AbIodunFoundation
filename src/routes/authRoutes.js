const routes = [
  {
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/view/authentication/SignIn.vue'),
  },
  {
    path: 'register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/view/authentication/Signup.vue'),
  },
  {
    path: 'forgotPassword',
    name: 'forgotPassword',
    component: () => import(/* webpackChunkName: "forgotPassword" */ '@/view/authentication/ForgotPassword.vue'),
  },{
    path: 'resetPassword',
    name: 'resetPassword',
    component: () => import(/* webpackChunkName: "resetPassword" */ '@/view/authentication/ResetPassword.vue'),
  },
];

export default routes;
