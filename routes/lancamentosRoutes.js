const express = require('express');
const router = express.Router();
const lancamentosController = require('../controllers/lancamentosController');

router.post('/cadastrar-lancamento', lancamentosController.createLancamento);
router.get('/listar-lancamentos', lancamentosController.listAllLancamentos);
router.get('/listar-lancamentos/:mes/:ano', lancamentosController.listLancamentosByMonthYear);
router.get('/buscar-lancamentos/:id', lancamentosController.getLancamentoById);
router.delete('/excluir-lancamento/:id', lancamentosController.deleteLancamento);
router.put('/editar-lancamento/:id', lancamentosController.updateLancamento);

module.exports = router;
