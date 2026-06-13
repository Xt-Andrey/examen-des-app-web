# 🍔 Fast Food Bites

## Sistema Web de Gestión para Restaurante de Comida Rápida

### Desarrollo de Aplicaciones Web

---

## 📖 Descripción del Proyecto

**Fast Food Bites** es una aplicación web desarrollada con **Vue.js 3** que permite gestionar de manera digital un restaurante de comida rápida. El sistema ofrece funcionalidades para clientes y administradores, incluyendo autenticación, gestión de productos, pedidos, usuarios y un carrito de compras completamente funcional.

La aplicación fue diseñada siguiendo una arquitectura modular basada en componentes reutilizables, navegación mediante Vue Router y persistencia de datos utilizando LocalStorage y MockAPI.

---

## 🎯 Objetivo General

Desarrollar una aplicación web dinámica utilizando Vue.js, aplicando conceptos de programación modular, componentes reutilizables, navegación SPA y gestión de datos mediante servicios externos.

### Objetivos Específicos

* Implementar autenticación de usuarios.
* Crear un CRUD completo para productos.
* Gestionar usuarios mediante un panel administrativo.
* Administrar pedidos y estados de entrega.
* Implementar un carrito de compras funcional.
* Utilizar Vue Router para la navegación.
* Aplicar diseño responsivo con Bootstrap.
* Consumir servicios externos mediante Axios.

---

## 🏪 Información del Negocio

**Nombre:** Fast Food Bites

**Tipo:** Restaurante de comida rápida premium.

### Servicios Ofrecidos

* Venta de hamburguesas
* Perros calientes
* Papas fritas
* Bebidas
* Combos promocionales

---

## 🎨 Identidad Visual

| Elemento   | Color   |
| ---------- | ------- |
| Principal  | #FF6B35 |
| Secundario | #FFFFFF |
| Texto      | #1A1A2E |

---

## ⚙️ Funcionalidades del Sistema

### 👤 Usuarios

* Registro de nuevos usuarios.
* Inicio de sesión.
* Cierre de sesión.
* Gestión de perfil.

### 🛒 Carrito de Compras

* Agregar productos.
* Modificar cantidades.
* Eliminar productos.
* Vaciar carrito.
* Calcular total automáticamente.
* Finalizar compra.

### 📦 Gestión de Productos

* Crear productos.
* Consultar productos.
* Actualizar productos.
* Eliminar productos.
* Marcar productos populares.

### 👥 Gestión de Usuarios

* Crear usuarios.
* Editar usuarios.
* Eliminar usuarios.
* Asignar roles.

### 📋 Gestión de Pedidos

* Consultar pedidos.
* Ver detalles.
* Cambiar estados.
* Eliminar pedidos.
* Exportar información.

---

## 🔐 Sistema de Roles

### Administrador

Tiene acceso a:

* Gestión de productos.
* Gestión de usuarios.
* Gestión de pedidos.
* Estadísticas del sistema.

### Usuario

Puede:

* Navegar por el catálogo.
* Agregar productos al carrito.
* Realizar pedidos.
* Consultar información del restaurante.

---

# 📂 Estructura del Proyecto

```bash
Examen-des-app-web/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── css/
│   │        ├── Styles.css (archivo principal que importa todos)
│   │        ├── components/
│   │        │     ├── Header.css
│   │        │     ├── Footer.css
│   │        │     ├── Sidebar.css
│   │        │     ├── ProductCard.css
│   │        │     ├── Cart.css
│   │        │     ├── AdminPanel.css
│   │        │     ├── ConfirmModal.css
│   │        │     ├── ContactForm.css
│   │        │     └── AdminMessages.css
│   │        ├── views/
│   │        │     ├── Auth.css
│   │        │     ├── Home.css
│   │        │     └── AdminDashboard.css
│   │        └── utils/
│   │              └── variables.css (variables globales)
│   │
│   ├── utils
│   │   └── auth.js
│   │
│   ├── components/
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Sidebar.css
│   │   ├── ProductCard.css
│   │   ├── Cart.css
│   │   ├── AdminPanel.css
│   │   ├── ConfirmModal.css
│   │   ├── ContactForm.css
│   │   └── AdminMessages.css
│   │
│   ├── router/
│   │   └── Index.js
│   │
│   ├─── services
│   │   ├── products.js
│   │   └── users.js
│   │
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AdminDashboard.vue
│   │   ├── RegisterView.vue
│   │   └── LoginView.vue
│   │
│   ├── App.vue
│   └── main.js
│   
├── package.json
├── babel.config.js
├── vue.config.js
└── README.md
```

