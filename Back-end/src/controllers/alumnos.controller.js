const { alumno } = require("../models/alumno.model");

const getAlumnos = async (req, res) => {
    try {
        const alumnos = await alumno.findAll();
        return res.json({ alumnos });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener alumnos",
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

module.exports = {
    getAlumnos,
    createAlumno,
};