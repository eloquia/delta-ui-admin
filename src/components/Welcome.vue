<template>
  <div id="welcome">
    <h1>Delta Ledger</h1>
    <p>Where you can track and analyze your own progress</p>
    
    <login></login>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Login from './Login.vue';

export default defineComponent({
  components: { Login },
  name: 'Welcome',
});
</script>
