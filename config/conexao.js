import mongoose from "mongoose";

const url = "mongodb+srv://aluno:aluno@cluster0.cdfrk.mongodb.net/autoprime?retryWrites=true&w=majority&appName=Cluster0"; 

const conexao = await mongoose.connect(url);

export default conexao;
