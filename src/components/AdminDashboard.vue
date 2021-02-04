<template>
  <h1>Admin Dashboard</h1>

  <div class="admin-ability-list gap-2">
    <div class="admin-ability">
      <CreateTask></CreateTask>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CreateTask from './tasks/CreateTask.vue';

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    CreateTask,
  },
});
</script>

<style scoped>

</style>
