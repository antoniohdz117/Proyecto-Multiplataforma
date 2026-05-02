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
            nombre_grupo, // whitelist 🔥
        });

        return res.status(201).json({ grupo: nuevoGrupo });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear grupo",
            error: error.message,
        });
    }
};

module.exports = {
    getGrupos,
    getGrupoById,
    createGrupo,
};