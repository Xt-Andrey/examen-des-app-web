/* eslint-disable */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Index.js'
import { auth } from './utils/auth'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Estilos principales
import './assets/css/Styles.css'

// Verificar consistencia de la sesión
const user = auth.getUser()
const userRole = auth.getUserRole()

if (user && !userRole) {
  auth.logout()
}

const app = createApp(App)
app.use(router)
app.mount('#app')