# Descrição do Projeto
Este projeto é um sistema financeiro que verifica suas contas e saldo do mês com histórico dos meses anteriores. Vamos utilizar para esse projeto React.js no front-end com Styled Components e no back-end Node.js com Express.

## SEQUENCIA DE COMANDOS PARA CRIAÇÃO DO PROJETO:

CRIA O ARQUIVO PACKAGE.JSON
### npm init

INSTALA O EXPRESS: <!-- para facilitar a criação e gerenciamento de servidores web. O Express simplifica o processo de roteamento, manipulação de requisições HTTP e integração com middlewares, tornando o desenvolvimento mais eficiente e organizado. -->
### npm install express

INSTALA O SEQUELIZE: <!-- Sequelize é um ORM (Object-Relational Mapper) para Node.js que facilita a interação com bancos de dados SQL, permitindo definir modelos de dados e realizar operações de banco de dados de forma mais intuitiva e estruturada. -->
### npm install sequelize

INSTALA O DRIVER DO MYSQL PARA O SEQUELIZE: <!-- O driver do MySQL é necessário para que o Sequelize possa se comunicar com um banco de dados MySQL, permitindo a execução de consultas e operações de banco de dados. -->
### npm install mysql2

INSTALA O DOTENV: <!-- Dotenv é uma biblioteca que carrega variáveis de ambiente de um arquivo .env para process.env, permitindo configurar variáveis sensíveis e específicas do ambiente de forma segura e conveniente. -->
### npm install dotenv

PARA CRIAR O BANCO DE DADOS: 
### create database financeiro character set utf8mb4 collate utf8mb4_unicode_ci;

INSTALA O CORS: <!-- CORS (Cross-Origin Resource Sharing) é um mecanismo que permite que recursos restritos em uma página web sejam solicitados a partir de outro domínio fora do domínio ao qual o recurso pertence. -->
### npm install cors