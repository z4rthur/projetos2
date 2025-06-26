import Cliente from '../models/cadastro_cliente.js';
import Veiculo from '../models/veiculo.js';
import Venda from '../models/vendas.js';

// ==================== HOME ====================
export async function home(req, res) {
    try {
        // Busca os veículos ordenando do mais novo para o mais antigo e limita a 6
        const veiculos = await Veiculo.find().sort({ _id: -1 }).limit(100);

        console.log('Veículos na home:', veiculos); // Apenas para debug, pode remover depois

        res.render('admin/index', { veiculos });
    } catch (err) {
        console.error("Erro ao carregar a home:", err);
        res.status(500).send("Erro ao carregar a home");
    }
}


// ==================== CLIENTES ====================
export function abreAddCliente(req, res) {
    res.render('admin/cliente/add');
}

export async function addCliente(req, res) {
    try {
        const { nome, telefone, email, endereco, cpf } = req.body;
        if (!nome?.trim() || !telefone?.trim() || !email?.trim() || !endereco?.trim() || !cpf?.trim()) {
            return res.status(400).send("Todos os campos são obrigatórios");
        }

        await Cliente.create({
            nome: nome.trim(),
            telefone: telefone.trim(),
            email: email.trim(),
            endereco: endereco.trim(),
            cpf: cpf.trim()
        });

        res.redirect('/admin/cliente/lst');
    } catch (err) {
        console.error("Erro ao adicionar cliente:", err);
        res.status(500).send("Erro ao adicionar cliente");
    }
}

export async function listarClientes(req, res) {
    try {
        const clientes = await Cliente.find({});
        res.render('admin/cliente/lst', { clientes });
    } catch (err) {
        console.error("Erro ao listar clientes:", err);
        res.status(500).send('Erro ao listar os clientes');
    }
}

export async function editarCliente(req, res) {
    try {
        const { id } = req.params;
        await Cliente.findByIdAndUpdate(id, req.body);
        res.redirect('/admin/cliente/lst');
    } catch (err) {
        console.error("Erro ao editar cliente:", err);
        res.status(500).send('Erro ao editar cliente');
    }
}

export async function abreEditarCliente(req, res) {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findById(id);
        res.render('admin/cliente/edt', { cliente });
    } catch (err) {
        console.error("Erro ao carregar cliente:", err);
        res.status(500).send("Erro ao carregar cliente");
    }
}

export async function deletarCliente(req, res) {
    try {
        const { id } = req.params;
        await Cliente.findByIdAndDelete(id);
        res.redirect('/admin/cliente/lst');
    } catch (err) {
        console.error("Erro ao deletar cliente:", err);
        res.status(500).send("Erro ao deletar cliente");
    }
}

// ==================== VEÍCULOS ====================
export function abreAddVeiculo(req, res) {
    res.render('admin/veiculo/add');
}

export const addVeiculo = async (req, res) => {
  try {
    const { modelo, marca, ano, preco } = req.body;
    const imagem = req.file ? req.file.filename : null;

    const novoVeiculo = new Veiculo({
      modelo,
      marca,
      ano,
      preco,
      imagem
    });

    await novoVeiculo.save();
    res.redirect('/admin/veiculo/lst');
  } catch (error) {
    console.error('Erro ao adicionar veículo:', error);
    res.status(500).send('Erro ao adicionar veículo.');
  }
};

export async function listarVeiculos(req, res) {
    try {
        const veiculos = await Veiculo.find({});
        res.render('admin/veiculo/lst', { veiculos });
    } catch (err) {
        console.error("Erro ao listar veículos:", err);
        res.status(500).send('Erro ao listar os veículos');
    }
}

