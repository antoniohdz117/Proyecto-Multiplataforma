const express = require("express");
const app = express();

const alumnosRoutes = require("./routes/alumnos.routes");

app.use(express.json());
app.use("/api/alumnos", alumnosRoutes);

module.exports = app;