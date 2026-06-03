<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-left">
        <h1>Fast Food<br>Bites</h1>
        <p>¡Únete a nosotros!</p>
        <p>Regístrate ahora</p>
        <p>Ofertas exclusivas</p>
        <p>Puntos por compras</p>
      </div>

      <div class="login-right">
        <h2>Registro</h2>
        <p>Crea tu cuenta para comenzar</p>

        <label>Nombre completo</label>
        <input type="text" v-model="nombre">

        <label>Correo electrónico</label>
        <input type="email" v-model="correo">

        <label>Contraseña</label>
        <input type="password" v-model="password">

        <label>Confirmar contraseña</label>
        <input type="password" v-model="confirmPassword">

        <button @click="registrar">Registrarse</button>

        <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '../services/users'

const nombre = ref('')
const correo = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()

const registrar = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  try {
    const nuevoUsuario = {
      name: nombre.value,
      email: correo.value,
      password: password.value,
      role: 'user'
    }

    await createUser(nuevoUsuario)
    alert('Registro exitoso. Ahora puedes iniciar sesión')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('Error al registrar usuario')
  }
}
</script>