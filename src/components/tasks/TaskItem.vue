<template>
  <div class="task-item">
    <p>{{description}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'TaskItem',
  props: {
    description: {
      type: String,
      required: true,
    },
  }
})
</script>
