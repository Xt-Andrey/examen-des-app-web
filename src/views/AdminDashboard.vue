<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <h1>Panel de Administración</h1>
      <div class="admin-info">
        <span>Bienvenido, {{ adminName }}</span>
        <button @click="logout" class="btn-logout">Cerrar Sesión</button>
      </div>
    </div>

    <div class="tabs">
      <button 
        :class="['tab-btn', { active: activeTab === 'products' }]"
        @click="activeTab = 'products'"
      >
        Productos ({{ products.length }})
      </button>
      <button 
        :class="['tab-btn', { active: activeTab === 'users' }]"
        @click="activeTab = 'users'"
      >
        Usuarios ({{ users.length }})
      </button>
    </div>

    <!-- Products Section -->
    <div v-if="activeTab === 'products'" class="section">
      <div class="section-header">
        <h2>Gestión de Productos</h2>
        <button @click="openProductModal()" class="btn-add">
          + Nuevo Producto
        </button>
      </div>

      <div v-if="loading" class="alert alert-info">
        Cargando productos...
      </div>

      <div class="table-container" v-if="!loading">
        <table class="products-table">
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
              <td>{{ product.id }}</td>
              <td>
                <img :src="product.image" :alt="product.name" class="product-img">
              </td>
              <td>{{ product.name }}</td>
              <td>${{ product.price }}</td>
              <td>{{ getCategoryName(product.category) }}</td>
              <td>
                <span :class="['badge', product.popular ? 'badge-success' : 'badge-secondary']">
                  {{ product.popular ? 'Popular' : 'Normal' }}
                </span>
              </td>
              <td>
                <button @click="openProductModal(product)" class="btn-edit">Editar</button>
                <button @click="deleteProduct(product.id)" class="btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Users Section -->
    <div v-if="activeTab === 'users'" class="section">
      <div class="section-header">
        <h2>Gestión de Usuarios</h2>
        <button @click="openUserModal()" class="btn-add">
          + Nuevo Usuario
        </button>
      </div>

      <div class="table-container">
        <table class="users-table">
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
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['badge', user.role === 'admin' ? 'badge-danger' : 'badge-info']">
                  {{ user.role === 'admin' ? 'Administrador' : 'Usuario' }}
                </span>
              </td>
              <td>
                <button @click="openUserModal(user)" class="btn-edit">Editar</button>
                <button @click="deleteUser(user.id)" class="btn-delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Modal -->
    <div v-if="showProductModal" class="modal">
      <div class="modal-content">
        <h3>{{ isEditingProduct ? 'Editar Producto' : 'Nuevo Producto' }}</h3>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label>Nombre:</label>
            <input v-model="productForm.name" required>
          </div>
          <div class="form-group">
            <label>Precio:</label>
            <input type="number" v-model="productForm.price" required>
          </div>
          <div class="form-group">
            <label>Categoría:</label>
            <select v-model="productForm.category" required>
              <option value="">Seleccione una categoría</option>
              <option value="burgers">🍔 Hamburguesas</option>
              <option value="chicken">🍗 Pollo</option>
              <option value="hotdogs">🌭 Hotdogs</option>
              <option value="sides">🍟 Acompañamientos</option>
              <option value="bebidas">🥤 Bebidas</option>
            </select>
          </div>
          <div class="form-group">
            <label>Descripción:</label>
            <textarea v-model="productForm.description" required></textarea>
          </div>
          <div class="form-group">
            <label>URL de Imagen:</label>
            <input v-model="productForm.image" placeholder="https://via.placeholder.com/150">
          </div>
          <div class="form-group">
            <label>
              <input type="checkbox" v-model="productForm.popular">
              Producto Popular
            </label>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="btn-save">Guardar</button>
            <button type="button" @click="closeProductModal" class="btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- User Modal -->
    <div v-if="showUserModal" class="modal">
      <div class="modal-content">
        <h3>{{ isEditingUser ? 'Editar Usuario' : 'Nuevo Usuario' }}</h3>
        <form @submit.prevent="saveUser">
          <div class="form-group">
            <label>Nombre:</label>
            <input v-model="userForm.name" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" v-model="userForm.email" required>
          </div>
          <div class="form-group">
            <label>Contraseña:</label>
            <input type="password" v-model="userForm.password" :required="!isEditingUser">
          </div>
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
  </div>
</template>

<script>
import axios from 'axios'

