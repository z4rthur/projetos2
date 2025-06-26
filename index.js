import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
import routes from './routes/route.js';
import methodOverride from 'method-override';

const app = express();

// Configurar caminho para arquivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurações básicas do Express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, '/public')));
app.use(methodOverride('_method'));

// Middleware para debug de métodos
app.use((req, res, next) => {
  console.log(`🔍 Método original: ${req.originalMethod || req.method}`);
  console.log(`➡️  Método final: ${req.method}`);
  next();
});

// Conectar ao MongoDB Atlas
const url = "mongodb+srv://aluno:aluno@cluster0.cdfrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB conectado com sucesso!"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Usar rotas da aplicação
app.use(routes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});

app.get('/testeview', (req, res) => {
  res.render('venda/comprar');
});
