const Evento = require("../models/Evento");
const Organizador = require("../models/Organizador");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

// Obtener todos los eventos, incluyendo la información del organizador (Eager Loading)
exports.getAll = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      include: [
        {
          model: Organizador,
          as: "organizador", // Este alias debe coincidir con el definido en la asociación
          attributes: ["nombre"],
        },
      ],
      order: [["fecha", "DESC"]],
    });
    res.render("eventos/list", {
      title: "Eventos",
      eventos,
      success: req.query.success,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar detalles de un evento
exports.getById = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id, {
      include: [{ model: Organizador, as: "organizador" }],
    });
    if (!evento) {
      return res
        .status(404)
        .render("partials/404", { title: "Evento no encontrado" });
    }
    res.render("eventos/detail", {
      title: `Detalle: ${evento.titulo}`,
      evento,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar formulario para crear un nuevo evento
exports.showCreateForm = async (req, res) => {
  try {
    const organizadores = await Organizador.findAll({
      order: [["nombre", "ASC"]],
    });
    res.render("eventos/form", {
      title: "Crear Evento",
      evento: {},
      organizadores,
      errors: [],
      action: "/eventos/crear",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo evento
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, eliminar el archivo subido si existe
    if (req.file) {
      fs.unlinkSync(path.join(__dirname, "..", req.file.path));
    }
    const organizadores = await Organizador.findAll();
    return res.status(400).render("eventos/form", {
      title: "Crear Evento",
      evento: req.body,
      organizadores,
      errors: errors.array(),
      action: "/eventos/crear",
    });
  }

  try {
    const eventoData = { ...req.body };
    // 🔧 Forzar la fecha a formato YYYY-MM-DD sin convertir zona horaria
    if (eventoData.fecha) {
      const fecha = new Date(eventoData.fecha);
      const fechaLocal = new Date(
        fecha.getTime() + fecha.getTimezoneOffset() * 60000
      );
      eventoData.fecha = fechaLocal.toISOString().split("T")[0];
    }
    if (req.file) {
      // Guardamos solo el nombre del archivo en la BD
      eventoData.afiche = req.file.filename;
    }
    await Evento.create(eventoData);
    res.redirect("/eventos?success=create");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar formulario para editar un evento
exports.showEditForm = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).send("Evento no encontrado");
    }
    const organizadores = await Organizador.findAll({
      order: [["nombre", "ASC"]],
    });
    res.render("eventos/form", {
      title: "Editar Evento",
      evento,
      organizadores,
      errors: [],
      action: `/eventos/editar/${evento.id_evento}`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un evento
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const evento = { id_evento: req.params.id, ...req.body };
    const organizadores = await Organizador.findAll();
    return res.status(400).render("eventos/form", {
      title: "Editar Evento",
      evento,
      organizadores,
      errors: errors.array(),
      action: `/eventos/editar/${evento.id_evento}`,
    });
  }

  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).send("Evento no encontrado");
    }

    // Gestionar el afiche
    const eventoData = { ...req.body };
    if (eventoData.fecha) {
      const fecha = new Date(eventoData.fecha);
      const fechaLocal = new Date(
        fecha.getTime() + fecha.getTimezoneOffset() * 60000
      );
      eventoData.fecha = fechaLocal.toISOString().split("T")[0];
    }
    if (req.file) {
      // Si se sube un nuevo afiche, borrar el anterior si existe
      if (evento.afiche) {
        const oldAfichePath = path.join(
          __dirname,
          "..",
          "uploads",
          "afiches",
          evento.afiche
        );
        if (fs.existsSync(oldAfichePath)) {
          fs.unlinkSync(oldAfichePath);
        }
      }
      eventoData.afiche = req.file.filename;
    }

    await evento.update(eventoData);
    res.redirect("/eventos?success=update");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un evento
exports.delete = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).send("Evento no encontrado");
    }

    // Borrar el afiche del sistema de archivos si existe
    if (evento.afiche) {
      const afichePath = path.join(
        __dirname,
        "..",
        "uploads",
        "afiches",
        evento.afiche
      );
      if (fs.existsSync(afichePath)) {
        fs.unlinkSync(afichePath);
      }
    }

    await evento.destroy();
    res.redirect("/eventos?success=delete");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
