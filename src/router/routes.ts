import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [{ path: '', component: () => import('pages/LandingPage.vue') }],
  },
  // Rotas internas — ciclos futuros
  // {
  //   path: '/app',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
