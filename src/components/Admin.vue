<template>
  <h1>Admin</h1>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AdminDashboard from './AdminDashboard.vue';
import Login from './Login.vue';

export default defineComponent({
  name: 'Admin',
  components: {
    AdminDashboard,
    Login,
  },
});
</script>
