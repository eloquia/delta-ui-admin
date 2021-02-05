import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('./components/Welcome.vue'),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/dashboard',
		component: () => import('./components/AdminDashboard.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/logout',
		component: () => import('./components/Logout.vue'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/not-found',
		component: () => import('./pages/NotFound.vue'),
		meta: {
			requiresAuth: false,
		},
	},
];

// 3. Create the router instance and pass the `routes` option
const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
});

/*
  Check to see if the user is able to get to the next route
*/
import store from './store';
router.beforeEach((to, from, next) => {
	if (!store.state.main.isLoggedIn && !to.meta.requiresAuth) {
		next();
	} else if (!store.state.main.isLoggedIn && to.meta.requiresAuth) {
		next('/');
	} else {
		next();
	}
});

export default router;
