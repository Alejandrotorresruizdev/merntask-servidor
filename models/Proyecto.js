const mongose = require("mongoose");

const ProyectoSchema = mongose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  creador: {
    type: mongose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongose.model("Proyecto", ProyectoSchema);
