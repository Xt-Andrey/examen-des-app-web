<div align="center">

# 🍔 Fast Food Bites

**Sistema Web de Gestión para Restaurante de Comida Rápida**

![Vue.js](https://img.shields.io/badge/Vue.js-3.3.0-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.0-5A29E4?style=flat&logo=axios&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

*Desarrollo de Aplicaciones Web*

[📋 Ver Demo](#-instalación-y-ejecución) · [🐛 Reportar Bug](https://github.com/Xt-Andrey/segundo-parcial-des-app-web/issues) · [📂 Repositorio](https://github.com/Xt-Andrey/segundo-parcial-des-app-web)

</div>

---

## 📖 Descripción del Proyecto

**Fast Food Bites** es una aplicación web desarrollada con **Vue.js 3** que permite gestionar de manera digital un restaurante de comida rápida. El sistema ofrece funcionalidades para clientes y administradores, incluyendo autenticación, gestión de productos, pedidos, usuarios y un carrito de compras completamente funcional.

La aplicación fue diseñada siguiendo una arquitectura modular basada en componentes reutilizables, navegación mediante Vue Router y persistencia de datos utilizando LocalStorage y MockAPI.

---

## 📖 Tabla de Contenido

- [Objetivos](#-objetivos)
- [Información del Negocio](#-información-del-negocio)
- [Identidad Visual](#-identidad-visual)
- [Funcionalidades del Sistema](#-funcionalidades-del-sistema)
- [Sistema de Roles](#-sistema-de-roles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes Principales](#-componentes-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Dependencias](#-dependencias)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [API Externa](#-api-externa)
- [Persistencia de Datos](#-persistencia-de-datos)
- [Buenas Prácticas Aplicadas](#-buenas-prácticas-aplicadas)
- [Mejoras Implementadas](#-mejoras-implementadas)
- [Problemas Encontrados y Soluciones](#-problemas-encontrados-y-soluciones)
- [Integrantes](#-integrantes)
- [Referencias](#-referencias)
- [Conclusiones](#-conclusiones)

---

## 🎯 Objetivos

### Objetivo General

Desarrollar una aplicación web dinámica utilizando Vue.js, aplicando conceptos de programación modular, componentes reutilizables, navegación SPA y gestión de datos mediante servicios externos.

### Objetivos Específicos

- Implementar autenticación de usuarios.
- Crear un CRUD completo para productos.
- Gestionar usuarios mediante un panel administrativo.
- Administrar pedidos y estados de entrega.
- Implementar un carrito de compras funcional.
- Utilizar Vue Router para la navegación.
- Aplicar diseño responsivo con Bootstrap.
- Consumir servicios externos mediante Axios.

---

## 🏪 Información del Negocio

| Campo | Valor |
|-------|-------|
| **Nombre** | Fast Food Bites |
| **Tipo** | Restaurante de comida rápida premium |
| **Ubicación** | Ocaña, Norte de Santander |

### Servicios Ofrecidos

- 🍔 Hamburguesas artesanales
- 🌭 Perros calientes especiales
- 🍗 Pollo frito y alitas
- 🍟 Papas fritas y acompañamientos
- 🥤 Bebidas frías y calientes
- 🎯 Combos promocionales

---

## 🎨 Identidad Visual

| Elemento | Color | Vista previa | Aplicación |
|----------|-------|:---:|------------|
| Primario | `#FF6B35` | 🟧 | Botones, acentos y enlaces |
| Secundario | `#FFFFFF` | ⬜ | Fondos y tarjetas |
| Texto Oscuro | `#1A1A2E` | 🟦 | Textos principales |
| Fondo Gris | `#F8F9FA` | 🔲 | Secciones alternas |

---

## ⚙️ Funcionalidades del Sistema

### 👤 Usuarios (Público)

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Visualización del catálogo de productos.
- Envío de mensajes de contacto.

### 🛒 Carrito de Compras

- Agregar productos al carrito.
- Modificar cantidades (+ / −).
- Eliminar productos individualmente.
- Vaciar carrito completo.
- Calcular total automáticamente.
- Finalizar compra y generar pedido.

### 📦 Gestión de Productos *(Admin)*

- Crear, consultar, actualizar y eliminar productos.
- Marcar productos como populares.
- Asignar imágenes mediante URL.

### 👥 Gestión de Usuarios *(Admin)*

- Crear, editar y eliminar usuarios.
- Asignar roles (`admin` / `user`).

### 📋 Gestión de Pedidos *(Admin)*

- Consultar todos los pedidos y ver detalles.
- Cambiar estados: `pendiente → preparando → enviado → entregado → cancelado`.
- Eliminar pedidos y exportar reporte a JSON.

### 📬 Mensajes de Contacto *(Admin)*

- Recibir mensajes del formulario de contacto.
- Marcar mensajes como leídos / no leídos.
- Eliminar mensajes y exportar a JSON.

---

## 🔐 Sistema de Roles

### 👑 Administrador — Acceso completo al panel

| Módulo | Acciones |
|--------|----------|
| Productos | CRUD completo + marcar popular |
| Usuarios | CRUD completo + asignación de roles |
| Pedidos | Ver, cambiar estado, eliminar, exportar |
| Mensajes | Ver, marcar leído, eliminar, exportar |
| Dashboard | Estadísticas y métricas generales |

### 👤 Usuario — Acceso a la tienda pública

| Módulo | Acciones |
|--------|----------|
| Catálogo | Ver productos, filtrar por categoría |
| Carrito | Agregar, modificar, eliminar, comprar |
| Contacto | Enviar mensajes |

---

## 📂 Estructura del Proyecto

```bash
Examen-des-app-web/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── Styles.css                  # Estilos globales
│   │       ├── components/                 # Estilos por componente
│   │       │   ├── Header.css
│   │       │   ├── Footer.css
│   │       │   ├── Sidebar.css
│   │       │   ├── ProductCard.css
│   │       │   ├── Cart.css
│   │       │   ├── AdminPanel.css
│   │       │   ├── ConfirmModal.css
│   │       │   └── ContactForm.css
│   │       ├── views/                      # Estilos por vista
│   │       │   ├── Auth.css
│   │       │   ├── Home.css
│   │       │   ├── AdminDashboard.css
│   │       │   └── AdminMessages.css
│   │       └── utils/
│   │           └── variables.css           # Variables CSS globales
│   │
│   ├── utils/
│   │   └── auth.js                         # Lógica de autenticación
│   │
│   ├── components/                         # Componentes reutilizables
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── Sidebar.vue
│   │   ├── ProductCard.vue
│   │   ├── Cart.vue
│   │   ├── AdminPanel.vue
│   │   ├── ConfirmModal.vue
│   │   ├── ContactForm.vue
│   │   ├── AdminMessages.vue
│   │   └── AlertMessage.vue
│   │
│   ├── router/
│   │   └── Index.js                        # Configuración de rutas
│   │
│   ├── services/                           # Servicios de API
│   │   ├── products.js
│   │   └── users.js
│   │
│   ├── views/                              # Vistas principales
│   │   ├── HomeView.vue
│   │   ├── AdminDashboard.vue
│   │   ├── RegisterView.vue
│   │   └── LoginView.vue
│   │
│   ├── App.vue                             # Componente raíz
│   └── main.js                             # Punto de entrada
│
├── package.json
├── babel.config.js
├── vue.config.js
└── README.md
```

---

## 🧩 Componentes Principales

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| `Header.vue` | `components/` | Barra de navegación principal |
| `Footer.vue` | `components/` | Pie de página con información |
| `Sidebar.vue` | `components/` | Menú lateral administrativo |
| `ProductCard.vue` | `components/` | Tarjeta individual de producto |
| `Cart.vue` | `components/` | Panel lateral del carrito |
| `ConfirmModal.vue` | `components/` | Modal de confirmación personalizado |
| `ContactForm.vue` | `components/` | Formulario de contacto |
| `AlertMessage.vue` | `components/` | Alertas personalizadas del sistema |
| `AdminMessages.vue` | `components/` | Bandeja de mensajes (admin) |
| `AdminDashboard.vue` | `views/` | Panel de control principal |
| `LoginView.vue` | `views/` | Página de inicio de sesión |
| `RegisterView.vue` | `views/` | Página de registro |
| `HomeView.vue` | `views/` | Tienda pública |

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|:-------:|-----|
| Vue.js 3 | `^3.3.0` | Framework Frontend principal |
| Vue Router | `^4.2.0` | Navegación SPA |
| Bootstrap 5 | `^5.3.0` | Diseño responsivo |
| Axios | `^1.6.0` | Consumo de APIs REST |
| JavaScript ES6+ | — | Lógica de negocio |
| HTML5 | — | Estructura semántica |
| CSS3 | — | Estilos personalizados |

---

## 📦 Dependencias

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "bootstrap": "^5.3.0",
    "vue": "^3.3.0",
    "vue-router": "^4.2.0"
  },
  "devDependencies": {
    "@vue/cli-service": "^5.0.0"
  }
}
```

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Xt-Andrey/examen-des-app-web.git
```

### 2. Ingresar al proyecto

```bash
cd examen-des-app-web
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar en modo desarrollo

```bash
npm run serve
```

> La aplicación estará disponible en: **http://localhost:8080**

### 5. Compilar para producción

```bash
npm run build
```

---

## 🔑 Credenciales de Prueba

### 👑 Administrador

| Campo | Valor |
|-------|-------|
| Correo | `Nico.Cummings92@yahoo.com` |
| Contraseña | `gLz714f8Ocm4s7W` |

### 👤 Usuario

| Campo | Valor |
|-------|-------|
| Correo | `Alyson.Gottlieb3@yahoo.com` |
| Contraseña | `0OsrkDfqM9ciMcC` |

---

## 📡 API Externa

La aplicación consume datos desde **MockAPI**:

| Recurso | Endpoint |
|---------|----------|
| Productos | `https://6a1aeb57bc2f94475492ce64.mockapi.io/products` |
| Usuarios | `https://6a1aeb57bc2f94475492ce64.mockapi.io/users` |

---

## 💾 Persistencia de Datos

Los siguientes datos se almacenan en `localStorage` del navegador:

| Key | Contenido |
|-----|-----------|
| `orders` | Pedidos realizados |
| `carrito` | Productos en el carrito |
| `contact_messages` | Mensajes del formulario de contacto |

---

## ✅ Buenas Prácticas Aplicadas

- **Arquitectura modular** con componentes reutilizables.
- **Separación de responsabilidades** (Vista, Lógica, Estilos).
- **Navegación SPA** fluida con Vue Router.
- **Persistencia de datos** con localStorage.
- **Organización escalable** de carpetas y archivos.
- **Control de versiones** con Git y GitHub.
- **Diseño responsivo** con Bootstrap 5.
- **Manejo de errores** en peticiones API.
- **Feedback visual** con componente AlertMessage.
- **Modales de confirmación** personalizados.

---

## 📈 Mejoras Implementadas

| Mejora | Descripción |
|--------|-------------|
| 🪟 Modal de confirmación | Reemplazo del `confirm()` nativo por modal personalizado |
| 📬 Bandeja de mensajes | Gestión completa de mensajes de contacto en el admin |
| 📤 Exportación a JSON | Reportes descargables de pedidos y mensajes |
| 💾 Persistencia entre pestañas | Uso de `localStorage` en lugar de `sessionStorage` |
| 🎨 Diseño uniforme | Consistencia visual en todo el sistema |
| 🛒 Carrito persistente | Los productos se mantienen al recargar la página |
| 🔒 Autenticación mejorada | Cierre de sesión al usar el botón atrás del navegador |

---

## 🐛 Problemas Encontrados y Soluciones

| Problema | Solución aplicada |
|----------|-------------------|
| Pérdida de sesión al recargar | Migración de `sessionStorage` a `localStorage` |
| Diálogo de confirmación nativo poco amigable | Implementación de modal personalizado |
| Mensajes desordenados en el panel admin | Reestructuración y centrado con CSS |
| Etiquetas HTML incorrectas | Corrección de etiquetas `<tr>` mal cerradas |
| Carrito se vaciaba al recargar | Persistencia del estado en `localStorage` |

---

## 👨‍💻 Integrantes

| Nombre | Código |
|--------|:------:|
| Rubiel Andrey Galvis Galvis | `0192483` |
| Arnold Claro | `0192493` |

---

## 🔗 Enlaces

| Recurso | Enlace |
|---------|--------|
| 📂 Repositorio | [GitHub — segundo-parcial-des-app-web](https://github.com/Xt-Andrey/segundo-parcial-des-app-web) |
| 🌐 Demo Local | `http://localhost:8080` |
| 🛠️ MockAPI | [mockapi.io](https://mockapi.io/) |

---

## 📚 Referencias

- [Vue.js Documentation](https://vuejs.org/guide/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [MDN Web Docs](https://developer.mozilla.org/)
- [MockAPI Documentation](https://mockapi.io/docs)

---

## 📌 Conclusiones

El desarrollo de **Fast Food Bites** permitió aplicar conocimientos fundamentales de Vue.js y desarrollo web moderno mediante la construcción de una aplicación SPA completamente funcional.

Durante el proyecto se implementaron:

- ✅ Componentes reutilizables con Vue.js 3.
- ✅ Rutas dinámicas y protegidas con Vue Router.
- ✅ Autenticación de usuarios con sistema de roles.
- ✅ CRUD completo para productos y usuarios.
- ✅ Gestión de pedidos con cambio de estados.
- ✅ Carrito de compras con persistencia local.
- ✅ Formulario de contacto con almacenamiento.
- ✅ Panel administrativo con estadísticas.
- ✅ Bandeja de mensajes de contacto.
- ✅ Diseño responsivo adaptable a dispositivos móviles.

La experiencia fortaleció competencias relacionadas con el **trabajo colaborativo**, **control de versiones** con Git, consumo de APIs REST y **organización profesional** de proyectos frontend.

---

## 📄 Licencia

Proyecto académico desarrollado para la asignatura de **Desarrollo de Aplicaciones Web**.

---

<div align="center">

**🍔 Fast Food Bites**

*"La mejor experiencia digital para la gestión de comida rápida."*

</div>