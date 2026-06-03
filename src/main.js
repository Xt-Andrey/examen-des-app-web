/* eslint-disable */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Index.js'

// Importar variables globales
import './assets/css/utils/variables.css'

// Importar componentes
import './assets/css/components/Header.css'
import './assets/css/components/Footer.css'
import './assets/css/components/Sidebar.css'
import './assets/css/components/ProductCard.css'

// Importar vistas
import './assets/css/views/Login.css'
import './assets/css/views/Home.css'
import './assets/css/views/AdminDashboard.css'

createApp(App)
  .use(router)
  .mount('#app')