const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Isadora',
    password: 'Senai@2024',
    database: 'login'
});

db.connect((error) => {
    if (error) {
        console.error("Erro ao conectar com banco de dados:", error);
    } else {
        console.log("Conectado ao MySQL");
    }
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.post("/login", (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT password FROM user WHERE username = ?', [username], (error, results) => {
        if (error) {
            console.error("Erro ao executar query:", error);
            res.redirect("/ErroQuery.html");
        } else if (results.length > 0) {
            const passwordDB = results[0].password;
            if (password === passwordDB) {
                console.log("Bem vinda Isadora");
                res.redirect("/welcome.html");
            } else {
                console.log("Senha incorreta");
                res.redirect("/senhaincorreta");
            }
        } else {
            console.log("Usuario não cadastrado");
            res.redirect("/Tente_Novamente.html");
        }
    });
});

app.post("/cadastro", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.passwordConfirm;

    if (password === confirm) {
        db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, password], (error, results) => {
            if (error) {
                console.error("Erro ao cadastrar usuário:", error);
                res.redirect("/Nao_Deu_Certo.html");
            } else {
                console.log("Usuário cadastrado com sucesso", results);
                res.redirect('/');
            }
        });
    } else {
        console.log('Senhas não coincidem');
        res.redirect("/SenhasNaoCoincidem.html");
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`);
});
