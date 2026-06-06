<template>
  <div class="home">
    <Header :carrito="carrito" @toggle-carrito="toggleCarrito" />

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1>EL MEJOR <span class="hero-highlight">MENÚ</span><br>DE LA CIUDAD</h1>
        <p>Ingredientes frescos y sabores únicos.</p>
        <button class="hero-btn" @click="scrollToMenu">Ver menú completo</button>
      </div>
    </section>

    <!-- PRODUCTOS -->
    <section id="productos" class="products-section">
      <div class="container">
        <!-- TÍTULO CORREGIDO: NUESTRO arriba, MENÚ abajo -->
        <div class="section-title">
          <span class="title-top">NUESTRO</span>
          <span class="title-bottom">MENÚ</span>
        </div>
        
        <div class="categories">
          <button 
            v-for="cat in categorias" 
            :key="cat.value"
            :class="['category-btn', { active: categoriaActiva === cat.value }]"
            @click="filtrar(cat.value)"
          >
            {{ cat.icon }} {{ cat.nombre }}
          </button>
        </div>

        <div v-if="cargando" class="loading">Cargando productos...</div>
        
        <div class="products-grid" v-else>
          <div v-for="producto in productosFiltrados" :key="producto.id" class="product-card">
            <span v-if="producto.popular" class="product-badge">🔥 Popular</span>
            <!-- IMAGEN CENTRADA Y MÁS GRANDE -->
            <div class="product-img-container">
              <img :src="producto.imagen" :alt="producto.nombre" class="product-img">
            </div>
            <div class="product-info">
              <h3 class="product-title">{{ producto.nombre }}</h3>
              <p class="product-desc">{{ producto.descripcion }}</p>
              <div class="product-footer">
                <span class="product-price">${{ producto.precio.toLocaleString() }}</span>
                <button class="add-to-cart" @click="agregarCarrito(producto)">
                  🛒 Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOBRE NOSOTROS -->
    <section class="about-section">
      <div class="container">
        <div class="section-title">
          <span class="title-top">SOBRE</span>
          <span class="title-bottom">NOSOTROS</span>
        </div>
        <div class="about-content">
          <p>Fast Food Bites nació en Ocaña con una sola misión: ofrecer comida rápida de verdadera calidad.</p>
          <p>Utilizamos ingredientes frescos y recetas únicas para brindar la mejor experiencia gastronómica.</p>
          <p>Miles de clientes nos han convertido en uno de los restaurantes favoritos de la ciudad.</p>
        </div>
      </div>
    </section>

    <!-- CONTACTO -->
    <ContactForm />

    <!-- FOOTER -->
    <Footer />

    <!-- CARRITO -->
    <div v-if="mostrarCarrito" class="cart-overlay" @click="cerrarCarrito"></div>
    <div class="cart-sidebar" :class="{ active: mostrarCarrito }">
      <div class="cart-header">
        <h3>🛒 Mi carrito</h3>
        <button class="cart-close" @click="cerrarCarrito">✕</button>
      </div>
      <div class="cart-body">
        <div v-if="carrito.length === 0" class="empty-cart">
          <span class="empty-icon">🛒</span>
          <p>Tu carrito está vacío</p>
        </div>
        <div v-for="(item, index) in carrito" :key="item.id" class="cart-item">
          <img :src="item.imagen" :alt="item.nombre" class="cart-item-img">
          <div class="cart-item-info">
            <h4>{{ item.nombre }}</h4>
            <p>${{ item.precio.toLocaleString() }}</p>
            <div class="cart-quantity">
              <button @click="disminuirCantidad(index)">-</button>
              <span>{{ item.cantidad }}</span>
              <button @click="aumentarCantidad(index)">+</button>
            </div>
          </div>
          <button class="cart-remove" @click="eliminarProducto(index)">🗑️</button>
        </div>
      </div>
      <div v-if="carrito.length > 0" class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <strong>${{ total.toLocaleString() }}</strong>
        </div>
        <button class="checkout-btn" @click="finalizarCompra">✅ Finalizar compra</button>
        <button class="clear-cart-btn" @click="vaciarCarritoConfirmado">Vaciar carrito</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import ContactForm from '../components/ContactForm.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'HomeView',
  components: {
    Header,
    ContactForm,
    Footer
  },
  data() {
    return {
      productos: [],
      carrito: [],
      mostrarCarrito: false,
      cargando: true,
      categoriaActiva: 'todos',
      categorias: [
        { value: 'todos', nombre: 'Todos', icon: '🍽️' },
        { value: 'burgers', nombre: 'Hamburguesas', icon: '🍔' },
        { value: 'chicken', nombre: 'Pollo', icon: '🍗' },
        { value: 'hotdogs', nombre: 'Hotdogs', icon: '🌭' },
        { value: 'sides', nombre: 'Acompañamientos', icon: '🍟' },
        { value: 'bebidas', nombre: 'Bebidas', icon: '🥤' }
      ]
    }
  },
  computed: {
    productosFiltrados() {
      if (this.categoriaActiva === 'todos') return this.productos
      return this.productos.filter(p => p.categoria === this.categoriaActiva)
    },
    total() {
      return this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    }
  },
  mounted() {
    this.cargarProductos()
    this.cargarCarrito()
  },
  methods: {
    async cargarProductos() {
      this.cargando = true
      try {
        const response = await fetch('https://6a1aeb57bc2f94475492ce64.mockapi.io/products')
        const data = await response.json()
        this.productos = data.map(p => ({
          id: p.id,
          nombre: p.name,
          precio: p.price,
          categoria: p.category,
          descripcion: p.description,
          imagen: p.image,
          popular: p.popular
        }))
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.cargando = false
      }
    },
    
    cargarCarrito() {
      const saved = localStorage.getItem('carrito')
      if (saved) {
        try {
          this.carrito = JSON.parse(saved)
        } catch (e) {
          this.carrito = []
        }
      }
    },
    
    guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito))
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
    
    vaciarCarritoConfirmado() {
      if (confirm('¿Estás seguro de vaciar todo el carrito?')) {
        this.carrito = []
        localStorage.removeItem('carrito')
        this.mostrarCarrito = false
        alert('🛒 Carrito vaciado correctamente')
      }
    },
    
    cerrarCarrito() {
      this.mostrarCarrito = false
    },
    
    finalizarCompra() {
      if (this.carrito.length === 0) {
        alert('No hay productos en el carrito')
        return
      }

      const user = JSON.parse(localStorage.getItem('user') || '{}')
      
      const nuevoPedido = {
        id: Date.now(),
        customerName: user.name || 'Cliente',
        customerEmail: user.email || 'sin-email@cliente.com',
        items: [...this.carrito],
        total: this.total,
        status: 'pendiente',
        createdAt: new Date().toISOString()
      }

      let pedidos = localStorage.getItem('orders')
      pedidos = pedidos ? JSON.parse(pedidos) : []
      pedidos.unshift(nuevoPedido)
      localStorage.setItem('orders', JSON.stringify(pedidos))

      this.carrito = []
      localStorage.removeItem('carrito')
      this.mostrarCarrito = false
      
      alert('✅ ¡Pedido realizado con éxito!')
    },
    
    toggleCarrito() {
      this.mostrarCarrito = !this.mostrarCarrito
    },
    
    scrollToMenu() {
      const element = document.getElementById('productos')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    
    filtrar(categoria) {
      this.categoriaActiva = categoria
    }
  }
}
</script>