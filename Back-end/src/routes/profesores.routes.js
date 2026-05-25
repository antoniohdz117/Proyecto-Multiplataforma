const express = require("express");
const router = express.Router();

const {
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor,

} = require("../controllers/profesores.controller");
const { profesor } = require("../models");

router.get("/", getProfesores);
router.get("/:id", getProfesorById);
router.post("/", createProfesor);
router.put("/", updateProfesor);
router.delete("/", deleteProfesor);
module.exports = router;