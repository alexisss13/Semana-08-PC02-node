const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define la carpeta donde se guardarán los afiches
    cb(null, 'uploads/afiches/');
  },
  filename: function (req, file, cb) {
    // Sanitizar el nombre del archivo y añadir un timestamp para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_').replace(extension, '');
    cb(null, sanitizedFilename + '-' + uniqueSuffix + extension);
  }
});

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Error: Solo se permiten archivos de imagen (jpg, png, webp).'));
};

// Configuración final de Multer
const upload = multer({
  storage: storage,
  limits: {
    // Límite de tamaño del archivo (ej. 3MB)
    fileSize: 3 * 1024 * 1024
  },
  fileFilter: fileFilter
});

module.exports = upload;