import { createApp } from 'vue'
import App from './App.vue'

import router from './router/Index'
import './assets/css/Styles.css'     
import './assets/css/Styles/Header.css'
import './assets/css/Styles/Footer.css'
import './assets/css/Styles/Sidebar.css'
import './assets/css/Login.css'

createApp(App)
  .use(router)
  .mount('#app')