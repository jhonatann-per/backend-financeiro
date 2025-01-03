const Sequelize = require('sequelize');
const database = require('../db/database');

const Lancamentos = database.define('lancamentos',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tipo:{
        type: Sequelize.INTEGER,
        allowNull: false
        // tipo 1 = Despesa, tipo 2 = Receita
    },
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
        // situacao 1 = Pago, situacao 2 = Pendente, situacao 3 = Recebido
    },
    dataPagamento: {
        type: Sequelize.DATE,
        allowNull: false,
       
    }
});

// Lancamentos.sync();

module.exports = Lancamentos;
