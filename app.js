const express = require('express');
const cors = require('./middleware/cors');
const lancamentosRoutes = require('./routes/lancamentosRoutes');
const database = require('./db/database');

const app = express();

app.use(express.json());
app.use(cors);

app.get('/', (req, res) => {
    res.send("extrato financeiro");
});

app.use('/api', lancamentosRoutes);

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
