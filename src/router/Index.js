import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import { auth } from '../utils/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { guestOnly: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: true, isAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const isAuthenticated = auth.isAuthenticated()
      const userRole = auth.getUserRole()
      
      if (!isAuthenticated) return '/login'
      return userRole === 'admin' ? '/admin' : '/'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = auth.isAuthenticated()
  const userRole = auth.getUserRole()

  // Si la ruta es solo para invitados (login/register) y ya está autenticado
  if (to.meta.guestOnly && isAuthenticated) {
    next(userRole === 'admin' ? '/admin' : '/')
    return
  }
  
  // Si la ruta requiere autenticación y no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // Si la ruta requiere ser admin y no lo es
  if (to.meta.isAdmin && userRole !== 'admin') {
    next('/')
    return
  }
  
  next()
})

export default router