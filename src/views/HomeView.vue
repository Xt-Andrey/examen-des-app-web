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
    @click="mostrarCarrito = false"
  ></div>

  <!-- CARRITO LATERAL -->
  <div
    class="cart-sidebar"
    :class="{ active: mostrarCarrito }"
  >
    <div class="cart-header">
      <h2>Mi carrito</h2>
      <button @click="mostrarCarrito = false">✖</button>
    </div>

    <div v-if="carrito.length === 0" class="empty-cart">
      <h3>Tu carrito está vacío</h3>
    </div>

    <div v-for="(item, index) in carrito" :key="item.id" class="cart-item">
      <img :src="item.imagen" :alt="item.nombre">
      <div class="cart-info">
        <h4>{{ item.nombre }}</h4>
        <p>${{ item.precio }}</p>
        <div class="quantity-controls">
          <button @click="disminuirCantidad(index)">-</button>
          <span>{{ item.cantidad }}</span>
          <button @click="aumentarCantidad(index)">+</button>
        </div>
        <p>Subtotal: ${{ item.precio * item.cantidad }}</p>
      </div>
      <button class="delete-btn" @click="eliminarProducto(index)">🗑</button>
    </div>

    <div v-if="carrito.length > 0" class="cart-footer">
      <h3>Total: <span>${{ total }}</span></h3>
      <button class="pay-btn" @click="pagar">Finalizar compra</button>
      <button class="clear-btn" @click="vaciarCarrito">Vaciar carrito</button>
    </div>
  </div>

  <!-- CONTENIDO PRINCIPAL -->
  <div class="main-wrapper">

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>EL MEJOR <span>MENU</span><br>DE LA CIUDAD</h1>
        <p>Ingredientes frescos y sabores únicos.</p>
        <button @click="irMenu">Ver menú completo</button>
      </div>
    </section>

    <!-- MENU DE PRODUCTOS -->
    <section class="menu-section" id="menu">
      <h2 class="section-title">NUESTRO <span>MENU</span></h2>

      <div class="categories">
        <button @click="filtrar('todos')" :class="{ active: categoriaActiva === 'todos' }">Todos</button>
        <button @click="filtrar('burgers')" :class="{ active: categoriaActiva === 'burgers' }">🍔 Hamburguesas</button>
        <button @click="filtrar('chicken')" :class="{ active: categoriaActiva === 'chicken' }">🍗 Pollo</button>
        <button @click="filtrar('hotdogs')" :class="{ active: categoriaActiva === 'hotdogs' }">🌭 Hotdogs</button>
        <button @click="filtrar('sides')" :class="{ active: categoriaActiva === 'sides' }">🍟 Acompañamientos</button>
        <button @click="filtrar('bebidas')" :class="{ active: categoriaActiva === 'bebidas' }">🥤 Bebidas</button>
      </div>

      <div v-if="cargando" class="loading-spinner">
        Cargando productos...
      </div>

      <div class="products-grid" v-else>
        <div v-for="producto in productosFiltrados" :key="producto.id" class="product-card">
          <span v-if="producto.popular" class="product-badge">🔥 Popular</span>
          <img :src="producto.imagen" :alt="producto.nombre" class="product-image">
          <div class="product-body">
            <h5 class="product-title">{{ producto.nombre }}</h5>
            <p class="product-description">{{ producto.descripcion }}</p>
            <h5 class="product-price">${{ producto.precio }}</h5>
            <button class="product-button" @click="agregarCarrito(producto)">
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SOBRE NOSOTROS -->
    <section class="about-section">
      <h2 class="section-title">SOBRE <span>NOSOTROS</span></h2>
      <div class="about-grid">
        <div class="about-text">
          <p>Fast Food Bites nació en Ocaña con una sola misión: ofrecer comida rápida de verdadera calidad.</p>
          <p>Utilizamos ingredientes frescos y recetas únicas para brindar la mejor experiencia gastronómica.</p>
          <p>Miles de clientes nos han convertido en uno de los restaurantes favoritos de la ciudad.</p>
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
import ContactForm from '../components/ContactForm.vue'
import AppFooter from '../components/Footer.vue'

export default {

  name: 'HomeView',

  components: {
    AppHeader,
    ContactForm,
    AppFooter
  },

  data() {

    return {
      productos: [],
      productosFiltrados: [],
      carrito: [],
      mostrarCarrito: false,
      cargando: true,
      categoriaActiva: 'todos'
    }

  },

  async mounted() {
    await this.cargarProductos()
    this.cargarCarrito()
  },

  computed: {

    total() {
      return this.carrito.reduce(
        (acc, item) => acc + (item.precio * item.cantidad),
        0
      )
    }

  },

  methods: {

    async cargarProductos() {
      this.cargando = true
      try {
        const response = await fetch('https://6a1aeb57bc2f94475492ce64.mockapi.io/products')
        const data = await response.json()
        
        // Mapear los datos de la API al formato que usa la vista
        this.productos = data.map(producto => ({
          id: producto.id,
          nombre: producto.name,
          precio: producto.price,
          categoria: producto.category,
          descripcion: producto.description,
          imagen: producto.image,
          popular: producto.popular
        }))
        
        this.productosFiltrados = [...this.productos]
        console.log('Productos cargados:', this.productos)
      } catch (error) {
        console.error('Error cargando productos:', error)
        alert('Error al cargar los productos')
      } finally {
        this.cargando = false
      }
    },

    cargarCarrito() {
      const carritoGuardado = localStorage.getItem('carrito')
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado)
      }
    },

    guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito))
    },

    toggleCarrito() {
      this.mostrarCarrito = !this.mostrarCarrito
    },

    agregarCarrito(producto) {
      const existe = this.carrito.find(item => item.id === producto.id)
      
      if (existe) {
        existe.cantidad++
      } else {
        this.carrito.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
        })
      }
      
      this.guardarCarrito()
      this.mostrarCarrito = true
      
      // Animación de confirmación
      alert(`${producto.nombre} agregado al carrito`)
    },

    aumentarCantidad(index) {
      this.carrito[index].cantidad++
      this.guardarCarrito()
    },

    disminuirCantidad(index) {
      this.carrito[index].cantidad--
      if (this.carrito[index].cantidad <= 0) {
        this.carrito.splice(index, 1)
      }
      this.guardarCarrito()
    },

    eliminarProducto(index) {
      this.carrito.splice(index, 1)
      this.guardarCarrito()
    },

    vaciarCarrito() {
      this.carrito = []
      localStorage.removeItem('carrito')
    },

    pagar() {
      if (this.carrito.length === 0) {
        alert('No hay productos en el carrito')
        return
      }
      alert('✅ Compra realizada correctamente. ¡Gracias por tu pedido!')
      this.carrito = []
      localStorage.removeItem('carrito')
      this.mostrarCarrito = false
    },

    filtrar(categoria) {
      this.categoriaActiva = categoria
      if (categoria === 'todos') {
        this.productosFiltrados = [...this.productos]
      } else {
        this.productosFiltrados = this.productos.filter(
          producto => producto.categoria === categoria
        )
      }
    },

    irMenu() {
      document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
      })
    }

  }

}

</script>