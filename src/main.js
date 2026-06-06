/* eslint-disable */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Index.js'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Estilos principales
import './assets/css/Styles.css'

createApp(App)
  .use(router)
  .mount('#app')