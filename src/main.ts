import { createApp } from 'vue';

import { makeServer } from './server';

import App from './App.vue';

import router from './router';
import store from './store';

import './index.css';

const envMode = import.meta.env.MODE;
if (envMode == 'development') {
  console.log('Starting MirageJS mock back-end server');
  makeServer({ environment: envMode });
}

console.log('Starting front-end app');
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
