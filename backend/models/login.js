// importar o pacote 'mongoose'
const mongoose = require('mongoose');

// Definir o esquema dos nossos dados
const loginSchema = mongoose.Schema( {
  usuario: {
    type: String,
    required: false,
   },
  senha: {
    type: String,
    required: false,
  }
} );

// Criar um modelo associado ao esquema:
module.exports = mongoose.model('Login', loginSchema)
