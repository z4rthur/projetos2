// controllers/vendaController.js
import Veiculo from '../models/veiculo.js';
import Cliente from '../models/cliente.js';
import Venda from '../models/vendas.js';

// GET - Exibe formulário de compra
export const getComprarVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findById(req.params.id);
    if (!veiculo) return res.status(404).send('Veículo não encontrado');
    res.render('venda/comprar', { veiculo });
  } catch (err) {
    console.error('Erro ao buscar veículo:', err);
    res.status(500).send('Erro no servidor');
  }
};

// POST - Processa a compra e salva Cliente + Venda
export const postComprarVeiculo = async (req, res) => {
  try {
    const veiculo = await Veiculo.findById(req.params.id);
    if (!veiculo) return res.status(404).send('Veículo não encontrado');

    const cliente = new Cliente({
      nome: req.body.nome,
      email: req.body.email,
      cpf: req.body.cpf,
      celular: req.body.celular
    });

    await cliente.save();

    const venda = new Venda({
      cliente: cliente._id,
      veiculo: veiculo._id,
      data: new Date(),
      valorFinal: veiculo.preco
    });

    await venda.save();

    res.redirect('/admin/venda/lst');
  } catch (err) {
    console.error('Erro ao salvar venda:', err);
    res.status(500).send('Erro ao processar compra');
  }
};

// GET - Exibe as parcelas da venda
export const abrirParcelasVeiculo = async (req, res) => {
  const id = req.params.id;

  try {
    const venda = await Venda.findById(id)
      .populate('cliente')
      .populate('veiculo');

    if (!venda) return res.status(404).send('Venda não encontrada');

    // Exemplo de parcelas geradas fixas (substitua por lógica real, se quiser)
    const parcelas = [
      { numero: 1, valor: venda.valorFinal / 3, vencimento: '2025-06-01' },
      { numero: 2, valor: venda.valorFinal / 3, vencimento: '2025-07-01' },
      { numero: 3, valor: venda.valorFinal / 3, vencimento: '2025-08-01' },
    ];

    res.render('venda/parcelas', {
      venda,
      parcelas
    });
  } catch (err) {
    console.error('Erro ao buscar parcelas:', err);
    res.status(500).send('Erro ao carregar parcelas');
  }
};
