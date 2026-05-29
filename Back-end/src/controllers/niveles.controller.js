const { nivelSemestre } = require("../models");

const getNiveles = async (req, res) => {
  try {
    const niveles = await nivelSemestre.findAll();
    return res.json({ niveles });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener niveles",
      error: error.message,
    });
  }
};

const getNivelById = async (req, res) => {
  try {
    const nivel = await nivelSemestre.findByPk(req.params.id);

    if (!nivel) {
      return res.status(404).json({
        message: "Nivel no encontrado",
      });
    }

    return res.json({ nivel });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener nivel",
      error: error.message,
    });
  }
};

const createNivel = async (req, res) => {
  try {
    const { nombre_semestre } = req.body;

    if (!nombre_semestre) {
      return res.status(400).json({
        message: "El nombre del semestre es obligatorio",
      });
    }

    const nuevoNivel = await nivelSemestre.create({
      nombre_semestre,
    });

    return res.status(201).json({ nivel: nuevoNivel });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear nivel",
      error: error.message,
    });
  }
};

// funcion para actualziar un nivel
const updateNivel = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del nivel debe ser un número",
      });
    }
    const nivelEncontrado = await nivelSemestre.findByPk(id);
    if (!nivelEncontrado) {
      return res.status(404).json({
        message: "Nivel no encontrado",
      });
    }
    const { nombre_semestre } = req.body;
    await nivelEncontrado.update({
      nombre_semestre,
    });

    return res.json({ nivel: nivelEncontrado });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar nivel",
      error: error.message,
    });
  }
};

// funcion para eliminar un nivel
const deleteNivel = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del nivel debe ser un número",
      });
    }

    
    const nivelEncontrado = await nivelSemestre.findByPk(id);

    if (!nivelEncontrado) {
      return res.status(404).json({
        message: "Nivel no encontrado",
      });
    }




    await nivelEncontrado.destroy();

    return res.json({
      message: "Nivel eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar nivel",
      error: error.message,
    });
  }
};
module.exports = {
  getNiveles,
  getNivelById,
  createNivel,
  updateNivel,
  deleteNivel,
};
