const { profesor } = require("../models");
const { deleteAlumno } = require("./alumnos.controller");

// REGEX PARA VALIDACIÓN DE PROFESOR
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
const regexCURP = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/;
const regexRFC = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
const regexTelefono = /^[0-9]{10}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
const regexSexo = /^(M|F|Masculino|Femenino)$/i;

const validarProfesor = (datos) => {
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
  } = datos;

  if (!nombre) {
    return "El nombre es obligatorio";
  }

  if (!apellido_paterno) {
    return "El apellido paterno es obligatorio";
  }

  if (!apellido_materno) {
    return "El apellido materno es obligatorio";
  }

  if (!curp) {
    return "La CURP es obligatoria";
  }

  if (!rfc) {
    return "El RFC es obligatorio";
  }

  if (!telefono) {
    return "El teléfono es obligatorio";
  }

  if (!sexo) {
    return "El sexo es obligatorio";
  }

  if (!correo_electronico) {
    return "El correo electrónico es obligatorio";
  }

  if (!fecha_nacimiento) {
    return "La fecha de nacimiento es obligatoria";
  }

  if (!sueldo) {
    return "El sueldo es obligatorio";
  }

  if (!regexNombre.test(nombre)) {
    return "El nombre solo debe contener letras y tener entre 2 y 50 caracteres";
  }

  if (!regexNombre.test(apellido_paterno)) {
    return "El apellido paterno solo debe contener letras y tener entre 2 y 50 caracteres";
  }

  if (!regexNombre.test(apellido_materno)) {
    return "El apellido materno solo debe contener letras y tener entre 2 y 50 caracteres";
  }

  if (!regexCURP.test(curp)) {
    return "La CURP no tiene un formato vAlido";
  }

  if (!regexRFC.test(rfc)) {
    return "El RFC no tiene un formato válido";
  }

  if (!regexTelefono.test(String(telefono))) {
    return "El teléfono debe tener exactamente 10 dígitos";
  }

  if (!regexSexo.test(sexo)) {
    return "El sexo debe ser M, F, Masculino o Femenino";
  }

  if (!regexCorreo.test(correo_electronico)) {
    return "El correo electrónico no tiene un formato válido";
  }

  if (!regexFecha.test(fecha_nacimiento)) {
    return "La fecha de nacimiento debe tener el formato YYYY-MM-DD";
  }

  if (isNaN(Number(sueldo))) {
    return "El sueldo debe ser un número";
  }

  if (Number(sueldo) <= 0) {
    return "El sueldo debe ser mayor a 0";
  }

  return null;
};

const manejarErrorSequelize = (res, error, mensajeDefault) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Ya existe un profesor con alguno de los datos enviados",
      campos: error.errors.map((e) => e.path),
    });
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Error de validación",
      errores: error.errors.map((e) => e.message),
    });
  }

  return res.status(500).json({
    message: mensajeDefault,
    error: error.message,
  });
};

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
    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del profesor debe ser un número",
      });
    }

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
    const errorValidacion = validarProfesor(req.body);
    if (errorValidacion) {
      return res.status(400).json({ message: errorValidacion });
    }

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
    return manejarErrorSequelize(res, error, "Error al crear profesor");
  }
};

const updateProfesor = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del profesor debe ser un número",
      });
    }

    const profesorEncontrado = await profesor.findByPk(id);

    if (!profesorEncontrado) {
      return res.status(404).json({
        message: "Profesor no encontrado",
      });
    }

    const datosActuales = profesorEncontrado.toJSON();

    const datosActualizados = {
      ...datosActuales,
      ...req.body,
    };

    if (datosActualizados.curp) {
      datosActualizados.curp = datosActualizados.curp.trim().toUpperCase();
    }

    if (datosActualizados.rfc) {
      datosActualizados.rfc = datosActualizados.rfc.trim().toUpperCase();
    }

    if (datosActualizados.correo_electronico) {
      datosActualizados.correo_electronico =
        datosActualizados.correo_electronico.trim();
    }

    if (datosActualizados.nombre) {
      datosActualizados.nombre = datosActualizados.nombre.trim();
    }

    if (datosActualizados.apellido_paterno) {
      datosActualizados.apellido_paterno =
        datosActualizados.apellido_paterno.trim();
    }

    if (datosActualizados.apellido_materno) {
      datosActualizados.apellido_materno =
        datosActualizados.apellido_materno.trim();
    }

    if (datosActualizados.fecha_nacimiento instanceof Date) {
      datosActualizados.fecha_nacimiento = datosActualizados.fecha_nacimiento
        .toISOString()
        .split("T")[0];
    }

    if (
      typeof datosActualizados.fecha_nacimiento === "string" &&
      datosActualizados.fecha_nacimiento.includes("T")
    ) {
      datosActualizados.fecha_nacimiento =
        datosActualizados.fecha_nacimiento.split("T")[0];
    }

    const errorValidacion = validarProfesor(datosActualizados);

    if (errorValidacion) {
      return res.status(400).json({
        message: errorValidacion,
      });
    }

    await profesorEncontrado.update({
      nombre: datosActualizados.nombre,
      apellido_paterno: datosActualizados.apellido_paterno,
      apellido_materno: datosActualizados.apellido_materno,
      curp: datosActualizados.curp,
      rfc: datosActualizados.rfc,
      telefono: datosActualizados.telefono,
      sexo: datosActualizados.sexo,
      correo_electronico: datosActualizados.correo_electronico,
      fecha_nacimiento: datosActualizados.fecha_nacimiento,
      sueldo: datosActualizados.sueldo,
    });

    return res.json({
      message: "Profesor actualizado correctamente",
      profesor: profesorEncontrado,
    });
  } catch (error) {
    return manejarErrorSequelize(res, error, "Error al actualizar profesor");
  }
};
//DELETE

const deleteProfesor = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del profesor debe ser un número",
      });
    }


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
