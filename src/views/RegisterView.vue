<template>
  <div class="auth-page">
    <div class="auth-card register-layout">
      <!-- Lado izquierdo - FORMULARIO DE REGISTRO -->
      <div class="auth-left-form">
        <div class="form-content">
          <h2>Crear cuenta</h2>
          <p class="subtitle">Regístrate para comenzar a pedir</p>

          <form @submit.prevent="registrar">
            <div class="input-group">
              <label>👤 Nombre completo</label>
              <input type="text" v-model="nombre" placeholder="Ej: Juan Pérez">
            </div>
            <div class="input-group">
              <label>📧 Correo electrónico</label>
              <input type="email" v-model="correo" placeholder="tu@email.com">
            </div>
            <div class="input-group">
              <label>🔒 Contraseña</label>
              <input type="password" v-model="password" placeholder="Mínimo 6 caracteres">
            </div>
            <div class="input-group">
              <label>🔒 Confirmar contraseña</label>
              <input type="password" v-model="confirmPassword" placeholder="Repite tu contraseña">
            </div>
            <button type="submit" class="btn-submit" :disabled="cargando">
              {{ cargando ? 'Registrando...' : 'Registrarse' }}
            </button>
          </form>

          <p class="switch-link">
            ¿Ya tienes cuenta?
            <router-link to="/login" class="switch-btn">Inicia sesión aquí</router-link>
          </p>
        </div>
      </div>

      <!-- Lado derecho - PIZZA COMO FONDO con texto encima -->
      <div class="auth-right-image">
        <div class="overlay"></div>
        <div class="brand-content">
          <div class="food-icon">🍕</div>
          <h1>Fast Food <span>Bites</span></h1>
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">⭐</span>
              <span>Únete a nuestra comunidad</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎁</span>
              <span>Ofertas exclusivas</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🏆</span>
              <span>Acumula puntos por compras</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🚚</span>
              <span>Envíos gratis desde $30.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const API_BASE = 'https://6a1aeb57bc2f94475492ce64.mockapi.io'

const nombre = ref('')
const correo = ref('')
const password = ref('')
const confirmPassword = ref('')
const cargando = ref(false)
const router = useRouter()

const registrar = async () => {
  if (!nombre.value || !correo.value || !password.value) {
    alert('⚠️ Todos los campos son obligatorios')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('❌ Las contraseñas no coinciden')
    return
  }

  if (password.value.length < 6) {
    alert('❌ La contraseña debe tener al menos 6 caracteres')
    return
  }

  cargando.value = true

  try {
    const response = await axios.get(`${API_BASE}/users`)
    const usuarios = response.data
    const emailExiste = usuarios.find(u => u.email === correo.value)
    
    if (emailExiste) {
      alert('❌ Este correo ya está registrado')
      cargando.value = false
      return
    }

    const nuevoUsuario = {
      name: nombre.value,
      email: correo.value,
      password: password.value,
      role: 'user',
      createdAt: new Date().toISOString()
    }

    await axios.post(`${API_BASE}/users`, nuevoUsuario)
    
    alert('✅ ¡Registro exitoso! Ahora puedes iniciar sesión')
    router.push('/login')
    
  } catch (error) {
    console.error('Error en registro:', error)
    alert('❌ Error al registrar usuario')
  } finally {
    cargando.value = false
  }
}
</script>