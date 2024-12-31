
const express = require('express');
const app = express();
app.use(express.json());
const database = require('./db/database')
const extrato = require('./models/Extrato')
app.get('/', (req, res) => {
    res.send("extrato financeiro")

})


app.listen(8080, () => {
    console.log(`Servidor rodando na porta http://localhost:8080`);
});