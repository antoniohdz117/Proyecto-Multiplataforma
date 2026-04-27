const { alumno } = require("../models/alumno.model");
const { EntidadFederativa } = require("../models/entidadFederativa.model");

const getAlumnos = async (req, res) => {
    try {
        const alumnos = await alumno.findAll({
            include: {
                model: EntidadFederativa,
                attributes: ["id_entidad", "nombre_entidad", "abreviatura"],
            },
        });

        return res.json({ alumnos });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener alumnos",
            error: error.message,
        });
    }
};

// GET BY ID
const getAlumnoById = async (req, res) => {
    try {
        const { id } = req.params;

        const alumnoEncontrado = await alumno.findByPk(id, {
            include: {
                model: EntidadFederativa,
                attributes: ["id_entidad", "nombre_entidad", "abreviatura"],
            },
        });

        if (!alumnoEncontrado) {
            return res.status(404).json({
                message: "Alumno no encontrado",
            });
        }

        return res.json({ alumno: alumnoEncontrado });

    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener alumno",
            error: error.message,
        });
    }
};

const createAlumno = async (req, res) => {
    try {
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            foto_perfil,
            id_entidad
        } = req.body;

        const nuevoAlumno = await alumno.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            foto_perfil,
            id_entidad
        });

        return res.status(201).json({ alumno: nuevoAlumno });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear alumno",
            error: error.message,
        });
    }
};

const updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;

        const alumnoEncontrado = await alumno.findByPk(id);

        if (!alumnoEncontrado) {
            return res.status(404).json({
                message: "Alumno no encontrado",
            });
        }

        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            foto_perfil,
            id_entidad
        } = req.body;

        await alumnoEncontrado.update({
            nombre,
            apellido_paterno,
            apellido_materno,
            curp,
            telefono,
            sexo,
            correo_electronico,
            fecha_nacimiento,
            foto_perfil,
            id_entidad
        });

        return res.json({ alumno: alumnoEncontrado });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar alumno",
            error: error.message,
        });
    }
};

// DELETE
const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;

        const alumnoEncontrado = await alumno.findByPk(id);

        if (!alumnoEncontrado) {
            return res.status(404).json({
                message: "Alumno no encontrado",
            });
        }

        await alumnoEncontrado.destroy();

        return res.json({
            message: "Alumno eliminado correctamente",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar alumno",
            error: error.message,
        });
    }
};

module.exports = {
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
};