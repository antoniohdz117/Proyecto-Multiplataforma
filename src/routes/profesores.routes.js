const express = require("express");
const router = express.Router();

const {
    getProfesores,
    getProfesorById,
    createProfesor,
} = require("../controllers/profesores.controller");

router.get("/", getProfesores);
router.get("/:id", getProfesorById);
router.post("/", createProfesor);

module.exports = router;