# 🍔 Fast Food Bites — Aplicación Web con Vue.js

Fast Food Bites es una aplicación web desarrollada con Vue.js 3 que simula la gestión digital de un restaurante de comida rápida. El sistema permite a los usuarios iniciar sesión y acceder a un dashboard interactivo donde se administran productos mediante un CRUD simulado utilizando archivos JSON y LocalStorage.

El proyecto fue desarrollado aplicando conceptos de modularización, componentes reutilizables, rutas dinámicas y diseño responsivo utilizando Vue Router y Bootstrap.

---

# 📌 Objetivo del Proyecto

Desarrollar una aplicación web modularizada utilizando Vue.js, implementando buenas prácticas de programación, componentes reutilizables y navegación dinámica mediante Vue Router.

La aplicación busca simular un sistema administrativo para un restaurante de comida rápida, incluyendo:

- Inicio de sesión.
- Dashboard administrativo.
- Gestión de productos.
- Navegación dinámica.
- CRUD simulado con LocalStorage.
- Componentes reutilizables.
- Diseño responsivo con Bootstrap.

---

# 🏪 Tipo de Negocio

**Fast Food Bites**  
Restaurante de comida rápida.

## 🎨 Paleta de colores

- Naranja: `#ff6b35`
- Blanco: `#ffffff`
- Negro: `#000000`

---

# 📂 Estructura del Proyecto

