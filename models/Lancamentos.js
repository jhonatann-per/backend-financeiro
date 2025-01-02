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
        // tiop 1 = Despesa, tipo 2 = Receita
    },
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dataPagamento: {
        type: Sequelize.DATE,
        allowNull: false,
       
    }
});

// Lancamentos.sync({force: true});

module.exports = Lancamentos;
