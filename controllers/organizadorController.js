const Organizador = require("../models/Organizador");
const { validationResult } = require("express-validator");

// Obtener todos los organizadores
exports.getAll = async (req, res) => {
  try {
    const organizadores = await Organizador.findAll({
      order: [["nombre", "ASC"]],
    });
    res.render("organizadores/list", {
      title: "Organizadores",
      organizadores,
      success: req.query.success,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar formulario para crear un nuevo organizador
exports.showCreateForm = (req, res) => {
  res.render("organizadores/form", {
    title: "Crear Organizador",
    organizador: {},
    errors: [],
    action: "/organizadores/crear",
  });
};

// Crear un nuevo organizador
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("organizadores/form", {
      title: "Crear Organizador",
      organizador: req.body,
      errors: errors.array(),
      action: "/organizadores/crear",
    });
  }

  try {
    await Organizador.create(req.body);
    res.redirect("/organizadores?success=true");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mostrar formulario para editar un organizador
exports.showEditForm = async (req, res) => {
  try {
    const organizador = await Organizador.findByPk(req.params.id);
    if (!organizador) {
      return res.status(404).send("Organizador no encontrado");
    }
    res.render("organizadores/form", {
      title: "Editar Organizador",
      organizador,
      errors: [],
      action: `/organizadores/editar/${organizador.id_organizador}`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un organizador
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const organizador = { id_organizador: req.params.id, ...req.body };
    return res.status(400).render("organizadores/form", {
      title: "Editar Organizador",
      organizador,
      errors: errors.array(),
      action: `/organizadores/editar/${organizador.id_organizador}`,
    });
  }

  try {
    const [updated] = await Organizador.update(req.body, {
      where: { id_organizador: req.params.id },
    });
    if (!updated) {
      return res.status(404).send("Organizador no encontrado");
    }
    res.redirect("/organizadores?success=true");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un organizador
exports.delete = async (req, res) => {
  try {
    const deleted = await Organizador.destroy({
      where: { id_organizador: req.params.id },
    });
    if (!deleted) {
      return res.status(404).send("Organizador no encontrado");
    }
    res.redirect("/organizadores?success=true");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
