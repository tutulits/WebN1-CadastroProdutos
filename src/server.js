const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    } else {
        console.log('Conectado ao banco de dados MySql.');
    }
});

// Inserindo um novo produto
app.post('/adicionar', (req, res) => {
    const { nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro } = req.body;
    const query = 'INSERT INTO produto (nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?)';
    conexao.query(query, [nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao adicionar produto:', erro);
            res.status(500).send('Erro ao adicionar produto: ' + erro.sqlMessage); // Detalhes do erro do MySQL
        } else {
            res.send('produto adicionado com sucesso!');
        }
    });
});
