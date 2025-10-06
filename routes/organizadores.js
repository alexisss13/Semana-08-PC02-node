const express = require('express');
const router = express.Router();
const organizadorController = require('../controllers/organizadorController');
const { organizadorValidator } = require('../middleware/validators');

// Rutas para la interfaz web (vistas EJS)
router.get('/', organizadorController.getAll);
router.get('/crear', organizadorController.showCreateForm);
router.post('/crear', organizadorValidator, organizadorController.create);
router.get('/editar/:id', organizadorController.showEditForm);
router.post('/editar/:id', organizadorValidator, organizadorController.update);
router.post('/eliminar/:id', organizadorController.delete);

module.exports = router;