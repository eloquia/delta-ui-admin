<!--
  TODOs:
  * Add validation & animation for email & password
  * Add route transition
-->

<template>
  <div>
    <h1>Delta</h1>
    <div>
      <input
          @keyup.enter="submit"
          v-model="email"
          prepend-icon="person"
          name="login"
          type="text" />
      <input
          @keyup.enter="submit"
          v-model="password"
          prepend-icon="lock"
          name="password"
          id="password"
          type="password" />
    </div>
    <div v-if="loginError">
      Incorrect email or password
    </div>
    <div class="action-container">
      <button v-bind:disabled="!isRequestInFlight" @click.prevent="submit">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import store from '../store';
import { readIsLoggedIn, readLoginError } from '../store/main/getters';
import { dispatchLogIn } from '../store/main/actions';

export default defineComponent({
  setup() {
    const router = useRouter();
    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const isRequestInFlight: Ref<boolean> = ref(true);

    const loginError = () => {
      return readLoginError(store);
    }

    const submit = async () => {
      isRequestInFlight.value = true;
      await dispatchLogIn(store, {username: email.value, password: password.value});

      const isLoggedIn = readIsLoggedIn(store);
      if (isLoggedIn) {
        isRequestInFlight.value = false;
        router.push('/dashboard');
      } else {
        // TODO: Show error message
        isRequestInFlight.value = false;
      }
    }

    return {
      email,
      password,
      isRequestInFlight,
      loginError,
      submit,
    }
  }
});
</script>
