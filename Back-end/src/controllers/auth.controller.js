const { alumno } = require("../models/alumno.model");

const regexNumeroCuenta = /^[0-9]{6,12}$/;
const regexFecha = /^\d{8}$/;

//fucnon para convertir la fecha de nacimiento del formato DDMMYYYY al formato YYYY-MM-DD
const convertirFecha = (fecha) => {
  const dia = fecha.substring(0, 2);
  const mes = fecha.substring(2, 4);
  const anio = fecha.substring(4, 8);

  return `${anio}-${mes}-${dia}`;
};

const authenticateUser = async (req, res) => {
  try {
    let { numero_cuenta, fecha_nacimiento } = req.body;

    if (!numero_cuenta) {
      return res.status(400).json({
        message: "El número de cuenta es obligatorio",
      });
    }

    if (!fecha_nacimiento) {
      return res.status(400).json({
        message: "La fecha de nacimiento es obligatoria",
      });
    }

    numero_cuenta = String(numero_cuenta).trim();
    fecha_nacimiento = String(fecha_nacimiento).trim();

    if (!regexNumeroCuenta.test(numero_cuenta)) {
      return res.status(400).json({
        message: "El número de cuenta solo debe contener números",
      });
    }

    if (!regexFecha.test(fecha_nacimiento)) {
      return res.status(400).json({
        message:
          "La fecha de nacimiento debe tener formato DDMMYYYY. Ejemplo: 27092003",
      });
    }

    const fechaConvertida = convertirFecha(fecha_nacimiento);

    const user = await alumno.findOne({
      where: {
        numero_cuenta,
        fecha_nacimiento: fechaConvertida,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Número de cuenta o fecha de nacimiento incorrectos",
      });
    }

    return res.json({
      
      user: {
        numero_cuenta: user.numero_cuenta,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        apellido_materno: user.apellido_materno,
        role: "alumno",
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al autenticar usuario",
      error: error.message,
    });
  }
};

module.exports = {
  authenticateUser
};
