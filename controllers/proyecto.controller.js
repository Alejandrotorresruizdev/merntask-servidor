const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  // Revisamos si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({ errores: errors.array() });

  try {
    // Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    // Guardar el creado via JWT
    proyecto.creador = req.usuario.id;

    //Guardamos el proyecto
    proyecto.save();

    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
  // Revisamos si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({ errores: errors.array() });

  // Extraer la información del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //obtener el id del proyecto
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) return res.status(500).send("Proyecto no encontrado");

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No tienes permisos" });
    }

    //actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.status(201).json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// Elimina un proyecto por su id

exports.eliminarProyecto = async (req, res) => {
  try {
    //obtener el id del proyecto
    let proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) return res.status(500).send("Proyecto no encontrado");

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No tienes permisos" });
    }

    //eliminar el proyecto
    await Proyecto.findOneAndRemove({ _id: req.params.id });

    res.status(201).json({ msg:'Proyecto eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
