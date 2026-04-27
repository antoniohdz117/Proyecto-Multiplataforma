const { EntidadFederativa } = require("../models/entidadFederativa.model");
const { alumno } = require("../models/alumno.model");

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
        const { nombre_entidad, abreviatura } = req.body;

        if (!nombre_entidad || !abreviatura) {
            return res.status(400).json({
                message: "nombre_entidad y abreviatura son requeridos",
            });
        }

        const nuevaEntidad = await EntidadFederativa.create({
            nombre_entidad,
            abreviatura,
        });

        return res.status(201).json({ entidad: nuevaEntidad });
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
        const { nombre_entidad, abreviatura } = req.body;

        const entidad = await EntidadFederativa.findByPk(id);

        if (!entidad) {
            return res.status(404).json({
                message: "Entidad no encontrada",
            });
        }

        await entidad.update({
            nombre_entidad,
            abreviatura,
        });

        return res.json({ entidad });
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