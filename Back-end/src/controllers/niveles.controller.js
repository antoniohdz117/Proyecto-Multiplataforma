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

module.exports = {
    getNiveles,
    getNivelById,
    createNivel,
};