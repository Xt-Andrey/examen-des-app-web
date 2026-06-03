const API_URL = 'https://6a1aeb57bc2f94475492ce64.mockapi.io/users'

export async function getUsers() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Error al obtener usuarios')
  }

  const users = await response.json()
  
  // Asegurar que cada usuario tenga un rol
  return users.map(user => ({
    ...user,
    role: user.role || 'user' // Si no tiene role, asignar 'user'
  }))
}

export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    throw new Error('Error al crear usuario')
  }

  return await response.json()
}

export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar usuario')
  }

  return await response.json()
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error al eliminar usuario')
  }

  return await response.json()
}