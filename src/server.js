const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
});

// Conectar ao banco de dados
conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    } else {
        console.log('Conectado ao banco de dados MySQL.');
    }

    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});

// Inserindo um novo produto
app.post('/adicionar', (req, res) => {
    const { nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro, validade, quantidade } = req.body;

    // Validação simples para garantir que todos os campos obrigatórios foram enviados
    if (!nome_produto || !descricao || !categoria || !preco || !quantidade_estoque || !fornecedor || !data_cadastro || !validade || !quantidade) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    const query = `INSERT INTO produto 
                   (nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro, validade, quantidade) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    conexao.query(query, [nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro, validade, quantidade], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao adicionar produto:', erro);
            return res.status(500).send('Erro ao adicionar produto: ' + erro.sqlMessage);
        }
        res.send('Produto adicionado com sucesso!');
    });
});

// Inserindo uma nova categoria
app.post('/categoria', (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).send('Nome e descrição da categoria são obrigatórios.');
    }

    const query = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)';
    conexao.query(query, [nome, descricao], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao adicionar categoria:', erro);
            return res.status(500).send('Erro ao adicionar categoria: ' + erro.sqlMessage);
        }
        res.send('Categoria adicionada com sucesso!');
    });
});

// Rota para buscar todas as categorias
app.get('/categorias', (req, res) => {
    const query = 'SELECT id_categoria, nome FROM categorias';
    
    conexao.query(query, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar categorias:', erro);
            return res.status(500).send('Erro ao buscar categorias: ' + erro.sqlMessage);
        }
        res.json(resultados);  // Retorna as categorias em formato JSON
    });
});

// Tratamento para rotas não existentes
app.use((req, res) => {
    res.status(404).send('Rota não encontrada.');
});

