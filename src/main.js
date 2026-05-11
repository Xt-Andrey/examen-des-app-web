import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/style.css'
import './assets/css/login.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

createApp(App)
  .use(router)
  .mount('#app')