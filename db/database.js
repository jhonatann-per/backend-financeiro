require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

sequelize.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
}).catch(err => {
    console.error('Erro: Conexão com o banco de dados não realizada com sucesso!', err); 
});

module.exports = sequelize;
