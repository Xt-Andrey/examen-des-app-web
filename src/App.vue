<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const router = useRouter()

    const handlePopState = () => {
      const isAuthenticated = localStorage.getItem('user')

      if (isAuthenticated) {
        // El usuario presionó "atrás" estando autenticado → cerrar sesión
        localStorage.removeItem('user')
        localStorage.removeItem('userRole')
        router.replace({ name: 'login' })
      }
    }

    onMounted(() => {
      // Empuja un estado extra al historial para poder detectar el "atrás"
      history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', handlePopState)
    })

    onUnmounted(() => {
      window.removeEventListener('popstate', handlePopState)
    })
  }
}
</script>