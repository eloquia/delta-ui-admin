<template>
  <create-task></create-task>

  <h1>View Tasks</h1>
  <button @click.prevent="fetchTasks">Refresh</button>
  <div v-if="isFetchingData">
    <p>Fetching Data</p>
  </div>
  <div v-else-if="!isFetchingData && !taskList.length">
    <p>No tasks found</p>
  </div>
  <div v-else-if="taskList.length">
    <task-item v-for="taskItem in taskList" :key="taskItem.id" :description="taskItem.description"></task-item>
  </div>
  <div v-else>
    <p>Unknown state?</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue';

import CreateTask from './CreateTask.vue';
import TaskItem from './TaskItem.vue';
import store from '../../store';
import { readToken } from '../../store/main/getters';
import tasks from '../../api/tasks';
import { ITaskData } from '@/interfaces/tasks';

export default defineComponent({
  name: 'ViewTasks',
  components: {
    TaskItem,
    CreateTask,
  },
  setup () {
    const taskList: Ref<ITaskData[]> = reactive(ref([]));
    const isFetchingData: Ref<boolean> = ref(false);
    const token = readToken(store);
    const error: Ref<string> = ref('');

    const fetchTasks = async () => {
      isFetchingData.value = true;
      const response = await tasks.getTasks(token);

      if (response.status < 300 && response.status >= 200) {
        taskList.value = response.data.tasks;
        console.log('tasks', taskList.value);
      } else {
        // TODO: show error message
        console.warn('error', response);
        error.value = response.data.message;
      }

      isFetchingData.value = false;
    }
    
    return {
      taskList,
      isFetchingData,
      fetchTasks,
    };
  },
})
</script>
