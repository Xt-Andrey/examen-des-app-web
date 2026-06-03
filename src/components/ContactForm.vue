<template>

<section
  id="contacto"
  class="container my-5"
>

  <h2>
    Contacto
  </h2>

  <form>

    <input
      type="text"
      class="form-control mb-3"
      placeholder="Nombre"
    >

    <input
      type="email"
      class="form-control mb-3"
      placeholder="Correo"
    >

    <textarea
      class="form-control mb-3"
      rows="4"
      placeholder="Mensaje"
    ></textarea>

    <button
      class="btn btn-warning"
      type="button"
    >
      Enviar
    </button>

  </form>

</section>

</template>

<script>
export default {
  name:'ContactForm'
}
</script>