<template>
  <div class="product-card">
    <span v-if="producto.popular" class="product-badge">🔥 Popular</span>
    <div class="product-image-wrapper">
      <img :src="producto.imagen" :alt="producto.nombre" class="product-image">
    </div>
    <div class="product-body">
      <h5 class="product-title">{{ producto.nombre }}</h5>
      <p class="product-description">{{ producto.descripcion }}</p>
      <h5 class="product-price">${{ producto.precio.toLocaleString() }}</h5>
      <button class="product-button" @click="$emit('agregar', producto)">
        🛒 Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    producto: {
      type: Object,
      required: true
    }
  }
}
</script>