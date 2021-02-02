import { createApp } from 'vue'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'

import router from './router';
import store from './store';

import './index.css';

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
