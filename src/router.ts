import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./components/Welcome.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('./components/AdminDashboard.vue'),
      },
      {
        path: 'login',
        component: () => import('./components/Login.vue'),
      },
      {
        path: 'logout',
        component: () => import('./components/Logout.vue'),
      },
    ],
  },
  {
    path: '/not-found',
    component: () => import('./pages/NotFound.vue'),
  },
];

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
