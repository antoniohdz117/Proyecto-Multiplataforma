const { profesor } = require("../models");

const getProfesores = async (req, res) => {
    try {
        const profesores = await profesor.findAll();
        return res.json({ profesores });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener profesores",
            error: error.message,
        });
    }
};

const getProfesorById = async (req, res) => {
    try {
        const { id } = req.params;

        const prof = await profesor.findByPk(id);

        if (!prof) {
            return res.status(404).json({
                message: "Profesor no encontrado",
            });
        }

        return res.json({ profesor: prof });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener profesor",
            error: error.message,
        });
    }
};

const createProfesor = async (req, res) => {
    try {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            rfc,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            sueldo,
        } = req.body;

        const nuevoProfesor = await profesor.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            rfc,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            sueldo,
        });

        return res.status(201).json({ profesor: nuevoProfesor });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear profesor",
            error: error.message,
        });
    }
};

module.exports = {
    getProfesores,
    getProfesorById,
    createProfesor,
};