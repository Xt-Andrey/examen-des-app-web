<template>

<div class="card">

  <div class="card-header">

    <h4>
      Administración de Productos
    </h4>

  </div>

  <div class="card-body">

    <form @submit.prevent="guardar">

      <input
        v-model="producto.nombre"
        class="form-control mb-2"
        placeholder="Nombre"
      >

      <input
        v-model.number="producto.precio"
        class="form-control mb-2"
        placeholder="Precio"
      >

      <input
        v-model="producto.categoria"
        class="form-control mb-2"
        placeholder="Categoría"
      >

      <input
        v-model="producto.imagen"
        class="form-control mb-2"
        placeholder="Imagen URL"
      >

      <textarea
        v-model="producto.descripcion"
        class="form-control mb-3"
        placeholder="Descripción"
      ></textarea>

      <button
        class="btn btn-success"
      >
        Guardar
      </button>

    </form>

  </div>

</div>

</template>

<script>

export default {

  name:'AdminPanel',

  data(){

    return{

      producto:{
        nombre:'',
        precio:0,
        categoria:'',
        imagen:'',
        descripcion:''
      }

    }

  },

  methods:{

    guardar(){

      this.$emit(
        'guardar-producto',
        this.producto
      )

      this.producto = {

        nombre:'',
        precio:0,
        categoria:'',
        imagen:'',
        descripcion:''

      }

    }

  }

}
</script>