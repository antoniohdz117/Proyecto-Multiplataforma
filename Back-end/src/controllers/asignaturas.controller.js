const { asignatura } = require("../models");

const getAsignaturas = async (req, res) => {
    try {
        const asignaturas = await asignatura.findAll();
        return res.json({ asignaturas });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener asignaturas",
            error: error.message,
        });
    }
};

const getAsignaturaById = async (req, res) => {
    try {
        const { id } = req.params;

        const asignaturaEncontrada = await asignatura.findByPk(id);

        if (!asignaturaEncontrada) {
            return res.status(404).json({
                message: "Asignatura no encontrada",
            });
        }

        return res.json({ asignatura: asignaturaEncontrada });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener asignatura",
            error: error.message,
        });
    }
};

const createAsignatura = async (req, res) => {
    try {
        const { nombre } = req.body;

        const nuevaAsignatura = await asignatura.create({
            nombre,
        });

        return res.status(201).json({ asignatura: nuevaAsignatura });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear asignatura",
            error: error.message,
        });
    }
};

module.exports = {
    getAsignaturas,
    getAsignaturaById,
    createAsignatura,
};