<template>
  <toolbar-title-layout v-bind:title="'Admin Dashboard'">
    <div class="admin-ability-list gap-2">
      <div class="admin-ability">
        <CreateTask></CreateTask>
      </div>
    </div>
  </toolbar-title-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToolbarTitleLayout from './layouts/ToolbarTitleLayout.vue';

import CreateTask from './tasks/CreateTask.vue';

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    CreateTask,
    ToolbarTitleLayout,
  },
});
</script>

<style scoped>

</style>
