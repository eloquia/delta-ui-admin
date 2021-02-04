<template>
  <nav-controls></nav-controls>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NavControls from '../common/NavControls.vue';

export default defineComponent({
  name: 'ToolbarLayout',
  components: { NavControls },
  setup () {

  },
})
</script>
