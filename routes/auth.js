// Rutas para autentificar usuarios
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

// Crea un usuario
router.post(
  "/",
  // [
  //   check("email", "Agrega un email válido").isEmail(),
  //   check("password", "El password debe de ser minimo de 6").isLength({
  //     min: 6,
  //   }),
  // ],
  authController.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get("/", auth, authController.usuarioAutenticado);
module.exports = router;
