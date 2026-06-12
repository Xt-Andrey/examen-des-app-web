import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

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
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
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
      const isAuthenticated = sessionStorage.getItem('user')
      const userRole = sessionStorage.getItem('userRole')
      if (!isAuthenticated) return '/login'
      return userRole === 'admin' ? '/admin' : '/'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('user')
  const userRole = sessionStorage.getItem('userRole')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.isAdmin && userRole !== 'admin') {
    next('/')
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next(userRole === 'admin' ? '/admin' : '/')
  } else {
    next()
  }
})

export default router