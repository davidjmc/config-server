// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const port = 3000;

// Buscar configuração do Config Server
async function carregarConfiguracao() {
  try {
    const response = await axios.get('http://config-server:8888/application/default');
    const config = response.data.propertySources[0].source;

    const mongoUrl = config['spring.datasource.url']
      .replace('jdbc:mysql://', 'mongodb://')
      .replace('meubanco', 'meus_dados'); // usando nome do banco do MongoDB

    await mongoose.connect(mongoUrl, {
      user: config['spring.datasource.username'],
      pass: config['spring.datasource.password'],
      dbName: 'meus_dados'
    });

    console.log('✅ Conectado ao MongoDB com sucesso.');

    // Definindo modelo simples
    const Produto = mongoose.model('Produto', new mongoose.Schema({
      nome: String,
      preco: Number
    }));

    app.get('/produtos', async (req, res) => {
      const produtos = await Produto.find();
      res.json(produtos);
    });

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('❌ Erro ao carregar configuração ou conectar no banco:', error.message);
  }
}

carregarConfiguracao();
