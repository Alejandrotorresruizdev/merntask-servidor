const mongose = require("mongoose");

const TareaSchema = mongose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  proyecto: {
    type: mongose.Schema.Types.ObjectId,
    ref: "Proyecto",
  },
});

module.exports = mongose.model("Tarea", TareaSchema);