// ✅ URL CORRECTA - la que aparece en tu MockAPI
const API_BASE = 'https://6a1aeb57bc2f94475492ce64.mockapi.io'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeTab: 'products',
      products: [],
      users: [],
      showProductModal: false,
      showUserModal: false,
      isEditingProduct: false,
      isEditingUser: false,
      currentAdminId: null,
      loading: false,
      productForm: {
        id: null,
        name: '',
        price: 0,
        category: '',
        description: '',
        image: '',
        popular: false
      },
      userForm: {
        id: null,
        name: '',
        email: '',
        password: '',
        role: 'user'
      }
    }
  },
  computed: {
    adminName() {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.name || 'Administrador'
    }
  },
  async mounted() {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    this.currentAdminId = currentUser.id
    
    console.log('API URL:', API_BASE)
    await this.fetchProducts()
    await this.fetchUsers()
  },
  methods: {
    getCategoryName(category) {
      const categories = {
        'burgers': '🍔 Hamburguesas',
        'chicken': '🍗 Pollo',
        'hotdogs': '🌭 Hotdogs',
        'sides': '🍟 Acompañamientos',
        'bebidas': '🥤 Bebidas'
      }
      return categories[category] || category
    },
    async fetchProducts() {
      this.loading = true
      try {
        const response = await axios.get(`${API_BASE}/products`)
        this.products = response.data
        console.log('✅ Productos cargados:', this.products.length)
        console.log('Productos:', this.products)
      } catch (error) {
        console.error('❌ Error fetching products:', error)
        alert('Error al cargar productos: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get(`${API_BASE}/users`)
        this.users = response.data
        console.log('✅ Usuarios cargados:', this.users.length)
      } catch (error) {
        console.error('❌ Error fetching users:', error)
        alert('Error al cargar usuarios')
      }
    },
    openProductModal(product = null) {
      if (product) {
        this.isEditingProduct = true
        this.productForm = { ...product }
      } else {
        this.isEditingProduct = false
        this.productForm = {
          id: null,
          name: '',
          price: 0,
          category: '',
          description: '',
          image: '',
          popular: false
        }
      }
      this.showProductModal = true
    },
    openUserModal(user = null) {
      if (user) {
        this.isEditingUser = true
        this.userForm = { ...user, password: '' }
      } else {
        this.isEditingUser = false
        this.userForm = {
          id: null,
          name: '',
          email: '',
          password: '',
          role: 'user'
        }
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
        
        console.log('Guardando producto:', productData)
        
        if (this.isEditingProduct) {
          await axios.put(`${API_BASE}/products/${this.productForm.id}`, productData)
          alert('✅ Producto actualizado exitosamente')
        } else {
          await axios.post(`${API_BASE}/products`, productData)
          alert('✅ Producto creado exitosamente')
        }
        this.closeProductModal()
        await this.fetchProducts()
      } catch (error) {
        console.error('❌ Error saving product:', error)
        alert('Error al guardar producto: ' + (error.response?.data?.message || error.message))
      }
    },
    async saveUser() {
      try {
        const userData = { ...this.userForm }
        if (!this.isEditingUser) {
          if (!userData.password) {
            alert('La contraseña es requerida')
            return
          }
        } else {
          if (!userData.password) {
            delete userData.password
          }
        }
        
        if (this.isEditingUser) {
          await axios.put(`${API_BASE}/users/${this.userForm.id}`, userData)
          alert('✅ Usuario actualizado exitosamente')
        } else {
          await axios.post(`${API_BASE}/users`, userData)
          alert('✅ Usuario creado exitosamente')
        }
        this.closeUserModal()
        await this.fetchUsers()
      } catch (error) {
        console.error('❌ Error saving user:', error)
        alert('Error al guardar usuario')
      }
    },
    async deleteProduct(id) {
      if (confirm('¿Estás seguro de eliminar este producto?')) {
        try {
          await axios.delete(`${API_BASE}/products/${id}`)
          alert('✅ Producto eliminado exitosamente')
          await this.fetchProducts()
        } catch (error) {
          console.error('❌ Error deleting product:', error)
          alert('Error al eliminar producto')
        }
      }
    },
    async deleteUser(id) {
      if (id === this.currentAdminId) {
        alert('⚠️ No puedes eliminar tu propio usuario')
        return
      }
      
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        try {
          await axios.delete(`${API_BASE}/users/${id}`)
          alert('✅ Usuario eliminado exitosamente')
          await this.fetchUsers()
        } catch (error) {
          console.error('❌ Error deleting user:', error)
          alert('Error al eliminar usuario')
        }
      }
    },
    closeProductModal() {
      this.showProductModal = false
      this.isEditingProduct = false
      this.productForm = {
        id: null,
        name: '',
        price: 0,
        category: '',
        description: '',
        image: '',
        popular: false
      }
    },
    closeUserModal() {
      this.showUserModal = false
      this.isEditingUser = false
      this.userForm = {
        id: null,
        name: '',
        email: '',
        password: '',
        role: 'user'
      }
    },
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>