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
      <button @click="submit">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import store from '../store';
import { readIsLoggedIn, readLoginError } from '../store/main/getters';
import { dispatchLogIn } from '../store/main/actions';

export default defineComponent({
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const loginError = () => {
      return readLoginError(store);
    }

    const submit = async () => {
      await dispatchLogIn(store, {username: email.value, password: password.value});

      const isLoggedIn = readIsLoggedIn(store);
      console.log('isLoggedIn', isLoggedIn);
      if (isLoggedIn) {
        router.push('/dashboard');
      }
    }

    return {
      email,
      password,
      loginError,
      submit,
    }
  }
});
</script>
