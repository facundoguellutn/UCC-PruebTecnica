# UCC-PruebaTecnica
Este repositorio contiene la prueba tecnica de Güell Facundo, tanto el frontend como el bakcend de la aplicación que permite crear, modificar,consultar y eliminar usuarios y sus datos asociados.El proyecto está construido utilizando las siguientes tecnologías:

React (Frontend)
Node.js (Backend)
MySQL (Base de datos)

Para utilizar este proyecto, sigue estos pasos:

Clonar el repositorio y abrir en un editor de codigo/terminal

# Frontend
Navega a la carpeta del frontend: cd client/app-frontend
Instala las dependencias: npm install
Inicia la aplicación React: npm run start
La aplicación estará disponible en http://localhost:3000.

# Backend
Navega a la carpeta del backend: cd backend
Instala las dependencias:npm install
Configura la base de datos:
    Importa la estructura de la base de datos utilizando el archivo database.sql ubicado en la carpeta db. Esto creará las tablas necesarias y algunos datos de ejemplo en MySQL.
Crea un archivo .env en la carpeta backend y configura las variables de entorno para la conexión a la base de datos. Debe contener lo siguiente:
    DB_HOST=tu_host_de_base_de_datos
    DB_USER=tu_usuario_de_base_de_datos
    DB_PASS=tu_contraseña_de_base_de_datos
    DB_DATABASE=tu_nombre_de_base_de_datos
    DB_PORT=tu_ouerto_de_base_de_datos
    PORT=tu_puerto_de_backend
Inicia el servidor Node.js: npm run dev

# Uso
Una vez que hayas configurado tanto el frontend como el backend, podrás utilizar la aplicación para crear, modificar, consultar y eliminar usuarios y sus datos asociados.

# Notas
Asegúrate de que tengas Node.js y MySQL instalados en tu sistema antes de comenzar.
Reemplaza las variables de entorno en el archivo .env con tus propios valores para la conexión a la base de datos.



