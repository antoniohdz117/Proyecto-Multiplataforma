const express = require("express");
const router = express.Router();

const {
    getPeriodos,
    getPeriodoById,
    createPeriodo,
} = require("../controllers/periodos.controller");

router.get("/", getPeriodos);
router.get("/:id", getPeriodoById);
router.post("/", createPeriodo);

module.exports = router;