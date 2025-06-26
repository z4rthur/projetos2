import { Router } from 'express';
import upload from '../config/multerConfig.js';

import {
  home,
  abreAddCliente,
  addCliente,
  listarClientes,
  abreEditarCliente,
  editarCliente,
  deletarCliente,
  abreAddVeiculo,
  addVeiculo,
  listarVeiculos,
  abreEditarVeiculo,
  editarVeiculo,
  deletarVeiculo,
  abreAddVenda,
  addVenda,
  listarVendas,
  abreEditarVenda,
  editarVenda,
  deletarVenda
} from '../controllers/controller.js';

const router = Router();

// ===== HOME =====
router.get('/', home);

// ===== CLIENTES =====
router.get('/admin/cliente/add', abreAddCliente);
router.post('/admin/cliente/add', addCliente);
router.get('/admin/cliente/lst', listarClientes);
router.get('/admin/cliente/edt/:id', abreEditarCliente);
router.post('/admin/cliente/edt/:id', editarCliente);
router.post('/admin/cliente/del/:id', deletarCliente);

// ===== VEÍCULOS =====
router.get('/admin/veiculo/add', abreAddVeiculo);
router.post('/admin/veiculo/add', upload.single('imagem'), addVeiculo); // COM multer para upload
router.get('/admin/veiculo/lst', listarVeiculos);
router.get('/admin/veiculo/edt/:id', abreEditarVeiculo);
router.post('/admin/veiculo/edt/:id', upload.single('imagem'), editarVeiculo);
router.post('/admin/veiculo/del/:id', deletarVeiculo);

// ===== VENDAS =====
router.get('/admin/venda/add', abreAddVenda);
router.post('/admin/venda/add', addVenda);
router.get('/admin/venda/lst', listarVendas);
router.get('/admin/venda/edt/:id', abreEditarVenda);
router.post('/admin/venda/edt/:id', editarVenda);
router.post('/admin/venda/del/:id', deletarVenda);

export default router;
