
# 🎬 CINEVA

** CINEVA ** es una aplicación móvil desarrollada con **React Native** que permite explorar una cartelera de películas, seleccionar funciones y horarios, agregar entradas al carrito y finalizar la compra. 
También incluye autenticación, gestión de perfil y un historial de compras.


![Image](https://github.com/user-attachments/assets/6ffdc0b0-796c-417f-aa11-c7d708144387)

  
---

## 🚀 Funcionalidades principales.

- 🔐 Registro e inicio de sesión de usuario con Firebase
- 📽️ Vista de cartelera con detalles de películas
- 🛒 Agregado de películas al carrito con gestión de cantidad y horarios
- 🛒 Persistencia del carrito al cerrar la app o cerrar sesión.
- 📷 Posibilidad de agregar imagen de perfil desde la cámara
- 🧠 Autenticación persistente y almacenamiento local con SQLite (solo mobile)
- 🧾 Validaciones de formularios con Yup y React Hook Form

---

## 🧱 Tecnologías utilizadas

- **React Native** y **Expo** para el desarrollo mobile
- **Redux Toolkit** para manejo global del estado
- **React Navigation** para navegación entre pantallas
- **SQLite (expo-sqlite)** para persistencia local de sesión (mobile)
- **Firebase** para autenticación y base de datos de compras
- **React Hook Form** + **Yup** para formularios y validaciones
- **React Native Vector Icons** para iconografía
- **YouTube iFrame** para trailers en detalles de películas

---

## 📁 Estructura de carpetas

✦ /components: Contiene componentes reutilizables como Header, Counter y HistorialCompras, utilizados en diferentes partes de la app.

✦ /navigation: Define toda la lógica de navegación utilizando React Navigation, incluyendo los stacks (HomeNavigator, CartNavigator) y el tab principal (BottomNavigator).

✦ /screen: Incluye las pantallas principales de la app como Home, Details, Cart, Login, Register y Profile.

✦ /store: Configuración de Redux Toolkit. Combina los reducers y aplica middleware para RTK Query.

✦ /features: Contiene los slices de Redux Toolkit para manejar el estado global.

✦ /hooks: Contiene hooks personalizados como useDB.js, que encapsula las operaciones con SQLite para gestionar sesiones de usuario.

✦ /databases: Contiene la configuracion de Firebase url.

✦ /services: Implementaciones de RTK Query para interactuar con Firebase.

✦ /utils: Funciones de utilidad reutilizables, como validaciones con Yup.

---


🛠 INSTALACION Y EJECUCION: 

1. Clonar el repositorio:

git clone git clone https://github.com/FAC000/DESAROLLO-DE-APLICACIONES---CODERHOUSE.git
cd DESAROLLO-DE-APLICACIONES---CODERHOUSE

💡 Tip: Si querés que el proyecto se clone con otro nombre (por ejemplo my-cinema), podés hacerlo así:
cd my-cinema 

2. Instalar dependencias:
 
npm install

4. Levantar la app con Expo:

npx expo start


⚠️ Importante: esta app debe ejecutarse en un emulador o dispositivo físico.

Debido a que se utiliza SQLite a través de expo-sqlite, la app no funciona en la web.
Usá la opción Run on Android device/emulator o Run on iOS simulator desde el menú de Expo.

---

## 🌍 Base de datos 

💾 SQLite (solo en dispositivo)

·Guarda la sesión del usuario localmente para mantener la persistencia incluso si se reinicia la app.
·Usado solo en dispositivos móviles, no disponible en la versión web.

---

🔐 Firebase
·Registro/Login con email y contraseña
·Token e idToken manejados con Redux para validación posterior

---
## 📷 GIF DE NAVEGACION


https://github.com/user-attachments/assets/81863c5c-9475-49be-be7e-16fc7e4f258a
