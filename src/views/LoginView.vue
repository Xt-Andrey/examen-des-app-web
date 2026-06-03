<template>

<div class="login-page">

  <div class="login-card">

    <div class="login-left">

      <h1>
        Fast Food
        <br>
        Bites
      </h1>

      <p>Comida rápida</p>
      <p>Ingredientes frescos</p>
      <p>Entrega en 30 min</p>
      <p>Calidad</p>
      <p>Pago fácil y seguro</p>

    </div>

    <div class="login-right">

      <h2>Bienvenido</h2>

      <p>
        Inicia sesión para ver nuestro menú
      </p>

      <p>
        <strong>
          Usuarios de prueba:
        </strong>
      </p>
      <p>👑 Admin: Nico.Cummings92@yahoo.com / gLz714f8Ocm4s7W</p>
      <p>👤 Usuario: Alyson.Gottlieb3@yahoo.com / 0OsrkDfqM9ciMcC</p>

      <label>Correo electrónico</label>

      <input
        type="email"
        v-model="correo"
        placeholder="Ingresa tu email"
      >

      <label>Contraseña</label>

      <input
        type="password"
        v-model="password"
        placeholder="Ingresa tu contraseña"
        @keyup.enter="login"
      >

      <button @click="login">
        Iniciar sesión 
      </button>

      <p>
        ¿No tienes una cuenta?
        <router-link to="/register">
          Regístrate
        </router-link>
      </p>

    </div>

  </div>

</div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUsers } from '../services/users'

const correo = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {

  if (!correo.value || !password.value) {
    alert('Por favor ingresa correo y contraseña')
    return
  }

  try {

    const usuarios = await getUsers()

    const usuario = usuarios.find(
      user =>
        user.email === correo.value &&
        user.password === password.value
    )

    if (usuario) {

      localStorage.setItem('user', JSON.stringify(usuario))
      localStorage.setItem('userRole', usuario.role)
      localStorage.setItem('userEmail', usuario.email)
      localStorage.setItem('userName', usuario.name)

      if (usuario.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }

    } else {

      alert('Correo o contraseña incorrectos')

    }

  } catch (error) {

    console.error('Error en login:', error)
    alert('Error al conectar con MockAPI')

  }

}

</script>