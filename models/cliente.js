// models/Cliente.js
import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
});

export default mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
