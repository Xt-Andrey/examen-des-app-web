const API_URL = 'https://6a1aeb57bc2f94475492ce64.mockapi.io/products'

export async function getProducts() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Error al obtener productos')
  }

  return await response.json()
}

export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  })

  if (!response.ok) {
    throw new Error('Error al crear producto')
  }

  return await response.json()
}

export async function updateProduct(id, productData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData)
  })

  if (!response.ok) {
    throw new Error('Error al actualizar producto')
  }

  return await response.json()
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error('Error al eliminar producto')
  }

  return await response.json()
}