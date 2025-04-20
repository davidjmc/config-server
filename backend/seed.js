const mongoose = require('mongoose');
const Produto = require('./models/Produto');

// Pega configs igual ao index.js
const mongodbUrl = process.env.MONGODB_URL || 'mongodb://mongodb:27017';
const dbName = process.env.DB_NAME || 'meus_produtos';

mongoose.connect(mongodbUrl, { dbName: dbName })
  .then(async () => {
    console.log('✅ Conectado ao MongoDB!');

    await Produto.deleteMany(); // limpa o banco
    await Produto.create([
      { nome: 'Produto A', preco: 19.9 },
      { nome: 'Produto B', preco: 29.9 },
    ]);

    console.log('✅ Produtos inseridos com sucesso!');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar/inserir:', err);
    process.exit(1);
  });
