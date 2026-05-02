const express = require("express");
const router = express.Router();

const {
    getGrupos,
    getGrupoById,
    createGrupo,
} = require("../controllers/grupos.controller");

router.get("/", getGrupos);
router.get("/:id", getGrupoById);
router.post("/", createGrupo);

module.exports = router;