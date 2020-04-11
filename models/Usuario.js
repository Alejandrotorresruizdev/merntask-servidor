const mongose = require('mongoose');

const UsuariosSchema = mongose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  registro: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongose.model('Usuario', UsuariosSchema);
