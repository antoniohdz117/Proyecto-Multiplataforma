const express = require("express");
const router = express.Router();

const {
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno,
} = require("../controllers/alumnos.controller");

router.get("/", getAlumnos);
router.get("/:id", getAlumnoById);
router.post("/", createAlumno);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);

module.exports = router;