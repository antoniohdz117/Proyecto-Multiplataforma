const express = require("express");
const router = express.Router();

const {
    getOfertas,
    getOfertaById,
    createOferta,
} = require("../controllers/ofertas.controller");

router.get("/", getOfertas);
router.get("/:id", getOfertaById);
router.post("/", createOferta);

module.exports = router;