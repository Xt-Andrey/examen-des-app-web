<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-left">
        <div class="overlay"></div>
        <div class="brand-content">
          <div class="food-icon">🍕</div>
          <h1>Fast Food <span>Bites</span></h1>
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>Comida rápida</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🥬</span>
              <span>Ingredientes frescos</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🚚</span>
              <span>Entrega en 30 min</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">⭐</span>
              <span>Calidad premium</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💳</span>
              <span>Pago fácil y seguro</span>
            </div>
          </div>
        </div>
      </div>

      <div class="auth-right">
        <div class="form-content">
          <h2>¡Bienvenido!</h2>
          <p class="subtitle">Inicia sesión para ver nuestro menú</p>

          <AlertMessage ref="alertRef" :type="alertType" :message="alertMessage" />

          <div class="test-users">
            <div class="test-title">📋 Usuarios de prueba</div>
            <div class="test-item admin">
              <span class="tag">👑 Admin</span>
              <span class="email">Nico.Cummings92@yahoo.com</span>
              <span class="pass">pass: gLz714f8Ocm4s7W</span>
            </div>
            <div class="test-item user">
              <span class="tag">👤 Usuario</span>
              <span class="email">Alyson.Gottlieb3@yahoo.com</span>
              <span class="pass">pass: 0OsrkDfqM9ciMcC</span>
            </div>
          </div>

          <form @submit.prevent="login">
            <div class="input-group">
              <label>📧 Correo electrónico</label>
              <input type="email" v-model="correo" placeholder="tu@email.com">
            </div>
            <div class="input-group">
              <label>🔒 Contraseña</label>
              <input type="password" v-model="password" placeholder="********">
            </div>
            <button type="submit" class="btn-submit" :disabled="loading">
              {{ loading ? 'Ingresando...' : 'Iniciar sesión →' }}
            </button>
          </form>

          <p class="switch-link">
            ¿No tienes una cuenta?
            <router-link to="/register" class="switch-btn">Regístrate aquí</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers } from '../services/users'
import AlertMessage from '../components/AlertMessage.vue'

const correo = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const alertRef = ref(null)
const alertType = ref('danger')
const alertMessage = ref('')

const showAlert = (type, message) => {
  alertType.value = type
  alertMessage.value = message
  alertRef.value?.show()
}

const login = async () => {
  if (!correo.value || !password.value) {
    showAlert('warning', 'Por favor ingresa tu correo y contraseña.')
    return
  }

  loading.value = true
  try {
    const usuarios = await getUsers()
    const usuario = usuarios.find(
      user => user.email === correo.value && user.password === password.value
    )

    if (usuario) {
      showAlert('success', `¡Bienvenido, ${usuario.name}! Redirigiendo...`)

      sessionStorage.setItem('user', JSON.stringify(usuario))
      sessionStorage.setItem('userRole', usuario.role)
      sessionStorage.setItem('userEmail', usuario.email)
      sessionStorage.setItem('userName', usuario.name)

      setTimeout(() => {
        if (usuario.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }, 1200)
    } else {
      showAlert('danger', 'Correo o contraseña incorrectos. Inténtalo de nuevo.')
    }
  } catch (error) {
    console.error('Error en login:', error)
    showAlert('danger', 'Error al conectar con el servidor. Inténtalo más tarde.')
  } finally {
    loading.value = false
  }
}
</script>