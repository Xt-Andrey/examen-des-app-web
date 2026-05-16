<template>

<header class="header">

  <div class="logo">

    <span>FAST FOOD</span>

    <h2>BITES</h2>

  </div>

  <nav class="navbar">

    <ul>

      <li>
        <a href="#menu">
          Menu
        </a>
      </li>

      <li>
        <a href="#categorias">
          Categorias
        </a>
      </li>

      <li>
        <a href="#nosotros">
          Nosotros
        </a>
      </li>

      <li>
        <a href="#contacto">
          Contacto
        </a>
      </li>

    </ul>

  </nav>

  <div class="header-right">

    <div
      class="cart-icon"
      @click="$emit('toggle-carrito')"
    >

      🛒

      <span class="cart-count">
        {{ carrito.length }}
      </span>

    </div>

    <button
      class="logout-btn"
      @click="cerrarSesion"
    >
      Salir
    </button>

  </div>

</header>

</template>

<script>

export default {

  name:'AppHeader',

  props:{
    carrito:Array
  },

  methods:{

    cerrarSesion(){

      this.$router.push('/')

    }

  }

}

</script>