# Sistema de Gestión de Eventos y Organizadores

Este es un proyecto CRUD completo desarrollado con Express.js, PostgreSQL y Sequelize. Permite gestionar eventos y sus respectivos organizadores, incluyendo la subida de imágenes (afiches) para los eventos a través de una interfaz web creada con EJS y Bootstrap.

## Características

-   **CRUD Completo**: Operaciones para Crear, Leer, Actualizar y Eliminar tanto para Eventos como para Organizadores.
-   **Relación de Datos**: Un evento pertenece a un organizador (relación uno a muchos).
-   **Subida de Imágenes**: Funcionalidad para subir un afiche para cada evento usando `multer`.
-   **Validación de Datos**: Validaciones en el backend con `express-validator`.
-   **Interfaz Web Responsiva**: Vistas dinámicas con EJS y diseño responsive gracias a Bootstrap.

## Requisitos Previos

-   [Node.js](https://nodejs.org/) (v18 o superior)
-   npm o [Yarn](https://yarnpkg.com/)
-   Una base de datos [PostgreSQL](https://www.postgresql.org/) en ejecución.

## Configuración del Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/alexisss13/Semana-08-PC02-node](https://github.com/alexisss13/Semana-08-PC02-node)
    cd Semana-08-PC02-node
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto, copiando el contenido de `.env.example`. Asegúrate de que la variable `DATABASE_URL` apunte a tu base de datos PostgreSQL.

    ```
    # .env
    PORT=3000
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    ```

4.  **Crear las tablas en la base de datos:**
    Ejecuta el script SQL `db/schema.sql` en tu cliente de PostgreSQL para crear las tablas `organizadores` y `eventos` e insertar los datos de ejemplo.
    Puedes usar `psql`:
    ```bash
    psql -d tu_base_de_datos -f db/schema.sql
    ```

## Ejecución de la Aplicación

-   **Modo desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```
-   **Modo producción:**
    ```bash
    npm run start
    ```
La aplicación estará disponible en `http://localhost:3000`.

## Endpoints Principales (API/Web)

-   `GET /`: Página de inicio.
-   `GET /organizadores`: Lista todos los organizadores.
-   `GET /organizadores/crear`: Muestra el formulario para crear un organizador.
-   `POST /organizadores/crear`: Crea un nuevo organizador.
-   `GET /organizadores/editar/:id`: Muestra el formulario para editar un organizador.
-   `POST /organizadores/editar/:id`: Actualiza un organizador.
-   `POST /organizadores/eliminar/:id`: Elimina un organizador.
-   `GET /eventos`: Lista todos los eventos.
-   `GET /eventos/crear`: Muestra el formulario para crear un evento.
-   `POST /eventos/crear`: Crea un nuevo evento (con subida de afiche).
-   `GET /eventos/editar/:id`: Muestra el formulario para editar un evento.
-   `POST /eventos/editar/:id`: Actualiza un evento.
-   `POST /eventos/eliminar/:id`: Elimina un evento.
-   `GET /eventos/:id`: Muestra los detalles de un evento.

