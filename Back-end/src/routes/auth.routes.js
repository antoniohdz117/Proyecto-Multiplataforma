const express = require("express");
const router = express.Router();

// función de autenticación desde el controlador
const { authenticateUser } = require("../controllers/auth.controller");

router.post("/login", authenticateUser);

module.exports = router;