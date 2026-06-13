<template>
  <section id="contacto" class="contact-section">
    <div class="contact-container">
      <h2 class="contact-title">Contacto</h2>

      <div class="contact-alert">
        <AlertMessage ref="contactAlertRef" :type="contactAlertType" :message="contactAlertMessage" />
      </div>

      <form @submit.prevent="enviarMensaje">
        <div class="form-group">
          <label>Nombre</label>
          <input 
            type="text" 
            v-model="form.nombre" 
            placeholder="Nombre"
          >
        </div>

        <div class="form-group">
          <label>Correo</label>
          <input 
            type="email" 
            v-model="form.email" 
            placeholder="Correo"
          >
        </div>

        <div class="form-group">
          <label>Mensaje</label>
          <textarea 
            v-model="form.mensaje" 
            rows="4" 
            placeholder="Mensaje"
          ></textarea>
        </div>

        <button 
          type="submit" 
          class="btn-submit" 
          :disabled="enviando"
        >
          {{ enviando ? 'Enviando...' : 'Enviar' }}
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import AlertMessage from './AlertMessage.vue'

export default {
  name: 'ContactForm',
  components: {
    AlertMessage
  },
  data() {
    return {
      form: {
        nombre: '',
        email: '',
        mensaje: ''
      },
      enviando: false,
      contactAlertType: 'success',
      contactAlertMessage: ''
    }
  },
  methods: {
    showAlert(type, message) {
      this.contactAlertType = type
      this.contactAlertMessage = message
      this.$nextTick(() => {
        if (this.$refs.contactAlertRef) {
          this.$refs.contactAlertRef.show()
        }
      })
    },

    async enviarMensaje() {
      if (!this.form.nombre.trim()) {
        this.showAlert('warning', 'Por favor ingresa tu nombre.')
        return
      }

      if (!this.form.email.trim()) {
        this.showAlert('warning', 'Por favor ingresa tu correo electrónico.')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.showAlert('warning', 'Por favor ingresa un correo electrónico válido.')
        return
      }

      if (!this.form.mensaje.trim()) {
        this.showAlert('warning', 'Por favor escribe tu mensaje.')
        return
      }

      this.enviando = true

      try {
        const mensajes = JSON.parse(localStorage.getItem('contact_messages') || '[]')
        
        const nuevoMensaje = {
          id: Date.now(),
          nombre: this.form.nombre,
          email: this.form.email,
          mensaje: this.form.mensaje,
          fecha: new Date().toLocaleString('es-CO'),
          leido: false
        }
        
        mensajes.unshift(nuevoMensaje)
        localStorage.setItem('contact_messages', JSON.stringify(mensajes))

        this.form = {
          nombre: '',
          email: '',
          mensaje: ''
        }

        this.showAlert('success', '✅ ¡Mensaje enviado con éxito!')
        
        setTimeout(() => {
          if (this.$refs.contactAlertRef) {
            this.$refs.contactAlertRef.close()
          }
        }, 3000)

      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        this.showAlert('danger', '❌ Error al enviar el mensaje.')
      } finally {
        this.enviando = false
      }
    }
  }
}
</script>