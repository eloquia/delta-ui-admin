<template>
  <div id="welcome">
    <h1>Delta Ledger</h1>
    <p>Where you can track and analyze your own progress</p>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Welcome', 
});
</script>
