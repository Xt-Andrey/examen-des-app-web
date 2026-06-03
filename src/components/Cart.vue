<template>

<div>

  <h4>
    Mi carrito
  </h4>

  <div
    v-if="carrito.length === 0"
    class="alert alert-info"
  >
    No hay productos
  </div>

  <div
    v-for="item in carrito"
    :key="item.id"
    class="card mb-2"
  >

    <div class="card-body">

      <h6>
        {{ item.nombre }}
      </h6>

      <p>
        ${{ item.precio }}
      </p>

      <div
        class="d-flex gap-2 align-items-center"
      >

        <button
          class="btn btn-sm btn-danger"
          @click="$emit('restar', item.id)"
        >
          -
        </button>

        <span>
          {{ item.cantidad }}
        </span>

        <button
          class="btn btn-sm btn-success"
          @click="$emit('sumar', item.id)"
        >
          +
        </button>

      </div>

      <p class="mt-2">

        Subtotal:

        ${{ item.precio * item.cantidad }}

      </p>

    </div>

  </div>

  <h4>
    Total: ${{ total }}
  </h4>

</div>

</template>

<script>
export default {

  name:'Cart',

  props:{
    carrito:Array,
    total:Number
  }

}
</script>