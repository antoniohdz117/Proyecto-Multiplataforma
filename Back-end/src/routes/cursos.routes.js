const express = require("express");
const router = express.Router();

const {
    getCursos,
    getCursoById,
    createCurso,
} = require("../controllers/cursos.controller");

router.get("/", getCursos);
router.get("/:id", getCursoById);
router.post("/", createCurso);

module.exports = router;