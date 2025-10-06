const express = require('express');
const router = express.Router();
const resumenController = require('../controllers/resumenController');

// Define la ruta principal para la vista de resumen/calendario
router.get('/', resumenController.getResumen);

module.exports = router;
