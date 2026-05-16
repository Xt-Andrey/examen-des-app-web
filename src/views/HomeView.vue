<template>

<div class="page-container">

  <AppHeader
    :carrito="carrito"
    @toggle-carrito="toggleCarrito"
  />

  <!-- OVERLAY -->

  <div
    v-if="mostrarCarrito"
    class="cart-overlay"
    @click="mostrarCarrito=false"
  ></div>

  <!-- CARRITO -->

  <div
    class="cart-sidebar"
    :class="{ active: mostrarCarrito }"
  >

    <div class="cart-header">

      <h2>
        Mi carrito
      </h2>

      <button @click="mostrarCarrito=false">
        ✖
      </button>

    </div>

    <div
      v-if="carrito.length === 0"
      class="empty-cart"
    >

      <h3>
        Tu carrito está vacío
      </h3>

    </div>

    <div
      v-for="(item,index) in carrito"
      :key="index"
      class="cart-item"
    >

      <img :src="item.imagen">

      <div class="cart-info">

        <h4>
          {{ item.nombre }}
        </h4>

        <p>
          ${{ item.precio }}
        </p>

      </div>

      <button
        class="delete-btn"
        @click="eliminarProducto(index)"
      >
        🗑
      </button>

    </div>

    <div
      v-if="carrito.length > 0"
      class="cart-footer"
    >

      <h3>
        Total:
        <span>
          ${{ total }}
        </span>
      </h3>

      <button
        class="pay-btn"
        @click="pagar"
      >
        Finalizar compra
      </button>

      <button
        class="clear-btn"
        @click="vaciarCarrito"
      >
        Vaciar carrito
      </button>

    </div>

  </div>

  <!-- CONTENIDO -->

  <div class="main-wrapper">

    <!-- HERO -->

    <section class="hero">

      <div class="hero-content">

        <h1>
          EL MEJOR <span>MENU</span><br>
          DE LA CIUDAD
        </h1>

        <p>
          Ingredientes frescos y sabores únicos.
        </p>

        <button @click="irMenu">
          Ver menu completo
        </button>

      </div>

    </section>

    <!-- MENU -->

    <section
      class="menu-section"
      id="menu"
    >

      <h2 class="section-title">
        NUESTRO <span>MENU</span>
      </h2>

      <div
        class="categories"
        id="categorias"
      >

        <button @click="filtrar('todos')">
          Todos
        </button>

        <button @click="filtrar('burgers')">
          Hamburguesas
        </button>

        <button @click="filtrar('chicken')">
          Pollo
        </button>

        <button @click="filtrar('hotdogs')">
          Hotdogs
        </button>

        <button @click="filtrar('bebidas')">
          Bebidas
        </button>

      </div>

      <div class="products-grid">

        <ProductCard
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :producto="producto"
          @agregar="agregarCarrito"
        />

      </div>

    </section>

    <!-- NOSOTROS -->

    <section
      class="about-section"
      id="nosotros"
    >

      <h2 class="section-title">
        SOBRE NOSOTROS
      </h2>

      <div class="about-grid">

        <div class="about-text">
          <p>
            Fast Food Bites nacio en Ocaña con una sola mision: ofrecer comida rapida de verdadera calidad. Creemos que la buena comida no tiene que ser lenta ni costosa, por eso cada producto en nuestro menu es preparado con ingredientes frescos, seleccionados cuidadosamente para garantizar el mejor sabor en cada bocado.
          </p>
          <p>
            Somos un equipo apasionado por la gastronomia urbana. Desde nuestras hamburguesas Angus hasta nuestras bebidas artesanales, cada receta ha sido desarrollada para superar las expectativas de nuestros clientes. La satisfaccion de quien nos visita es nuestra mayor recompensa.
          </p>
          <p>
            Con mas de tres anos de experiencia en el mercado ocañero, hemos servido a miles de familias y amigos que han hecho de Fast Food Bites su lugar favorito para compartir momentos especiales alrededor de una buena comida.
          </p>
        </div>

      </div>

    </section>

    <!-- CONTACTO -->

    <ContactForm />

  </div>

  <AppFooter />

</div>

</template>

<script>

import AppHeader from '../components/Header.vue'
import ProductCard from '../components/ProductCard.vue'
import ContactForm from '../components/ContactForm.vue'
import AppFooter from '../components/Footer.vue'

import productosData from '../data/Productos.json'

export default {

  name:'HomeView',

  components:{
    AppHeader,
    ProductCard,
    ContactForm,
    AppFooter
  },

  data(){

    return{

      productos:productosData,
      productosFiltrados:productosData,

      carrito:[],

      mostrarCarrito:false

    }

  },

  computed:{

    total(){

      return this.carrito.reduce(
        (acc,item)=> acc + item.precio,
        0
      )

    }

  },

  methods:{

    toggleCarrito(){

      this.mostrarCarrito =
      !this.mostrarCarrito

    },

    agregarCarrito(producto){

      this.carrito.push(producto)

      this.mostrarCarrito = true

    },

    eliminarProducto(index){

      this.carrito.splice(index,1)

    },

    vaciarCarrito(){

      this.carrito=[]

    },

    pagar(){

      alert('Compra realizada correctamente')

      this.carrito=[]

      this.mostrarCarrito=false

    },

    filtrar(categoria){

      if(categoria === 'todos'){

        this.productosFiltrados =
        this.productos

        return

      }

      this.productosFiltrados =
      this.productos.filter(
        p => p.categoria === categoria
      )

    },

    irMenu(){

      document
      .getElementById('menu')
      .scrollIntoView({
        behavior:'smooth'
      })

    }

  }

}

</script>