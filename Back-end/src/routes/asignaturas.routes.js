const express = require("express");
const router = express.Router();

const {
    getAsignaturas,
    getAsignaturaById,
    createAsignatura,
} = require("../controllers/asignaturas.controller");

router.get("/", getAsignaturas);
router.get("/:id", getAsignaturaById);
router.post("/", createAsignatura);

module.exports = router;