<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo" @click="goHome">
        <div class="logo-line1">
          <span class="logo-fast">Fast</span>
          <span class="logo-food">Food</span>
        </div>
        <div class="logo-line2">
          <span class="logo-bites">Bites</span>
        </div>
      </div>

      <div class="nav-menu">
        <a href="#productos" class="nav-link" @click.prevent="scrollToProductos">Productos</a>
        <a href="#contacto" class="nav-link" @click.prevent="scrollToContacto">Contacto</a>
      </div>

      <div class="nav-actions">
        <button class="cart-btn" @click="$emit('toggle-carrito')">
          🛒 <span class="cart-count">{{ totalItems }}</span>
        </button>
        <button class="logout-btn" @click="logout">
          Salir
        </button>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">☰</button>
    </div>

    <div class="mobile-menu" v-if="mobileMenuOpen">
      <a href="#productos" class="mobile-link" @click.prevent="scrollToProductos">Productos</a>
      <a href="#contacto" class="mobile-link" @click.prevent="scrollToContacto">Contacto</a>
      <button class="mobile-cart" @click="$emit('toggle-carrito')">🛒 Carrito ({{ totalItems }})</button>
      <button class="mobile-logout" @click="logout">Salir</button>
    </div>
  </nav>
</template>

<script>
import { auth } from '../utils/auth'

export default {
  name: 'AppHeader',
  props: {
    carrito: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  computed: {
    totalItems() {
      return this.carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0)
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    scrollToProductos() {
      const element = document.getElementById('productos')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      this.mobileMenuOpen = false
    },
    scrollToContacto() {
      const element = document.getElementById('contacto')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      this.mobileMenuOpen = false
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    logout() {
      auth.logout()
      this.$router.replace('/login')
    }
  }
}
</script>