---

## 🧩 Componentes Reutilizables

### Header.vue

Encabezado principal de la aplicación.

### Footer.vue

Información institucional y de contacto.

### ProductCard.vue

Visualización de productos.

### Cart.vue

Administración del carrito de compras.

### Sidebar.vue

Navegación lateral del panel administrativo.

### ContactForm.vue

Formulario de contacto.

### AdminPanel.vue

Gestión de productos por parte del administrador.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología      | Uso                |
| --------------- | ------------------ |
| Vue.js 3        | Framework Frontend |
| Vue Router      | Navegación         |
| Bootstrap 5     | Diseño responsivo  |
| Axios           | Consumo de APIs    |
| JavaScript ES6+ | Lógica             |
| HTML5           | Estructura         |
| CSS3            | Estilos            |

---

## 📦 Dependencias

```json
{
  "axios": "^1.6.0",
  "bootstrap": "^5.3.0",
  "vue": "^3.3.0",
  "vue-router": "^4.2.0"
}
```

---

## 🚀 Instalación

### Clonar el repositorio

```bash
git clone https://github.com/Xt-Andrey/segundo-parcial-des-app-web.git
```

### Ingresar al proyecto

```bash
cd segundo-parcial-des-app-web
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar servidor local

```bash
npm run serve
```

### Generar versión de producción

```bash
npm run build
```

---

## 🔑 Credenciales de Prueba

### Administrador

Correo:

```text
Nico.Cummings92@yahoo.com
```

Contraseña:

```text
gLz714f8Ocm4s7W
```

### Usuario

Correo:

```text
Alyson.Gottlieb3@yahoo.com
```

Contraseña:

```text
0OsrkDfqM9ciMcC
```

---

## 📈 Buenas Prácticas Aplicadas

* Modularización del código.
* Componentes reutilizables.
* Separación de responsabilidades.
* Navegación mediante SPA.
* Persistencia de datos.
* Organización escalable de carpetas.
* Uso de Git y GitHub para control de versiones.

---

## 👨‍💻 Integrantes

| Nombre                      | Código  |
| --------------------------- | ------- |
| RUBIEL ANDREY GALVIS GALVIS | 0192483 |
| ARNOLD CLARO                | 0192493 |

---

## 🔗 Repositorio

Repositorio oficial:

https://github.com/Xt-Andrey/segundo-parcial-des-app-web

---

## 📚 Referencias

* Vue.js Documentation
* Vue Router Documentation
* Bootstrap Documentation
* Axios Documentation
* MDN Web Docs
* MockAPI

---

## 📌 Conclusiones

El desarrollo de Fast Food Bites permitió aplicar conocimientos fundamentales de Vue.js y desarrollo web moderno mediante la construcción de una aplicación SPA completamente funcional.

Durante el proyecto se implementaron componentes reutilizables, rutas dinámicas, autenticación de usuarios, gestión de productos, pedidos y usuarios, además de un diseño adaptable a diferentes dispositivos.

La experiencia fortaleció competencias relacionadas con el trabajo colaborativo, control de versiones, consumo de APIs REST y organización profesional de proyectos frontend.

---

**Fast Food Bites 🍔🔥**

Proyecto académico desarrollado para la asignatura de Desarrollo de Aplicaciones Web.
