const { alumno } = require("../models/alumno.model");
const { EntidadFederativa } = require("../models/entidadFederativa.model");

//validar los campos de alumno SERA POR REGEX PEDIDO POR HENDERSON
const regexNumeroCuenta = /^[0-9]{9}$/;
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
const regexCURP = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/;
const regexTelefono = /^[0-9]{10}$/;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
const regexSexo = /^(M|F|Masculino|Femenino)$/i;

//validacion de cada campo del alumno
const validarAlumno = (datos) => {
  const {
    numero_cuenta,
    nombre,
    apellido_paterno,
    apellido_materno,
    curp,
    telefono,
    sexo,
    correo_electronico,
    fecha_nacimiento,
    id_entidad,
  } = datos;

  //cada campo mapeado
  if (!numero_cuenta) {
  return "El número de cuenta es obligatorio";
}

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

if (!id_entidad) {
  return "La entidad federativa es obligatoria";
}

  if (!regexNumeroCuenta.test(String(numero_cuenta))) {
    return "El No de cuenta debe tener exactamente 9 numeros";
  }

  if (!regexNombre.test(nombre)) {
    return "El nombre solo debe contener letras y tener entre 2 y 20 caracteres";
  }

  if (!regexNombre.test(apellido_paterno)) {
    return "El apellido paterno solo debe contener letras y tener entre 2 y 30 caracteres";
  }

  if (!regexNombre.test(apellido_materno)) {
    return "El apellido materno solo debe contener letras y tener entre 2 y 30 caracteres";
  }

  if (!regexCURP.test(curp)) {
    return "La CURP no tiene un formato válido";
  }

  if (!regexTelefono.test(String(telefono))) {
    return "El teléfono debe tener exactamente 10 digitos sin - o algun carecter expecial";
  }

  if (!regexSexo.test(sexo)) {
    return "El sexo debe ser M, F, Masculino o Femenino";
  }

  if (!regexCorreo.test(correo_electronico)) {
    return "El correo electronico no tiene un formato valido";
  }

  if (!regexFecha.test(fecha_nacimiento)) {
    return "La fecha de nacimiento debe tener el formato YYYY-MM-DD";
  }

  if (isNaN(Number(id_entidad))) {
    return "El id_entidad debe ser un numero 1,2,3,4,5 etc";
  }

  return null;
};

const manejarErrorSequelize = (res, error, mensajeDefault) => {
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      message: "Ya existe un registro con alguno de los datos enviados",
      campos: error.errors.map((e) => e.path),
    });
  }

  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: "Error de validación",
      errores: error.errors.map((e) => e.message),
    });
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      message: "La entidad federativa enviada no existe",
    });
  }

  return res.status(500).json({
    message: mensajeDefault,
    error: error.message,
  });
};

//get

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

    //segun valido el numero de cuenta con regex, aqui valido que el id sea un numero para evitar errores al hacer la consulta a la base de datos
    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del alumno debe ser un número",
      });
    }

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

//create o post
const createAlumno = async (req, res) => {
  try {
    //manejo de errores en los campos
    const errorValidacion = validarAlumno(req.body);

    // para validacion de errores
    if (errorValidacion) {
      return res.status(400).json({
        message: errorValidacion,
      });
    }

    const {
      numero_cuenta,
      nombre,
      apellido_paterno,
      apellido_materno,
      curp,
      telefono,
      sexo,
      correo_electronico,
      fecha_nacimiento,
      foto_perfil,
      id_entidad,
    } = req.body;

    //

    const entidadExiste = await EntidadFederativa.findByPk(id_entidad);

    if (!entidadExiste) {
      return res.status(404).json({
        message: "La entidad federativa no existe",
      });
    }

    const nuevoAlumno = await alumno.create({
      numero_cuenta,
      nombre,
      apellido_paterno,
      apellido_materno,
      curp,
      telefono,
      sexo,
      correo_electronico,
      fecha_nacimiento,
      foto_perfil,
      id_entidad,
    });

    return res.status(201).json({ alumno: nuevoAlumno });
  } catch (error) {
    return manejarErrorSequelize(res, error, "Error al crear alumno");
  }
};

//update  y put
const updateAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del alumno debe ser un número",
      });
    }

    const alumnoEncontrado = await alumno.findByPk(id);

    if (!alumnoEncontrado) {
      return res.status(404).json({
        message: "Alumno no encontrado",
      });
    }

    // 3. Validar campos del body
    const errorValidacion = validarAlumno({
      numero_cuenta: id,
      ...req.body,
    });

    if (errorValidacion) {
      return res.status(400).json({
        message: errorValidacion,
      });
    }

    const {
      numero_cuenta,
      nombre,
      apellido_paterno,
      apellido_materno,
      curp,
      telefono,
      sexo,
      correo_electronico,
      fecha_nacimiento,
      foto_perfil,

      id_entidad,
    } = req.body;

    const entidadExiste = await EntidadFederativa.findByPk(id_entidad);

    if (!entidadExiste) {
      return res.status(404).json({
        message: "La entidad federativa no existe",
      });
    }

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
      id_entidad,
    });
    return res.json({
      //alumno actualizado no es creado
      message: "Alumno actualizado correctamente",
      alumno: alumnoEncontrado,
    });
  } catch (error) {
    return manejarErrorSequelize(res, error, "Error al actualizar alumno");
  }
};

// DELETE
const deleteAlumno = async (req, res) => {
  try {
    const { id } = req.params;

    //VALIDAMOS EL NUMERO DE CUENTA CON EL MISMO REGEX QUE EN LA CREACION Y ACTUALIZACION, PARA EVITAR ERRORES AL HACER LA CONSULTA A LA BASE DE DATOS
    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "El id del alumno debe ser un número",
      });
    }

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
