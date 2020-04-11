// Rutas para crear usuarios

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

const {
  check
} = require("express-validator");

// Crea un usuario
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check('password', 'El password debe de ser minimo de 6').isLength({
      min: 6
    })
  ],
  usuarioController.crearUsuario
);

module.exports = router;
