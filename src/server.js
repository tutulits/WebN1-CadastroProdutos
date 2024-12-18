const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');
const bcrypt = require('bcrypt');  // Para hashear senhas
const jwt = require('jsonwebtoken');  // Para criar tokens de sessão

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

// Utilizando promisify para transformar a conexão em Promises e usar async/await
const query = util.promisify(conexao.query).bind(conexao);

// Conectar ao banco de dados
conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro);
    } else {
        console.log('Conectado ao banco de dados MySQL.');
        const PORT = 3001;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    }
});

// Inserindo um novo produto
app.post('/adicionar', async (req, res) => {
    try {
        const { nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro, validade, quantidade } = req.body;

        // Validação simples para garantir que todos os campos obrigatórios foram enviados
        if (!nome_produto || !descricao || !categoria || !preco || !quantidade_estoque || !fornecedor || !data_cadastro || !validade || !quantidade) {
            return res.status(400).send('Todos os campos são obrigatórios.');
        }

        const queryStr = `INSERT INTO produto 
                          (nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro, validade, quantidade) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await query(queryStr, [nome_produto, descricao, categoria, preco, quantidade_estoque, fornecedor, data_cadastro, validade, quantidade]);
        res.send('Produto adicionado com sucesso!');
    } catch (erro) {
        console.error('Erro ao adicionar produto:', erro);
        res.status(500).send('Erro ao adicionar produto: ' + erro.sqlMessage);
    }
});

// Inserindo uma nova categoria
app.post('/categoria', async (req, res) => {
    try {
        const { nome, descricao } = req.body;

        if (!nome || !descricao) {
            return res.status(400).send('Nome e descrição da categoria são obrigatórios.');
        }

        const queryStr = 'INSERT INTO categorias (nome, descricao) VALUES (?, ?)';
        await query(queryStr, [nome, descricao]);

        res.send('Categoria adicionada com sucesso!');
    } catch (erro) {
        console.error('Erro ao adicionar categoria:', erro);
        res.status(500).send('Erro ao adicionar categoria: ' + erro.sqlMessage);
    }
});

// Rota para buscar todas as categorias
app.get('/categorias', async (req, res) => {
    try {
        const resultados = await query('SELECT id_categoria, nome FROM categorias');
        res.json(resultados); // Retorna as categorias em formato JSON
    } catch (erro) {
        console.error('Erro ao buscar categorias:', erro);
        res.status(500).send('Erro ao buscar categorias: ' + erro.sqlMessage);
    }
});

// Inserindo um novo fornecedor
app.post('/fornecedor', async (req, res) => {
    try {
        const { nome, endereco, telefone, email } = req.body;

        if (!nome || !endereco || !telefone || !email) {
            return res.status(400).send('Todos os campos de fornecedor são obrigatórios.');
        }

        const queryStr = `INSERT INTO fornecedor (nome, endereco, telefone, email) VALUES (?, ?, ?, ?)`;
        await query(queryStr, [nome, endereco, telefone, email]);

        res.send('Fornecedor adicionado com sucesso!');
    } catch (erro) {
        console.error('Erro ao adicionar Fornecedor:', erro);
        res.status(500).send('Erro ao adicionar fornecedor: ' + erro.sqlMessage);
    }
});

app.get('/fornecedores', async (req, res) => {
    try {
        const resultados = await query('SELECT id, nome FROM fornecedor');
        res.json(resultados);
    } catch (erro) {
        console.error('Erro ao buscar fornecedores:', erro);
        res.status(500).send('Erro ao buscar fornecedores: ' + erro.sqlMessage);
    }
});

// Tratamento para rotas não existentes


app.get('/fornecedor', (req, res) => {
    const query = 'SELECT * FROM fornecedor';
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar fornecedores', error: err });
        } else {
            res.json(results);
        }
    });
});


app.get('/listar', (req, res) => {
    const query = 'SELECT * FROM produto';
    conexao.query(query, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao buscar produtos:', erro);
            res.status(500).send('Erro ao buscar produtos');
        } else {
            res.json(resultados);
        }
    });
});

// login
app.post('registro', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).send('Email e senha são obrigatórios');
    }
    const password = await bcrypt.hash(senha, 10);
    const queryStr = `INSERT INTO usuarios (email, senha) VALUES (?, ?)`;
    try {
        await query(queryStr, [email, password]);
        res.send('Usuario registrado com sucesso!');
    } catch (erro) {
        console.error('Eroo ao registrar usuario', erro);
        res.status(500).send('Erro ao registrar usuario.');
    }
});


app.post('login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).semd('Email ou senha incorretos.');
    }
    try {
        const resultados = await query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (resultados.length === 0) {
            return res.status(400).send('Email ou senhas incorretos.');
        }
        if (!match) {
            return res.status(400).send('Email ou senha incorretos.');
        }

        // Gerando um token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, 'secreta123', { expiresIn: '1h' });
        res.json({ token });
    } catch (erro) {
        console.error('Eroo ao fazer login:', erro);
        res.status(500).send('Erro ao fazer Login.');
    }
});

const autenticacao = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(401);

    jwt.verify(token.split(' ')[1], 'secreta123', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/protected', autenticacao, (req, res) => {
    res.send('Essa é uma rota protegida!');
});
// fim do login

app.use((req, res) => {
    res.status(404).send('Rota não encontrada.');
});