const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  auth,
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

router.get("/", auth, proyectoController.obtenerProyectos);

router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

// Eliminar un proyecto
router.delete(
    "/:id",
    auth,
    proyectoController.eliminarProyecto
  );
  
module.exports = router;
