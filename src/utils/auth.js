// src/utils/auth.js

const STORAGE_KEYS = {
  USER: 'fastfood_user',
  USER_ROLE: 'fastfood_user_role',
  USER_EMAIL: 'fastfood_user_email',
  USER_NAME: 'fastfood_user_name'
}

export const auth = {
  isAuthenticated() {
    return !!localStorage.getItem(STORAGE_KEYS.USER)
  },
  
  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },
  
  getUserRole() {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE)
  },
  
  getUserEmail() {
    return localStorage.getItem(STORAGE_KEYS.USER_EMAIL)
  },
  
  getUserName() {
    return localStorage.getItem(STORAGE_KEYS.USER_NAME)
  },
  
  login(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, user.role)
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, user.email)
    localStorage.setItem(STORAGE_KEYS.USER_NAME, user.name)
  },
  
  logout() {
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE)
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL)
    localStorage.removeItem(STORAGE_KEYS.USER_NAME)
  },
  
  // Sincronizar entre pestañas (buena práctica para mantener coherencia)
  onAuthChange(callback) {
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEYS.USER) {
        callback(!!event.newValue)
      }
    })
  }
}