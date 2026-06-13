const express = require("express");
const router = express.Router();

const {
    getGrupos,
    getGrupoById,
    createGrupo,
    updateGrupo,
    deleteGrupo,
} = require("../controllers/grupos.controller");

router.get("/", getGrupos);
router.get("/:id", getGrupoById);
router.post("/", createGrupo);
router.put("/:id", updateGrupo);
router.delete("/:id", deleteGrupo);

module.exports = router;