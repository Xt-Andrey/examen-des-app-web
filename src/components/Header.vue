<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

  <div class="container">

    <a class="navbar-brand" @click="goHome">
      🍔 Fast Food Bites
    </a>

    <button
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#menu"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      id="menu"
      class="collapse navbar-collapse"
    >

      <ul class="navbar-nav me-auto">

        <li class="nav-item">
          <a
            href="#menu-productos"
            class="nav-link"
          >
            Productos
          </a>
        </li>

        <li class="nav-item">
          <a
            href="#contacto"
            class="nav-link"
          >
            Contacto
          </a>
        </li>

      </ul>

      <div class="d-flex align-items-center gap-3">

        <button
          class="btn btn-outline-warning"
          @click="$emit('toggle-carrito')"
        >
          🛒 {{ totalItems }}
        </button>

        <button
          class="btn btn-danger"
          @click="logout"
        >
          Salir
        </button>

      </div>

    </div>

  </div>

</nav>

</template>

<script>

export default {

  name: 'AppHeader',

  props: {
    carrito: Array
  },

  computed: {

    totalItems() {

      return this.carrito.reduce(
        (acc, item) =>
          acc + item.cantidad,
        0
      )

    }

  },

  methods: {

    goHome() {
      this.$router.push('/')
    },

    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }

  }

}

</script>