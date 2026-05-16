import { createApp } from 'vue'
import App from './App.vue'

import router from './router/Index'
import './assets/css/Style.css'
import './assets/css/Login.css'

createApp(App)
  .use(router)
  .mount('#app')