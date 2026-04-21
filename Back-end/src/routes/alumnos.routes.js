const express = require("express");
const router = express.Router();

const {
    getAlumnos,
    createAlumno,
} = require("../controllers/alumnos.controller");

router.get("/", getAlumnos);
router.post("/", createAlumno);

module.exports = router;