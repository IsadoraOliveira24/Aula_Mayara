const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user:'isadora',
    password:'senai@2024',
    database:'LoginMayara'
});

db.connect((error)=>{
    if(error){
        console.log("Erro ao conectar com banco de dados")
    } else {
        console.log("Conectado ao MySQL");
    }
});


const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/login.html')
})

app.post("/login", (req, res)=>{
    console.log(req.body)
    const username = req.body.usuario
    const password =req.body.senha

    db.query('SELECT password FROM user WHERE username = ?', [username], (error, results) => {
     if(results.length>0){
        const passwordDB = results[0].password;
        console.log("Bem vinda Isadora")
        res.redirect("/welcome.html")
     } else {
        console.log("Usuario não cadastrado")
        res.redirect("/Tente_Novamente.html")
     }
     })
})

app.listen(port, ( )=>{
    console.log (`Servidor rodando no enedreço: http://localhost:${port}`)
})