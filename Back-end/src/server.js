require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./config/connection");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // 1. Probar conexión a la DB
        await sequelize.authenticate();
        console.log("Conexión a la base de datos exitosa");

        // 2. Sincronizar modelos (opcional en prod)
        await sequelize.sync({ alter: false });
        console.log("Modelos sincronizados");

        // 3. Levantar servidor
        app.listen(PORT, () => {
            console.log(`Server corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
    }
};

startServer();