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
        const nuevoAlumno = await alumno.create(req.body);
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