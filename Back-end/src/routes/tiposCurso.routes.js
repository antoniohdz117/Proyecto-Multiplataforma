const express = require("express");
const router = express.Router();

const {
    getTiposCurso,
    getTipoCursoById,
    createTipoCurso,
} = require("../controllers/tiposCurso.controller");

router.get("/", getTiposCurso);
router.get("/:id", getTipoCursoById);
router.post("/", createTipoCurso);

module.exports = router;