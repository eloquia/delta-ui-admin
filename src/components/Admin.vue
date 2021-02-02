<template>
  <h1>Admin</h1>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import store from '../store';
import { dispatchCheckLoggedIn } from '../store/main/actions';
import { readIsLoggedIn } from '../store/main/getters';

import AdminDashboard from './AdminDashboard.vue';
import Login from './Login.vue';

const startRouteGuard = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  await dispatchCheckLoggedIn(store);
  if (readIsLoggedIn(store)) {
    if (to.path === '/login' || to.path === '/') {
      next('/main');
    } else {
      next();
    }
  } else if (readIsLoggedIn(store) === false) {
    if (to.path === '/' || (to.path as string).startsWith('/admin')) {
      next('/login');
    } else {
      next();
    }
  }
};

export default defineComponent({
  name: 'Admin',
  components: {
    AdminDashboard,
    Login,
  },
  beforeRouteEnter(to, from, next) {
    const mainState = store.state.main;
    if (!mainState.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    startRouteGuard(to, from, next);
  },
  beforeRouteUpdate(to, from, next) {
    startRouteGuard(to, from, next);
  },
});
</script>
