db = db.getSiblingDB('meus_dados'); // nome do banco
db.produtos.insertMany([
  { nome: "Produto A", preco: 10.99 },
  { nome: "Produto B", preco: 25.50 }
]);
