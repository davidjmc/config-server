const express = require('express');
const app = express();
const axios = require('axios');

// Variáveis de ambiente para conexão com MongoDB
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://mongodb:27017';  // URL do MongoDB
const dbName = process.env.DB_NAME || 'meus_produtos';  // Nome do banco

// Conectar ao MongoDB (exemplo usando mongoose)
const mongoose = require('mongoose');
mongoose.connect(mongodbUrl, { dbName: dbName })
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB: ', err);
  });

// API de exemplo
app.get('/produtos', (req, res) => {
  res.json({ message: 'Produtos vindos do MongoDB!' });
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
