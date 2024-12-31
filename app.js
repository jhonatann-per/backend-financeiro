const express = require('express');
const app = express();
app.use(express.json());

const database = require('./db/database');
const Extrato = require('./models/Extrato');

app.get('/', (req, res) => {
    res.send("extrato financeiro");
});

app.post('/cadastrar-extrato', async (req, res) => {
    const dados = req.body;
    console.log(dados);
    await Extrato.create(dados)
        .then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Lançamento Cadastrado Com Sucesso!"
            });
        })
        .catch(() => {
            return res.status(200).json({
                erro: true,
                mensagem: "Erro: Lançamento não cadastrado."
            });
        });
});

app.get('/listar-extratos', async (req, res) => {
    await Extrato.findAll({
        order: [['id', 'DESC']],
        attributes: ['id', 'nome', 'valor', 'tipo', 'situacao']
    })
        .then((extratos) => {
            return res.status(200).json({
                extratos: extratos
            });
        })
        .catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: dados não encontrados!"
            });
        });
});

app.get('/buscar-extrato/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const buscarExtrato = await Extrato.findOne({ where: { id } });
        if (buscarExtrato) {
            return res.status(200).json({
                buscarExtrato
            });
        } else {
            return res.status(404).json({
                erro: true,
                mensagem: "Extrato não encontrado!"
            });
        }
    } catch (error) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: dados não encontrados!"
        });
    }
});

app.listen(8080, () => {
    console.log(`Servidor rodando na porta http://localhost:8080`);
});
