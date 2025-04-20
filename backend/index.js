const express = require('express');
const app = express();
const axios = require('axios');
const Produto = require('./models/Produto');

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
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});
