import mongoose from 'mongoose';

const veiculoSchema = new mongoose.Schema({
  modelo: String,
  marca: String,
  ano: Number,
  preco: Number,
  imagem: String, // campo para o nome do arquivo da imagem
});

const Veiculo = mongoose.model('Veiculo', veiculoSchema);
export default Veiculo;
