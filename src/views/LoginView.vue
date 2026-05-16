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
          Prueba:
          usuario@gmail.com /
          contraseña123
        </strong>
      </p>

      <label>Correo electrónico</label>

      <input
        type="email"
        v-model="correo"
      >

      <label>Contraseña</label>

      <input
        type="password"
        v-model="password"
      >

      <button @click="login">
        Iniciar sesión 
      </button>

      <p>
        ¿No tienes una cuenta?
        <router-link to="/register">
          Registrate
        </router-link>
      </p>

    </div>

  </div>

</div>

</template>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const correo = ref('')
const password = ref('')

const router = useRouter()

const login = () => {

  if(
    correo.value === 'usuario@gmail.com' &&
    password.value === 'contraseña123'
  ){
    router.push('/home')
  }else{
    alert('Correo o contraseña incorrectos')
  }

}

</script>

<style scoped>
@import '../assets/css/Login.css';
</style> 