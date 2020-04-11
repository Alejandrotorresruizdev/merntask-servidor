const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  // Revisamos si hay errores
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).send({ errores: errors.array() });

  // extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });

    if (!usuario) return res.status(400).json({ msg: "El usuario no existe" });

    const passCorrecto = await bcryptjs.compare(password, usuario.password);

    if (!passCorrecto)
      return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    // firmar el token
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.status(201).send({ token });
      }
    );
  } catch (error) {}
};

exports.usuarioAutenticado = async (req,res) => {
  try {
      const usuario = await Usuario.findById(req.usuario.id).select('-password');
      res.json({usuario})
  } catch (error) {
    res.status(500).send({ msg:'Hubo un error' });
  }
}