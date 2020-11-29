// importar o pacote 'mongoose'
const mongoose = require('mongoose');

// Definir o esquema dos nossos dados
const lembreteSchema = mongoose.Schema( {
  datacadastro: {
    type: String,
    required: false,
   },
  datarealizar: {
    type: String,
    required: false,
  },
  descricao: {
    type: String,
    required: true
  }
} );

// Criar um modelo associado ao esquema:
module.exports = mongoose.model('Lembrete', lembreteSchema)