```bash
segundo-parcial-des-app-web/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── css/
│   │       ├── Style.css
│   │       └── Login.css
│   │
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── Sidebar.vue
│   │   ├── ProductCard.vue
│   │   └── ContactForm.vue
│   │
│   ├── data/
│   │   └── Productos.json
│   │
│   ├── router/
│   │   └── Index.js
│   │
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   └── ProductView.vue
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

# 🧩 Modularización Implementada

El proyecto fue desarrollado siguiendo una arquitectura modular basada en componentes reutilizables de Vue.js.

Cada componente tiene una responsabilidad específica, facilitando:

- Mantenimiento.
- Escalabilidad.
- Reutilización.
- Trabajo colaborativo.

---

# 🧱 Componentes Reutilizables

## 🔹 Header.vue

Componente encargado del encabezado principal de la aplicación.

### Funciones

- Mostrar logo del negocio.
- Mostrar nombre del restaurante.
- Navegación superior.

---

## 🔹 Sidebar.vue

Menú lateral reutilizable utilizado dentro del dashboard.

### Funciones

- Navegación entre vistas.
- Acceso rápido a productos y clientes.
- Íconos de navegación.

---

## 🔹 Footer.vue

Pie de página global reutilizable.

### Funciones

- Derechos reservados.
- Información del proyecto.

---

## 🔹 ProductCard.vue

Tarjeta reutilizable para mostrar productos.

### Funciones

- Mostrar imagen.
- Mostrar precio.
- Mostrar descripción.
- Botón de detalles.

---

# 🔐 Sistema de Login

La aplicación incluye una vista `LoginView.vue` encargada de validar usuarios desde un archivo JSON local.

## Funcionalidades

- Validación de correo y contraseña.
- Mensajes de error con Bootstrap.
- Redirección al dashboard.
- Simulación de autenticación.

## Credenciales de prueba

```text
Correo: usuario@test.com
Contraseña: 123456
```

## Ejemplo de validación

```javascript
if (email === usuario.email && password === usuario.password) {
    this.$router.push('/dashboard')
} else {
    this.error = 'Credenciales incorrectas'
}
```

> ⚠️ Nota: Este sistema de autenticación es únicamente educativo y no representa un sistema de seguridad real.

---

# 📊 Dashboard Principal

La aplicación incluye un Dashboard administrativo construido con Vue Router.

## Características

- Navbar persistente.
- Sidebar reutilizable.
- Navegación dinámica.
- Renderizado mediante `<router-view>`.

## Rutas implementadas

```text
/login
/dashboard
/dashboard/productos
/dashboard/clientes
```

---

# 🛒 Gestión de Productos

La vista `ProductView.vue` implementa un CRUD simulado de productos.

## Funcionalidades

- Listado de productos.
- Crear productos.
- Editar productos.
- Eliminar productos.
- Persistencia con LocalStorage.

## Fuente de datos

Los productos se cargan inicialmente desde:

```text
Productos.json
```

Posteriormente los datos son almacenados y gestionados mediante:

```javascript
localStorage
```

---

# 💬 Comunicación entre Componentes

La comunicación entre componentes se realiza utilizando:

- Props
- Eventos personalizados
- Vue Router

## Ejemplo de props

```vue
<ProductCard :producto="producto" />
```

## Ejemplo de evento

```vue
this.$emit('eliminarProducto', id)
```

---

# 🎨 Diseño Responsivo

La interfaz fue desarrollada utilizando Bootstrap para garantizar:

- Diseño limpio.
- Interfaz moderna.
- Adaptabilidad móvil.
- Consistencia visual.

## Tecnologías utilizadas

- Bootstrap 5
- Flexbox
- CSS personalizado
- Responsive Design

---

# ✅ Buenas Prácticas Aplicadas

| Práctica | Implementación |
|---|---|
| Modularización | Componentes independientes |
| Separación de responsabilidades | Views, Components, Router, Data |
| Reutilización | Navbar, Sidebar, Footer |
| Convenciones de nombres | PascalCase y camelCase |
| Organización del proyecto | Arquitectura escalable |
| Persistencia | LocalStorage |
| Navegación SPA | Vue Router |

---

# 🚀 Cómo Ejecutar el Proyecto

## 1️⃣ Clonar repositorio

```bash
git clone https://github.com/Xt-Andrey/segundo-parcial-des-app-web.git
```

---

## 2️⃣ Entrar al proyecto

```bash
cd segundo-parcial-des-app-web
```

---

# ⚙️ Configuración del Proyecto

## 📦 Instalar dependencias

```bash
npm install
```

---

## 🚀 Ejecutar el proyecto en modo desarrollo

Compila la aplicación y habilita recarga automática al detectar cambios.

```bash
npm run serve
```

Luego abrir en el navegador:

```text
http://localhost:8080
```

---

## 🏗️ Compilar para producción

Genera la versión optimizada del proyecto para despliegue.

```bash
npm run build
```

---

## 🧹 Analizar y corregir errores de código

Ejecuta ESLint para detectar problemas de estilo y posibles errores.

```bash
npm run lint
```

---

## ⚙️ Configuración adicional

Para más información sobre la configuración de Vue CLI:

https://cli.vuejs.org/config/

---

# 🛠️ Tecnologías Utilizadas

- Vue.js 3
- Vue Router
- JavaScript ES6+
- Bootstrap 5
- CSS3
- HTML5
- LocalStorage
- JSON

---

# 👥 Integrantes del Grupo

| Nombre | Código |
|---|---|
| RUBIEL ANDREY GALVIS GALVIS | 0192483 |
| ARNOLD CLARO | 0192493 |

---

# 🔀 Trabajo Colaborativo en GitHub

El desarrollo del proyecto evidencia trabajo colaborativo mediante:

- Uso de ramas.
- Pull Requests.
- Commits descriptivos.
- Integración progresiva hacia la rama principal (`main`).

Repositorio oficial:

https://github.com/Xt-Andrey/segundo-parcial-des-app-web

---

# 📚 Referencias Oficiales

- Vue.js Documentation
- Bootstrap 5 Documentation
- Vue Router Documentation
- MDN LocalStorage
- JavaScript ES6+

---

# 📌 Conclusiones

El proyecto permitió aplicar conceptos fundamentales de Vue.js y desarrollo frontend moderno mediante una arquitectura modular basada en componentes reutilizables.

Además, fortaleció el trabajo colaborativo utilizando GitHub y buenas prácticas de organización de código, logrando una aplicación funcional, escalable y visualmente coherente para la gestión de un restaurante de comida rápida.