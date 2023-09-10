import PageRoutes from './PageRoutes';

const routes = [
  {
    path: '',
    name: 'dashboard-page',
    component: () => import(/* webpackChunkName: "Dashboard" */ '@/view/pages/DashboardPage.vue'),
  },
  ...PageRoutes,
];

export default routes;
