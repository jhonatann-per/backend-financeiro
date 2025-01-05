const Lancamentos = require('../models/Lancamentos');
const { Op } = require('sequelize');

// Função para cadastrar lançamento
exports.createLancamento = async (req, res) => {
  const dados = req.body;
  try {
    const lancamento = await Lancamentos.create(dados);
    return res.status(200).json({ 
      erro: false, 
      mensagem: "Lançamento cadastrado com sucesso!", 
      lancamento });
  } catch (error) {
    return res.status(400).json({ 
      erro: true, 
      mensagem: "Erro ao cadastrar lançamento.", 
      error 
    });
  }
};

// Função para listar todos os lançamentos
exports.listAllLancamentos = async (req, res) => {
  try {
    const lancamentos = await Lancamentos.findAll({ 
      order: [['id', 'DESC']] });
    return res.status(200).json({ 
      lancamentos 
    });
  } catch (error) {
    return res.status(400).json({ 
      erro: true, 
      mensagem: "Erro ao listar lançamentos.", 
      error 
    });
  }
};

// Função para listar lançamentos por mês e ano e saldo final
exports.listLancamentosByMonthYear = async (req, res) => {
  const { mes, ano } = req.params;
  const data = new Date(ano, mes - 1);
  const primeiroDia = new Date(data.getFullYear(), data.getMonth(), 1);
  const ultimoDia = new Date(data.getFullYear(), data.getMonth() + 1, 0);

  try {
    const lancamentos = await Lancamentos.findAll({
      where: { dataPagamento: { [Op.between]: [primeiroDia, ultimoDia] } },
      order: [['dataPagamento', 'DESC']],
      attributes: ['id', 'nome', 'valor', 'tipo', 'situacao', 'dataPagamento']
    });

    const valorPago = await Lancamentos.sum('valor', {
      where: { tipo: "1", dataPagamento: { [Op.between]: [primeiroDia, ultimoDia] } }
    });

    const valorRecebido = await Lancamentos.sum('valor', {
      where: { tipo: "2", dataPagamento: { [Op.between]: [primeiroDia, ultimoDia] } }
    });

    const saldoFinal = Number(valorRecebido) - Number(valorPago);
    return res.status(200).json({ lancamentos, saldoFinal, valorPago, valorRecebido });
  } catch (error) {
    return res.status(400).json({ erro: true, mensagem: "Erro ao listar lançamentos.", error });
  }
};

// Função para buscar lançamento por ID
exports.getLancamentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const lancamento = await Lancamentos.findOne({ 
      where: { id } 
    });
    if (lancamento) {
      return res.status(200).json({ 
        lancamento 
      });
    } else {
      return res.status(404).json({ 
        erro: true, 
        mensagem: "Lançamento não encontrado!" 
      });
    }
  } catch (error) {
    return res.status(400).json({ 
      erro: true, 
      mensagem: "Erro ao buscar lançamento.", 
      error 
    });
  }
};

// Função para excluir lançamento
exports.deleteLancamento = async (req, res) => {
  const { id } = req.params;
  try {
    await Lancamentos.destroy({ 
      where: { id } 
    });
    return res.status(200).json({ 
      erro: false, 
      mensagem: "Lançamento excluído com sucesso!" 
    });
  } catch (error) {
    return res.status(400).json({ 
      erro: true, 
      mensagem: "Erro ao excluir lançamento.", 
      error });
  }
};

// Função para editar lançamento
exports.updateLancamento = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;
  try {
    await Lancamentos.update(dados, { where: { id } });
    return res.status(200).json({ erro: false, mensagem: "Lançamento editado com sucesso!" });
  } catch (error) {
    return res.status(400).json({ erro: true, mensagem: "Erro ao editar lançamento.", error });
  }
};
