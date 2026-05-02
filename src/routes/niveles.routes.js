const express = require("express");
const router = express.Router();

const {
    getNiveles,
    getNivelById,
    createNivel,
} = require("../controllers/niveles.controller");

router.get("/", getNiveles);
router.get("/:id", getNivelById);
router.post("/", createNivel);

module.exports = router;