export async function editarVeiculo(req, res) {
    try {
        const { id } = req.params;
        const { modelo, marca, ano, preco } = req.body;
        const imagem = req.file;  // multer salva a imagem aqui, se houver

        // Busca o veículo no banco
        const veiculo = await Veiculo.findById(id);
        if (!veiculo) {
            return res.status(404).send('Veículo não encontrado');
        }

        // Atualiza os campos
        veiculo.modelo = modelo;
        veiculo.marca = marca;
        veiculo.ano = ano;
        veiculo.preco = preco;

        // Se enviou uma nova imagem, atualiza o caminho
        if (imagem) {
            veiculo.imagem = imagem.filename;  // campo que você usa no model (pode ser `imagemUrl` se preferir)
        }

        // Salva as alterações
        await veiculo.save();

        res.redirect('/admin/veiculo/lst');
    } catch (err) {
        console.error("Erro ao editar veículo:", err);
        res.status(500).send('Erro ao editar veículo');
    }
}

export async function abreEditarVeiculo(req, res) {
    try {
        const { id } = req.params;
        const veiculo = await Veiculo.findById(id);
        res.render('admin/veiculo/edt', { veiculo });
    } catch (err) {
        console.error("Erro ao carregar veículo:", err);
        res.status(500).send("Erro ao carregar veículo");
    }
}

export async function deletarVeiculo(req, res) {
    try {
        const { id } = req.params;
        await Veiculo.findByIdAndDelete(id);
        res.redirect('/admin/veiculo/lst');
    } catch (err) {
        console.error("Erro ao deletar veículo:", err);
        res.status(500).send("Erro ao deletar veículo");
    }
}

// ==================== VENDAS ====================
export async function abreAddVenda(req, res) {
    try {
        const clientes = await Cliente.find({});
        const veiculos = await Veiculo.find({});
        res.render('admin/venda/add', { clientes, veiculos });
    } catch (err) {
        console.error("Erro ao carregar dados da venda:", err);
        res.status(500).send("Erro ao carregar dados da venda");
    }
}

export async function addVenda(req, res) {
    try {
      const novaVenda = new Venda({
        cliente: req.body.clienteId,
        veiculo: req.body.veiculoId,
        data: req.body.dataVenda,
        valorFinal: req.body.valorFinal,
      });
  
      await novaVenda.save();
      res.redirect('/admin/venda/lst');
    } catch (erro) {
      console.error("Erro ao adicionar venda:", erro); // <-- log detalhado
      res.status(500).send('Erro ao adicionar venda');
    }
  }
  
export async function listarVendas(req, res) {
    try {
        const vendas = await Venda.find({})
            .populate('cliente')
            .populate('veiculo');
        res.render('admin/venda/lst', { vendas });
    } catch (err) {
        console.error("Erro ao listar vendas:", err);
        res.status(500).send("Erro ao listar vendas");
    }
}

export async function deletarVenda(req, res) {
    try {
        await Venda.findByIdAndDelete(req.params.id);
        res.redirect('/admin/venda/lst');
    } catch (error) {
        console.error('Erro ao excluir venda:', error);
        res.status(500).send('Erro ao excluir venda.');
    }
}

export async function editarVenda(req, res) {
    try {
        const { id } = req.params;
        const { clienteId, veiculoId, dataVenda, valorFinal } = req.body;

        await Venda.findByIdAndUpdate(id, {
            cliente: clienteId,
            veiculo: veiculoId,
            data: dataVenda,
             valorFinal: parseFloat(valorFinal)
        });

        res.redirect('/admin/venda/lst');
    } catch (err) {
        console.error("Erro ao editar venda:", err);
        res.status(500).send("Erro ao editar venda");
    }
}

export async function abreEditarVenda(req, res) {
    try {
        const { id } = req.params;
        const venda = await Venda.findById(id).populate('cliente').populate('veiculo');
        const clientes = await Cliente.find({});
        const veiculos = await Veiculo.find({});
        res.render('admin/venda/edt', { venda, clientes, veiculos });
    } catch (err) {
        console.error("Erro ao carregar dados da venda:", err);
        res.status(500).send("Erro ao carregar dados da venda");
    }
}
