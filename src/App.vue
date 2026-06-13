<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { auth } from './utils/auth'

export default {
  name: 'App',
  setup() {
    const router = useRouter()

    const handlePopState = (event) => {
      const isAuthenticated = auth.isAuthenticated()
      const currentPath = window.location.pathname
      
      console.log('PopState detectado - Path:', currentPath, 'Autenticado:', isAuthenticated)
      
      // Si está autenticado y está en cualquier ruta protegida (/, /admin, etc.)
      // Al presionar "atrás", cerramos sesión y vamos a login
      if (isAuthenticated) {
        // Cerrar sesión
        auth.logout()
        
        // Limpiar carrito si existe
        localStorage.removeItem('carrito')
        
        // Redirigir a login
        router.replace('/login')
        return
      }
      
      // Si no está autenticado y no está en login/register, redirigir a login
      if (!isAuthenticated && currentPath !== '/login' && currentPath !== '/register') {
        router.replace('/login')
      }
    }

    onMounted(() => {
      // Agregar un estado extra al historial para detectar "atrás"
      // Esto crea una entrada adicional en el historial
      history.pushState(null, '', window.location.href)
      
      // Verificar sesión al cargar
      const isAuthenticated = auth.isAuthenticated()
      const currentPath = window.location.pathname
      
      console.log('App mounted - Path:', currentPath, 'Autenticado:', isAuthenticated)
      
      // Si no está autenticado y no está en login/register, redirigir
      if (!isAuthenticated && currentPath !== '/login' && currentPath !== '/register') {
        router.replace('/login')
      }
      
      // Escuchar evento popstate (botón atrás/adelante)
      window.addEventListener('popstate', handlePopState)
    })

    onUnmounted(() => {
      window.removeEventListener('popstate', handlePopState)
    })
  }
}
</script>