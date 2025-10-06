const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const { eventoValidator } = require('../middleware/validators');
const upload = require('../middleware/upload');

// Rutas para la interfaz web (vistas EJS)
router.get('/', eventoController.getAll);
router.get('/crear', eventoController.showCreateForm);
// El middleware 'upload' maneja la subida del archivo antes que el controlador
router.post('/crear', upload.single('afiche'), eventoValidator, eventoController.create);
router.get('/editar/:id', eventoController.showEditForm);
router.post('/editar/:id', upload.single('afiche'), eventoValidator, eventoController.update);
router.post('/eliminar/:id', eventoController.delete);
router.get('/:id', eventoController.getById);

module.exports = router;