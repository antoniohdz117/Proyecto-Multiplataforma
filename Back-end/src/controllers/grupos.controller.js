const { grupo } = require("../models");



const getGrupos = async (req, res) => {
  try {
    const grupos = await grupo.findAll();
    return res.json({ grupos });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener grupos",
      error: error.message,
    });
  }
};

const getGrupoById = async (req, res) => {
  try {
    const grupoEncontrado = await grupo.findByPk(req.params.id);

    if (!grupoEncontrado) {
      return res.status(404).json({
        message: "Grupo no encontrado",
      });
    }

    return res.json({ grupo: grupoEncontrado });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener grupo",
      error: error.message,
    });
  }
};

const createGrupo = async (req, res) => {
  try {
    const { nombre_grupo } = req.body;

    const nuevoGrupo = await grupo.create({
      nombre_grupo, // whitelist
    });

    return res.status(201).json({ grupo: nuevoGrupo });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear grupo",
      error: error.message,
    });
  }
};

const updateGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del grupo debe ser un número",
      });
    }

    const grupoEncontrado = await grupo.findByPk(id);

    if (!grupoEncontrado) {
      return res.status(404).json({
        message: "Grupo no encontrado",
      });
    }

    const { nombre_grupo } = req.body;
    await grupoEncontrado.update({
      nombre_grupo,
    });

    return res.json({ grupo: grupoEncontrado });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar grupo",
      error: error.message,
    });
  }
};

//delete para grupo
const deleteGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del grupo debe ser un número",
      });
    }

    const grupoEncontrado = await grupo.findByPk(id);

    if (!grupoEncontrado) {
      return res.status(404).json({
        message: "Grupo no encontrado",
      });
    }

    await grupoEncontrado.destroy();

    return res.json({ message: "Grupo eliminado autorizado" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al este grupo",
      error: error.message,
    });
  }
};

module.exports = {
  getGrupos,
  getGrupoById,
  createGrupo,
    updateGrupo,
    deleteGrupo,
    
};
