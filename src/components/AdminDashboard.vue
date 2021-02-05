<template>
  <toolbar-title-layout v-bind:title="'Admin Dashboard'">
    <div class="admin-ability-list gap-2">
      <div class="admin-ability">
        <view-tasks></view-tasks>
      </div>
    </div>
  </toolbar-title-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ToolbarTitleLayout from './layouts/ToolbarTitleLayout.vue';

import ViewTasks from './tasks/ViewTasks.vue';

export default defineComponent({
  name: 'AdminDashboard',
  components: {
    // CreateTask,
    ViewTasks,
    ToolbarTitleLayout,
  },
});
</script>

<style scoped>

</style>
