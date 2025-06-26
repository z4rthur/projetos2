import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from '../routes/route.js'; // rotas externas
import { createServer } from 'http';
import mongoose from 'mongoose';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Conectar ao MongoDB Atlas
// Conectar ao MongoDB Atlas
const url = "mongodb+srv://aluno:aluno@cluster0.cdfrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url)
.then(() => console.log("✅ MongoDB conectado com sucesso!"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rotas
app.use(routes)
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;