const { periodoAcademico } = require("../models");

const getPeriodos = async (req, res) => {
    try {
        const periodos = await periodoAcademico.findAll();
        return res.json({ periodos });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener periodos",
            error: error.message,
        });
    }
};

const getPeriodoById = async (req, res) => {
    try {
        const periodo = await periodoAcademico.findByPk(req.params.id);

        if (!periodo) {
            return res.status(404).json({
                message: "Periodo no encontrado",
            });
        }

        return res.json({ periodo });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener periodo",
            error: error.message,
        });
    }
};

const createPeriodo = async (req, res) => {
    try {
        const { periodo_nombre, fecha_inicio, fecha_fin } = req.body;

        if (!periodo_nombre || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const nuevoPeriodo = await periodoAcademico.create({
            periodo_nombre,
            fecha_inicio,
            fecha_fin,
        });

        return res.status(201).json({ periodo: nuevoPeriodo });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear periodo",
            error: error.message,
        });
    }
};

module.exports = {
    getPeriodos,
    getPeriodoById,
    createPeriodo,
};