<template>
  <nav class="flex flex-row justify-end">
    <button @click.prevent="logOut">Log Out</button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import store from '../../store';
import { dispatchLogOut } from '../../store/main/actions';

export default defineComponent({
  name: 'NavControls',
  setup () {
    const router = useRouter();

    const logOut = async () => {
      console.log('logging out');
      dispatchLogOut(store);
      router.push('/');
    };

    return {
      logOut,
    };
  },
});
</script>
