<template>
  <nav-controls></nav-controls>
  <h1>{{title}}</h1>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavControls from '../common/NavControls.vue';

export default defineComponent({
  name: 'ToolbarTitleLayout',
  components: { NavControls },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup () {

  },
})
</script>
