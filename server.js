// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const path = require('path');
const sequelize = require('./config/database');

// Importar rutas
const organizadorRoutes = require('./routes/organizadores');
const eventoRoutes = require('./routes/eventos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, JS, imágenes de afiches)
app.use(express.static(path.join(__dirname, 'public')));
// Servir archivos de Bootstrap desde node_modules
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// Servir archivos subidos (afiches)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar rutas
app.get('/', (req, res) => {
  res.render('index', { title: 'Página de Inicio' });
});
app.use('/organizadores', organizadorRoutes);
app.use('/eventos', eventoRoutes);

// Middleware para manejar errores 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).render('partials/404', { title: 'Página no encontrada' });
});

// Middleware para manejar otros errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Conectar a la base de datos y arrancar el servidor
sequelize.sync() // Cuidado: .sync() puede ser destructivo. Para producción, usar migraciones.
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });