require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configuração da conexão com a base de dados
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    });

// Teste de conexão com a base de dados
pool.connect((err) => {
    if (err) {
        console.error('Erro na conexão com a base de dados: ', err.stack);
    } else {
        console.log('Conexão com a base de dados realizada com sucesso!');
    }
});

// Rota GET: Obter todos os utilizadores
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
        console.log('Utilizadores apresentados com sucesso!');
    } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter os utilizadores!' });
    }
});

// Rota GET: Obter um utilizador
app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    // Verificar se o ID é um número
    if (isNaN(id)) {
       return res.status(400).json({ error: 'ID deve ser um número!' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        console.log('Utilizador encontrado com sucesso!');
        if (result.rows.length === 0) {
            console.log('Utilizador não encontrado!');
           return res.status(404).json({ error: 'Utilizador não encontrado!' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao obter o utilizador!' });
    }
});

// Rota POST: Adicionar um utilizador
app.post('/users', async (req, res) => {
    const { name, email } = req.body;

    // Verificar se o nome e o email foram enviados
    if (!name || !email) {
        console.log('O nome e o email são obrigatórios!');
        return res.status(400).json({ error: 'O nome e o email são obrigatórios!' });
    }

    try {
        // Verificar se o nome e o email já existem
        const resultCheck = await pool.query('SELECT * FROM users WHERE name = $1 OR email = $2', [name, email]);
        if (resultCheck.rows.length > 0) {
            console.log('Nome ou email já existem!');
            return res.status(400).json({ error: 'Nome ou email já existem!' });
        }

        // Adicionar o utilizador
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json({ message: 'Utilizador adicionado com sucesso!', user: result.rows[0]});
        console.log('Utilizador adicionado com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao adicionar o utilizador!' });
    }
});

// Rota PUT: Atualizar um utilizador
app.put('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    // Verifica se o nome e o email foram enviados
    if (!name || !email) {
        console.log('O nome e o email são obrigatórios!');
        return res.status(400).json({ error: 'O nome e o email são obrigatórios!' });
    }


    try {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        res.json({ message: 'Utilizador atualizado com sucesso!', user: result.rows[0] });
        console.log('Utilizador atualizado com sucesso!');
        if (result.rows.length === 0) {
            console.log('Utilizador não encontrado!');
           return res.status(404).json({ error: 'Utilizador não encontrado!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar o utilizador!' });
    }
});

// Rota DELETE: Remover um utilizador
app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            console.log('Utilizador não encontrado!');
            return res.status(404).json({ error: 'Utilizador não encontrado!' });
         }
        res.json({ message: 'Utilizador removido com sucesso!', user: result.rows[0] });
        console.log('Utilizador removido com sucesso!');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao remover o utilizador!' });
    }
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor a correr na porta 3000');
});
