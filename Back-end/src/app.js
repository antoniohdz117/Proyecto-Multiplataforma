const express = require("express");
const app = express();

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

app.use(express.json());
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

module.exports = app;