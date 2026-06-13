<template>
  <div class="admin-messages">
    <div class="messages-header">
      <h2>📬 Mensajes de Contacto</h2>
      <button @click="exportMessages" class="btn-export">
        📊 Exportar a JSON
      </button>
    </div>

    <div v-if="cargando" class="loading-messages">
      <div class="spinner"></div>
      <p>Cargando mensajes...</p>
    </div>

    <div v-else-if="mensajes.length === 0" class="empty-messages">
      <span class="empty-icon">📭</span>
      <p>No hay mensajes aún. Los mensajes aparecerán aquí cuando los usuarios envíen el formulario de contacto.</p>
    </div>

    <div v-else class="messages-list">
      <div 
        v-for="msg in mensajes" 
        :key="msg.id" 
        class="message-card" 
        :class="{ leido: msg.leido }"
      >
        <div class="message-header">
          <div class="message-sender">
            <strong>{{ msg.nombre }}</strong>
            <span class="email">✉️ {{ msg.email }}</span>
            <span v-if="msg.telefono && msg.telefono !== 'No especificado'" class="phone">
              📱 {{ msg.telefono }}
            </span>
          </div>
          <div class="message-date">
            📅 {{ msg.fecha }}
          </div>
        </div>
        
        <div class="message-body">
          <p>{{ msg.mensaje }}</p>
        </div>
        
        <div class="message-actions">
          <button @click="marcarLeido(msg.id)" class="btn-read">
            {{ msg.leido ? '✅ Ya leído' : '📖 Marcar como leído' }}
          </button>
          <button @click="eliminarMensaje(msg.id)" class="btn-delete">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>

    <div class="messages-stats" v-if="mensajes.length > 0">
      <div class="stat">
        <span class="stat-value">{{ mensajes.length }}</span>
        <span class="stat-label">Total mensajes</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ noLeidos }}</span>
        <span class="stat-label">No leídos</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ leidos }}</span>
        <span class="stat-label">Leídos</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminMessages',
  data() {
    return {
      mensajes: [],
      cargando: true
    }
  },
  computed: {
    noLeidos() {
      return this.mensajes.filter(m => !m.leido).length
    },
    leidos() {
      return this.mensajes.filter(m => m.leido).length
    }
  },
  mounted() {
    this.cargarMensajes()
  },
  methods: {
    cargarMensajes() {
      this.cargando = true
      try {
        const saved = localStorage.getItem('contact_messages')
        this.mensajes = saved ? JSON.parse(saved) : []
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
        this.mensajes = []
      } finally {
        this.cargando = false
      }
    },
    
    guardarMensajes() {
      localStorage.setItem('contact_messages', JSON.stringify(this.mensajes))
    },
    
    marcarLeido(id) {
      const msg = this.mensajes.find(m => m.id === id)
      if (msg) {
        msg.leido = !msg.leido
        this.guardarMensajes()
        this.$emit('show-alert', 'success', `Mensaje marcado como ${msg.leido ? 'leído' : 'no leído'}`)
      }
    },
    
    eliminarMensaje(id) {
      const msg = this.mensajes.find(m => m.id === id)
      
      this.$emit('show-confirm', {
        type: 'danger',
        title: '🗑️ Eliminar mensaje',
        message: `
          <div style="text-align: left;">
            <p><strong>De:</strong> ${msg?.nombre}</p>
            <p><strong>Email:</strong> ${msg?.email}</p>
            <p><strong>Mensaje:</strong> ${msg?.mensaje?.substring(0, 80)}${msg?.mensaje?.length > 80 ? '...' : ''}</p>
            <hr>
            <p style="color: #dc3545;">¿Estás seguro? Esta acción no se puede deshacer.</p>
          </div>
        `,
        confirmText: 'Sí, eliminar',
        cancelText: 'Cancelar',
        action: () => {
          this.mensajes = this.mensajes.filter(m => m.id !== id)
          this.guardarMensajes()
          this.$emit('show-alert', 'warning', '🗑️ Mensaje eliminado correctamente.')
        }
      })
    },
    
    exportMessages() {
      const report = {
        fecha_exportacion: new Date().toLocaleString('es-CO'),
        total_mensajes: this.mensajes.length,
        mensajes_no_leidos: this.noLeidos,
        mensajes_leidos: this.leidos,
        mensajes: this.mensajes
      }
      
      const dataStr = JSON.stringify(report, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', `mensajes_contacto_${Date.now()}.json`)
      linkElement.click()
      
      this.$emit('show-alert', 'success', '📊 Reporte exportado correctamente.')
    }
  }
}
</script>