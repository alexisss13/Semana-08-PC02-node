const Evento = require('../models/Evento');
const Organizador = require('../models/Organizador');

// Muestra la página de resumen con el calendario de eventos
exports.getResumen = async (req, res) => {
  try {
    // Obtenemos todos los eventos con la información de su organizador
    const eventos = await Evento.findAll({
      include: [{
        model: Organizador,
        as: 'organizador',
        attributes: ['nombre']
      }],
      order: [['fecha', 'ASC']]
    });
    
    // Renderizamos la nueva vista y le pasamos los eventos
    res.render('resumen', {
      title: 'Resumen de Eventos',
      eventos: eventos
    });
  } catch (error) {
    console.error("Error al obtener el resumen de eventos:", error);
    res.status(500).send(error.message);
  }
};
