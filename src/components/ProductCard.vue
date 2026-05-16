<template>

<div class="product-card">

  <span
    v-if="producto.popular"
    class="popular"
  >
    POPULAR
  </span>

  <img :src="producto.imagen">

  <div class="product-info">

    <h3>
      {{ producto.nombre }}
    </h3>

    <p>
      {{ producto.descripcion }}
    </p>

    <div class="product-bottom">

      <span class="price">
        ${{ producto.precio }}
      </span>

      <button @click="agregarCarrito">
        + Agregar
      </button>

    </div>

  </div>

</div>

</template>

<script>

export default {

  name:'ProductCard',

  props:{
    producto:Object
  },

  methods:{

    agregarCarrito(){

      this.$emit('agregar', this.producto)

    }

  }

}

</script>