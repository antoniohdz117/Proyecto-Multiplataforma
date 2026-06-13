const { EntidadFederativa } = require("../models/entidadFederativa.model");
const { alumno } = require("../models/alumno.model");

//REGEX
const regexNombreEntidad = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,60}$/;
const regexAbreviatura = /^[A-Z]{2,5}$/;

const validarEntidad = (datos) => {
  const { nombre_entidad, abreviatura } = datos;

  if (!nombre_entidad) {
    return "El nombre de la entidad es obligatorio";
  }

  if (!abreviatura) {
    return "La abreviatura es obligatoria";
  }

  if (!regexNombreEntidad.test(nombre_entidad)) {
    return "El nombre de la entidad solo debe contener letras y espacios, mínimo 2 y máximo 60 caracteres";
  }

  if (!regexAbreviatura.test(abreviatura)) {
    return "La abreviatura solo debe contener letras mayúsculas y tener entre 2 y 5 caracteres";
  }

  return null;
};

// GET todas las entidades
const getEntidades = async (req, res) => {
  try {
    const entidades = await EntidadFederativa.findAll();
    return res.json({ entidades });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener entidades",
      error: error.message,
    });
  }
};

// GET por id
const getEntidadById = async (req, res) => {
  try {
    const { id } = req.params;

    const entidad = await EntidadFederativa.findByPk(id);

    if (!entidad) {
      return res.status(404).json({
        message: "Entidad no encontrada",
      });
    }

    return res.json({ entidad });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener entidad",
      error: error.message,
    });
  }
};

// POST
const createEntidad = async (req, res) => {
  try {
    if (req.body.nombre_entidad) {
      req.body.nombre_entidad = req.body.nombre_entidad.trim();
    }

    if (req.body.abreviatura) {
      req.body.abreviatura = req.body.abreviatura.trim().toUpperCase();
    }

    const errorValidacion = validarEntidad(req.body);

    if (errorValidacion) {
      return res.status(400).json({
        message: errorValidacion,
      });
    }

    const { nombre_entidad, abreviatura } = req.body;

    const nuevaEntidad = await EntidadFederativa.create({
      nombre_entidad,
      abreviatura,
    });

    return res.status(201).json({
      message: "Entidad creada correctamente",
      entidad: nuevaEntidad,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear entidad",
      error: error.message,
    });
  }
};

// PUT
const updateEntidad = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id de la entidad debe ser un número",
      });
    }

    const entidad = await EntidadFederativa.findByPk(id);

    if (!entidad) {
      return res.status(404).json({
        message: "Entidad no encontrada",
      });
    }

    if (req.body.nombre_entidad) {
      req.body.nombre_entidad = req.body.nombre_entidad.trim();
    }

    if (req.body.abreviatura) {
      req.body.abreviatura = req.body.abreviatura.trim().toUpperCase();
    }

    const datosActualizados = {
      ...entidad.toJSON(),
      ...req.body,
    };

    const errorValidacion = validarEntidad(datosActualizados);

    if (errorValidacion) {
      return res.status(400).json({
        message: errorValidacion,
      });
    }

    await entidad.update({
      nombre_entidad: datosActualizados.nombre_entidad,
      abreviatura: datosActualizados.abreviatura,
    });

    return res.json({
      message: "Entidad actualizada correctamente",
      entidad,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar entidad",
      error: error.message,
    });
  }
};

// DELETE
const deleteEntidad = async (req, res) => {
  try {
    const { id } = req.params;

    const entidad = await EntidadFederativa.findByPk(id);

    if (!entidad) {
      return res.status(404).json({
        message: "Entidad no encontrada",
      });
    }

    await entidad.destroy();

    return res.json({
      message: "Entidad eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar entidad",
      error: error.message,
    });
  }
};

const getAlumnosByEntidad = async (req, res) => {
  try {
    const { id } = req.params;

    const entidad = await EntidadFederativa.findByPk(id, {
      include: {
        model: alumno,
        attributes: [
          "numero_cuenta",
          "nombre",
          "apellido_paterno",
          "apellido_materno",
        ],
      },
    });

    if (!entidad) {
      return res.status(404).json({
        message: "Entidad no encontrada",
      });
    }

    return res.json({ entidad });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener alumnos por entidad",
      error: error.message,
    });
  }
};

module.exports = {
  getEntidades,
  getEntidadById,
  createEntidad,
  updateEntidad,
  deleteEntidad,
  getAlumnosByEntidad,
};
