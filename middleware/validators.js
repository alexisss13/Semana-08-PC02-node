const { body } = require('express-validator');

exports.organizadorValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
  body('telefono')
    .optional({ checkFalsy: true }) // Permite que el campo esté vacío
    .trim()
    .isLength({ min: 7 }).withMessage('El teléfono debe tener un formato válido.')
];

exports.eventoValidator = [
  body('titulo')
    .trim()
    .notEmpty().withMessage('El título es obligatorio.')
    .isLength({ min: 5 }).withMessage('El título debe tener al menos 5 caracteres.'),
  body('fecha')
    .notEmpty().withMessage('La fecha es obligatoria.')
    .isISO8601().toDate().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD).'),
  body('id_organizador')
    .notEmpty().withMessage('Debe seleccionar un organizador.')
    .isInt({ gt: 0 }).withMessage('El organizador seleccionado no es válido.')
];