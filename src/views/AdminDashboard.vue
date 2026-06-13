<template>
  <div class="admin-dashboard">

    <div class="alert-container">
      <AlertMessage ref="alertRef" :type="alertType" :message="alertMessage" />
    </div>

    <!-- Modal de confirmación personalizado -->
    <div v-if="showConfirmModal" class="confirm-modal-overlay" @click.self="closeConfirmModal">
      <div class="confirm-modal">
        <div class="confirm-modal-header" :class="confirmType">
          <div class="confirm-icon">
            <span v-if="confirmType === 'warning'">⚠️</span>
            <span v-if="confirmType === 'danger'">🗑️</span>
            <span v-if="confirmType === 'info'">ℹ️</span>
            <span v-if="confirmType === 'success'">✅</span>
          </div>
          <h3>{{ confirmTitle }}</h3>
        </div>
        <div class="confirm-modal-body" v-html="confirmMessage">
        </div>
        <div class="confirm-modal-footer">
          <button class="confirm-btn-cancel" @click="closeConfirmModal">
            {{ confirmCancelText }}
          </button>
          <button class="confirm-btn-confirm" :class="confirmType" @click="executeConfirmAction">
            {{ confirmConfirmText }}
          </button>
        </div>
      </div>
    </div>

    <div class="admin-header">
      <div class="header-left">
        <h1>🍔 Fast Food Bites Admin</h1>
        <p class="welcome-user">Bienvenido, <strong>{{ adminName }}</strong></p>
      </div>
      <div class="header-right">
        <button @click="logout" class="btn-logout">🚪 Cerrar Sesión</button>
      </div>
    </div>

    <div class="stats-cards">
      <div class="stat-card" :class="{ active: activeTab === 'products' }" @click="activeTab = 'products'">
        <div class="stat-icon">🍔</div>
        <div class="stat-info">
          <span class="stat-number">{{ products.length }}</span>
          <span class="stat-label">Productos</span>
        </div>
      </div>
      <div class="stat-card" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <span class="stat-number">{{ users.length }}</span>
          <span class="stat-label">Usuarios</span>
        </div>
      </div>
      <div class="stat-card" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">
        <div class="stat-icon">📦</div>
        <div class="stat-info">
          <span class="stat-number">{{ orders.length }}</span>
          <span class="stat-label">Pedidos</span>
        </div>
      </div>
      <div class="stat-card" :class="{ active: activeTab === 'messages' }" @click="activeTab = 'messages'">
        <div class="stat-icon">📬</div>
        <div class="stat-info">
          <span class="stat-number">{{ unreadMessagesCount }}</span>
          <span class="stat-label">Mensajes</span>
        </div>
      </div>
    </div>

    <!-- Sección de Productos -->
    <div v-if="activeTab === 'products'" class="content-card">
      <div class="section-title">
        <h2>📋 Gestión de Productos</h2>
        <button @click="openProductModal()" class="btn-add">+ Nuevo Producto</button>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Popular</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="id-cell">{{ product.id }}</td>
              <td><img :src="product.image" class="product-img"></td>
              <td class="product-name">{{ product.name }}</td>
              <td class="price-cell">${{ product.price.toLocaleString() }}</td>
              <td>{{ getCategoryName(product.category) }}</td>
              <td><span :class="['popular-badge', product.popular ? 'popular' : 'normal']">{{ product.popular ? 'Popular' : 'Normal' }}</span></td>
              <td>
                <div class="action-buttons">
                  <button @click="openProductModal(product)" class="btn-edit">Editar</button>
                  <button @click="deleteProduct(product.id)" class="btn-delete">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sección de Usuarios -->
    <div v-if="activeTab === 'users'" class="content-card">
      <div class="section-title">
        <h2>👥 Gestión de Usuarios</h2>
        <button @click="openUserModal()" class="btn-add">+ Nuevo Usuario</button>
      </div>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="id-cell">{{ user.id }}</td>
              <td class="user-name">{{ user.name }}</td>
              <td class="user-email">{{ user.email }}</td>
              <td><span :class="['role-badge', user.role === 'admin' ? 'admin' : 'user']">{{ user.role === 'admin' ? 'Administrador' : 'Usuario' }}</span></td>
              <td>
                <div class="action-buttons">
                  <button @click="openUserModal(user)" class="btn-edit">Editar</button>
                  <button @click="deleteUser(user.id)" class="btn-delete">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sección de Pedidos -->
    <div v-if="activeTab === 'orders'" class="content-card">
      <div class="section-title">
        <h2>📦 Gestión de Pedidos</h2>
        <button @click="exportOrders" class="btn-export">📊 Exportar Reporte</button>
        <button @click="loadOrders" class="btn-refresh" style="background:#17a2b8; margin-left:10px;">🔄 Refrescar</button>
      </div>
      <div class="table-wrapper">
        <div v-if="orders.length === 0" class="empty-orders" style="text-align:center; padding:40px;">
          <p>📭 No hay pedidos aún. Los pedidos aparecerán aquí cuando los usuarios realicen compras.</p>
        </div>
        <table class="data-table orders-table" v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="id-cell">#{{ order.id }}</td>
              <td>
                <div class="customer-info">
                  <strong>{{ order.customerName }}</strong>
                  <small>{{ order.customerEmail }}</small>
                </div>
              </td>
              <td>
                <div class="order-items">
                  <div v-for="(item, idx) in order.items" :key="idx" class="order-item">
                    <span class="item-qty">{{ item.cantidad }}x</span>
                    <span class="item-name">{{ item.nombre }}</span>
                    <span class="item-price">${{ (item.precio * item.cantidad).toLocaleString() }}</span>
                  </div>
                </div>
              </td>
              <td class="total-cell">${{ order.total.toLocaleString() }}</td>
              <td>
                <select :class="['status-badge', order.status]" v-model="order.status" @change="onStatusChange(order)">
                  <option value="pendiente">⏳ Pendiente</option>
                  <option value="preparando">🍳 Preparando</option>
                  <option value="enviado">🚚 Enviado</option>
                  <option value="entregado">✅ Entregado</option>
                  <option value="cancelado">❌ Cancelado</option>
                </select>
              </td>
              <td class="date-cell">{{ formatDate(order.createdAt) }}</td>
              <td>
                <div class="action-buttons">
                  <button @click="viewOrderDetails(order)" class="btn-edit">Ver</button>
                  <button @click="deleteOrder(order.id)" class="btn-delete">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="orders-summary" v-if="orders.length > 0">
        <div class="summary-card">
          <div class="summary-icon">📊</div>
          <div class="summary-info"><h4>Total Pedidos</h4><p>{{ orders.length }}</p></div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">💰</div>
          <div class="summary-info"><h4>Ingresos Totales</h4><p>${{ totalRevenue.toLocaleString() }}</p></div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">✅</div>
          <div class="summary-info"><h4>Entregados</h4><p>{{ deliveredOrders }}</p></div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">⏳</div>
          <div class="summary-info"><h4>Pendientes</h4><p>{{ pendingOrders }}</p></div>
        </div>
      </div>
    </div>

    <!-- Sección de Mensajes -->
    <div v-if="activeTab === 'messages'" class="content-card">
      <div class="section-title">
        <h2>📬 Bandeja de Mensajes</h2>
        <button @click="refreshMessages" class="btn-refresh" style="background:#17a2b8;">🔄 Refrescar</button>
      </div>
      <AdminMessages 
        ref="adminMessagesRef"
        @show-alert="showAlert"
        @show-confirm="showConfirm"
      />
    </div>

    <!-- Modal Producto -->
    <div v-if="showProductModal" class="modal" @click.self="closeProductModal">
      <div class="modal-content">
        <h3>{{ isEditingProduct ? 'Editar Producto' : 'Nuevo Producto' }}</h3>
        <form @submit.prevent="saveProduct">
          <div class="form-group"><label>Nombre:</label><input v-model="productForm.name" required></div>
          <div class="form-group"><label>Precio:</label><input type="number" v-model="productForm.price" required></div>
          <div class="form-group">
            <label>Categoría:</label>
            <select v-model="productForm.category">
              <option value="burgers">Hamburguesas</option>
              <option value="chicken">Pollo</option>
              <option value="hotdogs">Hotdogs</option>
              <option value="sides">Acompañamientos</option>
              <option value="bebidas">Bebidas</option>
            </select>
          </div>
          <div class="form-group"><label>Descripción:</label><textarea v-model="productForm.description"></textarea></div>
          <div class="form-group"><label>URL Imagen:</label><input v-model="productForm.image" placeholder="https://via.placeholder.com/150"></div>
          <div class="form-group"><label><input type="checkbox" v-model="productForm.popular"> Producto Popular</label></div>
          <div class="modal-buttons">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" @click="closeProductModal" class="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Usuario -->
    <div v-if="showUserModal" class="modal" @click.self="closeUserModal">
      <div class="modal-content">
        <h3>{{ isEditingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group"><label>Nombre:</label><input v-model="userForm.name" required></div>
          <div class="form-group"><label>Email:</label><input type="email" v-model="userForm.email" required></div>
          <div class="form-group"><label>Contraseña:</label><input type="password" v-model="userForm.password" :required="!isEditingUser"></div>
          <div class="form-group">
            <label>Rol:</label>
            <select v-model="userForm.role">
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" @click="closeUserModal" class="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Pedido -->
    <div v-if="showOrderModal" class="modal" @click.self="showOrderModal = false">
      <div class="modal-content">
        <h3>📋 Pedido #{{ selectedOrder?.id }}</h3>
        <div v-if="selectedOrder">
          <p><strong>👤 Cliente:</strong> {{ selectedOrder.customerName }}</p>
          <p><strong>📧 Email:</strong> {{ selectedOrder.customerEmail }}</p>
          <p><strong>💰 Total:</strong> ${{ selectedOrder.total?.toLocaleString() }}</p>
          <p><strong>📦 Estado:</strong> {{ selectedOrder.status }}</p>
          <p><strong>📅 Fecha:</strong> {{ formatDate(selectedOrder.createdAt) }}</p>
          <hr>
          <h4>🛒 Productos:</h4>
          <ul>
            <li v-for="(item, idx) in selectedOrder.items" :key="idx">
              {{ item.cantidad }}x {{ item.nombre }} — ${{ (item.precio * item.cantidad).toLocaleString() }}
            </li>
          </ul>
        </div>
        <div class="modal-buttons">
          <button @click="showOrderModal = false" class="btn-cancel">Cerrar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import AlertMessage from '../components/AlertMessage.vue'
import AdminMessages from '../components/AdminMessages.vue'
import { auth } from '../utils/auth'

const API_BASE = 'https://6a1aeb57bc2f94475492ce64.mockapi.io'

export default {
  name: 'AdminDashboard',
  components: { 
    AlertMessage,
    AdminMessages
  },
  data() {
    return {
      activeTab: 'products',
      products: [],
      users: [],
      orders: [],
      showProductModal: false,
      showUserModal: false,
      showOrderModal: false,
      selectedOrder: null,
      isEditingProduct: false,
      isEditingUser: false,
      currentAdminId: null,
      alertType: 'success',
      alertMessage: '',
      productForm: {
        id: null, name: '', price: 0, category: '', description: '', image: '', popular: false
      },
      userForm: {
        id: null, name: '', email: '', password: '', role: 'user'
      },
      showConfirmModal: false,
      confirmType: 'warning',
      confirmTitle: '',
      confirmMessage: '',
      confirmConfirmText: 'Aceptar',
      confirmCancelText: 'Cancelar',
      pendingAction: null,
      pendingActionData: null
    }
  },
  computed: {
    adminName() {
      return auth.getUserName() || 'Administrador'
    },
    totalRevenue() {
      return this.orders.reduce((sum, order) => sum + (order.total || 0), 0)
    },
    deliveredOrders() {
      return this.orders.filter(o => o.status === 'entregado').length
    },
    pendingOrders() {
      return this.orders.filter(o => o.status === 'pendiente' || o.status === 'preparando').length
    },
    unreadMessagesCount() {
      const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]')
      return messages.filter(m => !m.leido).length
    }
  },
  mounted() {
    const user = auth.getUser()
    const userRole = auth.getUserRole()
    
    if (!user || userRole !== 'admin') {
      this.$router.replace('/login')
      return
    }
    
    this.currentAdminId = user.id
    this.fetchProducts()
    this.fetchUsers()
    this.loadOrders()
  },
  methods: {
    showAlert(type, message) {
      this.alertType = type
      this.alertMessage = message
      this.$nextTick(() => this.$refs.alertRef?.show())
    },

    showConfirm(options) {
      this.confirmType = options.type || 'warning'
      this.confirmTitle = options.title || 'Confirmar'
      this.confirmMessage = options.message || '¿Estás seguro?'
      this.confirmConfirmText = options.confirmText || 'Sí, eliminar'
      this.confirmCancelText = options.cancelText || 'Cancelar'
      this.pendingAction = options.action
      this.pendingActionData = options.data
      this.showConfirmModal = true
    },
    
    closeConfirmModal() {
      this.showConfirmModal = false
      this.pendingAction = null
      this.pendingActionData = null
    },
    
    async executeConfirmAction() {
      if (this.pendingAction) {
        await this.pendingAction(this.pendingActionData)
      }
      this.closeConfirmModal()
    },

    getCategoryName(category) {
      const categories = {
        burgers: 'Hamburguesas', chicken: 'Pollo', hotdogs: 'Hotdogs',
        sides: 'Acompañamientos', bebidas: 'Bebidas'
      }
      return categories[category] || category
    },

    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleString('es-CO')
    },

    loadOrders() {
      const saved = localStorage.getItem('orders')
      this.orders = saved ? JSON.parse(saved) : []
    },

    saveOrders() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    },

    onStatusChange(order) {
      this.saveOrders()
      this.showAlert('success', `Estado del pedido #${order.id} actualizado a "${order.status}".`)
    },

    async fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE}/products`)
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
        this.showAlert('danger', 'Error al cargar los productos.')
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get(`${API_BASE}/users`)
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
        this.showAlert('danger', 'Error al cargar los usuarios.')
      }
    },

    openProductModal(product = null) {
      if (product) {
        this.isEditingProduct = true
        this.productForm = { ...product }
      } else {
        this.isEditingProduct = false
        this.productForm = { id: null, name: '', price: 0, category: '', description: '', image: '', popular: false }
      }
      this.showProductModal = true
    },

    openUserModal(user = null) {
      if (user) {
        this.isEditingUser = true
        this.userForm = { ...user, password: '' }
      } else {
        this.isEditingUser = false
        this.userForm = { id: null, name: '', email: '', password: '', role: 'user' }
      }
      this.showUserModal = true
    },

    async saveProduct() {
      try {
        const productData = {
          name: this.productForm.name,
          price: Number(this.productForm.price),
          category: this.productForm.category,
          description: this.productForm.description,
          image: this.productForm.image || 'https://via.placeholder.com/150',
          popular: Boolean(this.productForm.popular)
        }

        if (this.isEditingProduct) {
          await axios.put(`${API_BASE}/products/${this.productForm.id}`, productData)
          this.showAlert('success', `✅ Producto "${productData.name}" actualizado correctamente.`)
        } else {
          await axios.post(`${API_BASE}/products`, productData)
          this.showAlert('success', `✅ Producto "${productData.name}" creado correctamente.`)
        }
        this.closeProductModal()
        await this.fetchProducts()
      } catch (error) {
        console.error('Error saving product:', error)
        this.showAlert('danger', 'Error al guardar el producto. Inténtalo de nuevo.')
      }
    },

    async saveUser() {
      try {
        const userData = { ...this.userForm }

        if (!this.isEditingUser && !userData.password) {
          this.showAlert('warning', 'La contraseña es requerida para crear un usuario.')
          return
        }

        if (!this.isEditingUser) {
          delete userData.id
        } else {
          if (!userData.password) delete userData.password
        }

        if (this.isEditingUser) {
          await axios.put(`${API_BASE}/users/${this.userForm.id}`, userData)
          this.showAlert('success', `✅ Usuario "${userData.name}" actualizado correctamente.`)
        } else {
          await axios.post(`${API_BASE}/users`, userData)
          this.showAlert('success', `✅ Usuario "${userData.name}" creado correctamente.`)
        }
        this.closeUserModal()
        await this.fetchUsers()
      } catch (error) {
        console.error('Error saving user:', error)
        this.showAlert('danger', 'Error al guardar el usuario. Inténtalo de nuevo.')
      }
    },

    async deleteProduct(id) {
      const product = this.products.find(p => p.id === id)
      
      this.showConfirm({
        type: 'danger',
        title: '¿Eliminar producto?',
        message: `Estás a punto de eliminar <strong>${product?.name || 'este producto'}</strong>`,
        confirmText: 'Sí, eliminar',
        action: async (productId) => {
          try {
            await axios.delete(`${API_BASE}/products/${productId}`)
            this.showAlert('warning', '🗑️ Producto eliminado correctamente.')
            await this.fetchProducts()
          } catch (error) {
            console.error('Error deleting product:', error)
            this.showAlert('danger', 'Error al eliminar el producto.')
          }
        },
        data: id
      })
    },

    async deleteUser(id) {
      const currentUser = auth.getUser()
      const user = this.users.find(u => u.id === id)
      
      if (id === currentUser?.id) {
        this.showAlert('danger', '⚠️ No puedes eliminar tu propio usuario.')
        return
      }
      
      this.showConfirm({
        type: 'danger',
        title: '¿Eliminar usuario?',
        message: `Estás a punto de eliminar a <strong>${user?.name || 'este usuario'}</strong>`,
        confirmText: 'Sí, eliminar',
        action: async (userId) => {
          try {
            await axios.delete(`${API_BASE}/users/${userId}`)
            this.showAlert('warning', '🗑️ Usuario eliminado correctamente.')
            await this.fetchUsers()
          } catch (error) {
            console.error('Error deleting user:', error)
            this.showAlert('danger', 'Error al eliminar el usuario.')
          }
        },
        data: id
      })
    },

    deleteOrder(id) {
      const order = this.orders.find(o => o.id === id)
      
      this.showConfirm({
        type: 'danger',
        title: '¿Eliminar pedido?',
        message: `
          <div style="text-align: left;">
            <p>Estás a punto de eliminar el pedido <strong>#${id}</strong></p>
            <p><strong>Cliente:</strong> ${order?.customerName}</p>
            <p><strong>Total:</strong> $${order?.total?.toLocaleString()}</p>
          </div>
        `,
        confirmText: 'Sí, eliminar',
        action: (orderId) => {
          this.orders = this.orders.filter(order => order.id !== orderId)
          this.saveOrders()
          this.showAlert('warning', '🗑️ Pedido eliminado correctamente.')
        },
        data: id
      })
    },

    viewOrderDetails(order) {
      this.selectedOrder = order
      this.showOrderModal = true
    },

    exportOrders() {
      const report = {
        fecha: new Date().toISOString(),
        totalPedidos: this.orders.length,
        ingresosTotales: this.totalRevenue,
        pedidos: this.orders
      }
      const dataStr = JSON.stringify(report, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', `reporte_pedidos_${Date.now()}.json`)
      linkElement.click()
      this.showAlert('primary', '📊 Reporte exportado correctamente.')
    },

    refreshMessages() {
      if (this.$refs.adminMessagesRef) {
        this.$refs.adminMessagesRef.cargarMensajes()
      }
      this.showAlert('success', '📬 Mensajes actualizados.')
    },

    closeProductModal() { this.showProductModal = false },
    closeUserModal() { this.showUserModal = false },

    logout() {
      auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.alert-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 90%;
  max-width: 520px;
}
</style>