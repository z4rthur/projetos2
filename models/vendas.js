// models/Venda.js
import mongoose from 'mongoose';

const vendaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  veiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Veiculo', required: true },
  data: { type: Date, required: true },
  valorFinal: { type: Number, required: true } // <- alterado aqui
});

export default mongoose.model('Venda', vendaSchema);
