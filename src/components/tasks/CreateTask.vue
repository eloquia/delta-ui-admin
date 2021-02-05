<!--
  TODOs:
  * Add validation for task length
  * Connect with Project & Technologies
-->

<template>
  <div class="create-task">
    <label>Description</label>
    <textarea v-model="taskDescription" placeholder="Today I did..."></textarea>

    <button @click.prevent="submitTask">Create</button>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from 'axios';
import { defineComponent, ref } from 'vue';

import store from '../../store';
import { readToken } from '../../store/main/getters';
import tasks from '../../api/tasks';
import { ITaskData } from '@/interfaces/tasks';

export default defineComponent({
  name: 'CreateTask',
  setup () {
    const taskDescription = ref('');

    const submitTask = async () => {
      const token = readToken(store);
      const taskData: ITaskData = {
        description: taskDescription.value,
      };
      const response: AxiosResponse<number> = await tasks.createTask(taskData, token);

      // if create is successful, clear state
      // TODO: show confirmation message
      if (response.status < 300 && response.status >= 200) {
        taskDescription.value = '';
      } else {
        // TODO: show error message
        console.warn('error', response);
      }
    }

    return {
      taskDescription,
      submitTask,
    };
  },
});
</script>

<style scoped>

</style>
