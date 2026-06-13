const { alumno } = require("../models/alumno.model");
const { profesor } = require("../models/profesor.model");


const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar el usuario en la base de datos
    let user = await alumno.findOne({ where: { email } });
    let role = 'alumno';
    if (!user) {
      user = await profesor.findOne({ where: { email } });
      role = 'profesor';
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    // Verificar la contraseña (aquí deberías usar hashing en producción)
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token de autenticación (aquí podrías usar JWT) pero no se hacerlo con JS solo con springboot
    //const token = "fake-jwt-token"; // Reemplaza esto con la generación real de tokens

    return res.json({
      message: "Autenticación exitosa",
      user: {
        id: user.id,
        email: user.email,
        role
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al autenticar usuario",
        error: error.message,
    });
}
};

module.exports = {
    authenticateUser,

}