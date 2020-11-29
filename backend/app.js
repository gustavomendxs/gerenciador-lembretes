const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');

const mongoose = require('mongoose');

const Lembrete = require('./models/lembrete')
const Login = require ('./models/login')

app.use (bodyParser.json());

mongoose.connect('mongodb+srv://user:9wLvSEYrc0UQwnTI@cluster0.oy2m4.mongodb.net/gerenciador-atividades?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true
   })
  .then(() => {
    console.log("Conexão OK!");
  })
  .catch((error) => {
    console.log("Conexão não funcionou!");
    console.log(error);
  })


app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  next();
});

app.get('/api/lembretes', (req, res, next) => {
  Lembrete.find().then(
    documents => {
      res.status(200).json(
        {
          mensagem: "Tudo OK",
          lembretes: documents
        }
      );
    }
  );
});

app.post('/api/lembretes', (req, res, next) => {
  const lembrete = new Lembrete({
    datacadastro: req.body.datacadastro,
    datarealizar: req.body.datarealizar,
    descricao: req.body.descricao
  });

  lembrete.save()
    .then (lembreteInserido => {
      res.status(201).json({
        mensagem: 'Lembrete inserido',
        id: lembreteInserido._id
      })
    })
  });

app.delete('/api/lembretes/:id', (req, res, next) => {

  Lembrete.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Lembrete removido"})
  });
});

app.put("/api/lembretes/:id", (req, res, next) => {

  const lembrete = new Lembrete({
    _id: req.params.id,
    datacadastro: req.body.datacadastro,
    datarealizar: req.body.datarealizar,
    descricao: req.body.descricao
  });

 Lembrete.updateOne({
      _id: req.params.id
    },
    lembrete
  ).then( (resultado) => {
    console.log(resultado);
  });
  res.status(200).json({
    mensagem: 'Atualização realizada com sucesso!'
  });

});

app.post('/api/login', (req, res, next) => {

    Login.findOne({
      usuario: req.body.usuario,
      senha: req.body.senha
    })
    .then((feedback) => {
      console.log(feedback)
      if(feedback != null)
        res.status(200).json ({ mensagem: 'Sucesso'})

      else
        res.status(200).json ({ mensagem: 'Falha'})
    }).catch((error) => {
    })
  });

module.exports = app;
