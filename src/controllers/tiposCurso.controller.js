const { tipoCurso } = require("../models");

const getTiposCurso = async (req, res) => {
    try {
        const tipos = await tipoCurso.findAll();
        return res.json({ tipos });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener tipos de curso",
            error: error.message,
        });
    }
};

const getTipoCursoById = async (req, res) => {
    try {
        const tipo = await tipoCurso.findByPk(req.params.id);

        if (!tipo) {
            return res.status(404).json({
                message: "Tipo de curso no encontrado",
            });
        }

        return res.json({ tipo });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener tipo de curso",
            error: error.message,
        });
    }
};

const createTipoCurso = async (req, res) => {
    try {
        const { nombre_tipo } = req.body;

        const nuevo = await tipoCurso.create({ nombre_tipo });

        return res.status(201).json({ tipoCurso: nuevo });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear tipo de curso",
            error: error.message,
        });
    }
};

module.exports = {
    getTiposCurso,
    getTipoCursoById,
    createTipoCurso,
};