const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");

const { validationResult } = require("express-validator");

exports.creaTarea = async (req, res) => {
  // Revisamos si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({ errores: errors.array() });

  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto)
      return res.status(400).send({ msg: "Proyecto no encontrado" });

    // Revisar si el proyecto actual pertenece al usuario logeado
    if (existeProyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes permisos" });

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto)
      return res.status(400).send({ msg: "Proyecto no encontrado" });

    // Revisar si el proyecto actual pertenece al usuario logeado
    if (existeProyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes permisos" });

    // Obtener tareas por proyectos
    const tareas = await Tarea.find({ proyecto });

    return res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    // Revisar si existe la tarea
    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste)
      return res.status(404).json({ msg: "La tarea no existe" });

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto)
      return res.status(400).send({ msg: "Proyecto no encontrado" });

    // Revisar si el proyecto actual pertenece al usuario logeado
    if (existeProyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes permisos" });

    // Crear un objeto con la nueva información
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;

    nuevaTarea.estado = estado;

    // Guardar la tarea
    tareaExiste = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      nuevaTarea,
      { new: true }
    );

    return res.json({ tareaExiste });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.query;

    // Revisar si existe la tarea
    let tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste)
      return res.status(404).json({ msg: "La tarea no existe" });

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    if (!existeProyecto)
      return res.status(400).send({ msg: "Proyecto no encontrado" });

    // Revisar si el proyecto actual pertenece al usuario logeado
    if (existeProyecto.creador.toString() !== req.usuario.id)
      return res.status(401).json({ msg: "No tienes permisos" });

    // Eliminar la tarea
    await Tarea.findOneAndRemove({_id:req.params.id});

    return res.json({msg:'Tarea eliminada'})

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
