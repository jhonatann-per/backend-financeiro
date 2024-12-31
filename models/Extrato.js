const Sequelize = require('sequelize');
const database = require('../db/database');

const Extrato = database.define('extratos',{
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
    },
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})
;


// Extrato.sync({alter: true}).then(()=>{
//     console.log("banco de dados criado com sucesso");
// }).catch((err) =>{
//     console.log("Erro: ao tentar criar banco de dados" + err)
// })

module.exports = Extrato; 