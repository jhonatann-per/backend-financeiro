const express = require('express');
const cors = require('cors');
const app = express();
const { Op } = require('sequelize');

const database = require('./db/database');
const Lancamentos = require('./models/Lancamentos');

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-PINGOTHER, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send("extrato financeiro");
});

// Cadastrar Lançamento
app.post('/cadastrar-lancamento', async (req, res) => {
    const dados = req.body;
    console.log(dados);
    await Lancamentos.create(dados)
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

// Lista todos os Lançamentos
app.get('/listar-lancamentos', async (req, res) => {

    try {
        const lancamentos = await Lancamentos.findAll({
            order: [['id', 'DESC']],
        });
        
        if (lancamentos) {
            return res.status(200).json({
                lancamentos: lancamentos
            });
        }
    } catch (error) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum lançamento encontrado!"
        });
    }
});

// Listar lançamentos por mês e ano e saldo final
app.get('/listar-lancamentos/:mes/:ano', async (req, res) => {
    var mes = req.params.mes - 1;
    var ano = req.params.ano;
    const data = new Date(ano, mes);
    var primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
    var ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);

    const lancamento = await Lancamentos.findAll({
        where: {
            dataPagamento: {
                [Op.between]: [primeiroDia, ultimoDia]
            }
        },
        order: [['dataPagamento', 'DESC']],
        attributes: ['id', 'nome', 'valor', 'tipo', 'situacao', 'dataPagamento']
    });
        
    const valorPago = await Lancamentos.sum('valor', {
        where: {
            tipo: "1",
            dataPagamento: {
                [Op.between]: [primeiroDia, ultimoDia]
            }
        }
    });

    const valorRecebido = await Lancamentos.sum('valor', {
        where: {
            tipo: "2",
            dataPagamento: {
                [Op.between]: [primeiroDia, ultimoDia]
            }
        }
    });
    
    const saldoFinal= new Number(valorRecebido) - new Number(valorPago);
    return res.status(200).json({
        lancamento,
        saldoFinal,
        valorPago,
        valorRecebido
    });
});

// Busca lançamento por ID
app.get('/buscar-lancamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const buscarExtrato = await Lancamentos.findOne({ where: { id } });
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
