const express = require("express");
const app = express();

const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Configuración de EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Middleware para recibir JSON
app.use(express.json());
//para recibir datos de formularios
app.use(express.urlencoded({ extended: true }));


// Ruta principal
app.get("/", (req, res) => {
  res.render("home");
});

// Ruta principal
app.get("/index", (req, res) => {
  res.render("index");
});

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
const alumnosRoutes = require("./routes/alumnos.routes");
const entidadesRoutes = require("./routes/entidades.routes");
const profesoresRoutes = require("./routes/profesores.routes");
const asignaturasRoutes = require("./routes/asignaturas.routes");
const tiposCursoRoutes = require("./routes/tiposCurso.routes");
const gruposRoutes = require("./routes/grupos.routes");
const periodosRoutes = require("./routes/periodos.routes");
const nivelesRoutes = require("./routes/niveles.routes");
const ofertasRoutes = require("./routes/ofertas.routes");
const cursosRoutes = require("./routes/cursos.routes");
//ruta para la autenticación
const authRoutes = require("./routes/auth.routes");
// Endpoints
app.use("/api/cursos", cursosRoutes);
app.use("/api/ofertas", ofertasRoutes);
app.use("/api/niveles", nivelesRoutes);
app.use("/api/periodos", periodosRoutes);
app.use("/api/grupos", gruposRoutes);
app.use("/api/tipos-curso", tiposCursoRoutes);
app.use("/api/asignaturas", asignaturasRoutes);
app.use("/api/profesores", profesoresRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/entidades", entidadesRoutes);
//se agrega la ruta para la autenticación
app.use("/api/auth", authRoutes);

module.exports = app;