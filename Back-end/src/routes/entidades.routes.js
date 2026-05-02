const express = require("express");
const router = express.Router();

const {
    getEntidades,
    getEntidadById,
    createEntidad,
    updateEntidad,
    deleteEntidad,
    getAlumnosByEntidad,
} = require("../controllers/entidades.controller");

router.get("/", getEntidades);
router.get("/:id/alumnos", getAlumnosByEntidad);
router.get("/:id", getEntidadById);
router.post("/", createEntidad);
router.put("/:id", updateEntidad);
router.delete("/:id", deleteEntidad);
module.exports = router;