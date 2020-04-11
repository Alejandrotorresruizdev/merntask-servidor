const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tarea.controller");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  auth,
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  tareaController.creaTarea
);

router.get("/", auth,tareaController.obtenerTareas);

router.put("/:id",auth,tareaController.actualizarTarea);

// Eliminar tarea
router.delete('/:id',auth,tareaController.eliminarTarea);

module.exports = router;
