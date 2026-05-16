<template>

<header class="header">

  <div class="logo">

    <span>FAST FOOD</span>

    <h2>BITES</h2>

  </div>

  <!-- MENU MOBILE -->

  <div
    class="menu-toggle"
    @click="menuOpen = !menuOpen"
  >
    ☰
  </div>

  <!-- NAVBAR -->

  <nav
    class="navbar"
    :class="{ active: menuOpen }"
  >

    <ul>

      <li>
        <a
          href="#menu"
          @click="menuOpen = false"
        >
          Menu
        </a>
      </li>

      <li>
        <a
          href="#categorias"
          @click="menuOpen = false"
        >
          Categorias
        </a>
      </li>

      <li>
        <a
          href="#nosotros"
          @click="menuOpen = false"
        >
          Nosotros
        </a>
      </li>

      <li>
        <a
          href="#contacto"
          @click="menuOpen = false"
        >
          Contacto
        </a>
      </li>

    </ul>

  </nav>

  <!-- RIGHT -->

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

  data(){

    return{

      menuOpen:false

    }

  },

  methods:{

    cerrarSesion(){

      this.$router.push('/')

    }

  }

}

</script>