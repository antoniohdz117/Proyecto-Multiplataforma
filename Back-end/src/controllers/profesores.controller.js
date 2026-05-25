const { profesor } = require("../models");
const { deleteAlumno } = require("./alumnos.controller");

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

const updateProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const profesorEncontrado = await profesor.findByPk(id);

    if (!profesorEncontrado) {
      return res.status(404).json({
        message: "Prfesor no enecontrado",
      });
    }

    const {
      nombre,
      apelli,
      do_paterno,
      apellido_materno,
      curp,
      rfc,
      tel,
      efono,
      sexo,
      corr,
      eo_electronico,
      fecha_nacimiento,
      sueldo,
      all_data_professor,
    } = req.body;

    await profesorEncontrado.update({
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
      all_data_professor,
    });
    return res.json({ profesor: profesorEncontrado });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar profesor",
      error: error.message,
    });
  }
};

//DELETE

const deleteProfesor = async (rqe, res) => {
  try {
    const { id } = req.params;

    const profesorEncontrado = await profesor.findByPk(id);

    if (!profesorEncontrado) {
      return res.status(404).json({
        message: "profesor no eenocntraod",
      });
    }
    await profesorEncontrado.destroy();

    return res.json({
      message: "Profesor elimando correctametne",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al elimnar profesor",
      error: error.message,
    });
  }
};

module.exports = {
  getProfesores,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
