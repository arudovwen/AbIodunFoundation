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
    path: 'forgot-password',
    name: 'forgotPassword',
    component: () => import(/* webpackChunkName: "forgotPassword" */ '@/view/authentication/ForgotPassword.vue'),
  },{
    path: 'reset-password',
    name: 'resetPassword',
    component: () => import(/* webpackChunkName: "resetPassword" */ '@/view/authentication/ResetPassword.vue'),
  },{
    path: 'validate-email/:email',
    name: 'validateEmail',
    component: () => import(/* webpackChunkName: "validateEmail" */ '@/view/authentication/ValidateEmail.vue'),
  },
];

export default routes;
